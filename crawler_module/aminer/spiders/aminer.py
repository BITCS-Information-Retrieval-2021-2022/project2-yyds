import copy
import json
import threading

import pymongo
import scrapy
from aminer.items import AuthorItem, CoAuthorItem, PaperItem, PaperCountItem, \
    ErrorItem


class AminerSpider(scrapy.Spider):
    name = 'aminer'

    FILTERS = {
        'h_index': [(81, 999)] + [(i, i) for i in range(80, -1, -1)],
        'gender': ['male', 'female', 'no_records', 'both', '', 'unknown'],
        'lang': ['english', 'chinese', 'japanese', 'german', 'french', 'greek',
                 '', 'indian', 'korean', 'italian'],
        'nation': ['USA', 'Japan', 'United Kingdom', 'Italy', 'China',
                   'Canada',
                   'Germany', 'Netherlands', 'Australia',
                   'Switzerland', '']
    }

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.lock = threading.RLock()
        self.visited_authors = set()
        client = pymongo.MongoClient()
        authors = client.ir.authors
        for doc in authors.aggregate([{'$project': {'_id': 1}}]):
            self.visited_authors.add(doc['_id'])

    @staticmethod
    def create_filters(h_index=None, **kwargs):
        filters = []
        if h_index is not None:
            filters.append(
                {'field': 'h_index', 'type': 'range', 'value': str(h_index[0]),
                 'operator': 'gte'})
            filters.append(
                {'field': 'h_index', 'type': 'range', 'value': str(h_index[1]),
                 'operator': 'lte'})

        for field in kwargs:
            filters.append({'field': field, 'type': 'term',
                            'value': '\"' + kwargs[field] + '\"'})

        return filters

    def start_requests(self):
        yield self.create_search_aggregation_request({}, ['h_index', 'gender',
                                                          'lang', 'nation'])

    def create_search_aggregation_request(self, filters, rest_filters):
        post_data = [{'action': 'searchapi.SearchPersonAggregationV2',
                      'parameters': {'offset': 0, 'size': 200, 'query': '*',
                                     'order': 'h_index',
                                     'filters': self.create_filters(
                                         **filters), }}]

        return scrapy.Request('https://apiv2.aminer.cn/n', method='POST',
                              dont_filter=True,
                              cb_kwargs={'filters': filters,
                                         'rest_filters': rest_filters},
                              body=json.dumps(post_data), priority=10,
                              callback=self.parse_search_aggregation_result)

    def create_search_request(self, offset, filters):
        post_data = [{"action": "searchapi.SearchPersonV2",
                      "parameters": {"offset": offset, "size": 200,
                                     "query": "*", "order": "h_index",
                                     "filters": self.create_filters(**filters),
                                     "fields": ["name", "avatar", "contact",
                                                "org", "h_index", "n_citation",
                                                "n_pubs"]}}]
        return scrapy.Request('https://apiv2.aminer.cn/n', method='POST',
                              dont_filter=True,
                              body=json.dumps(post_data), priority=20,
                              callback=self.parse_search_result)

    def create_paper_request(self, author_id, offset):
        post_data = [{"action": "person.GetPersonPubs",
                      "parameters": {"offset": offset, "size": 200,
                                     "sorts": ["!year"], "ids": [author_id],
                                     "searchType": "all"},
                      "schema": {
                          "publication": ["id", "title", "urls",
                                          "venue.info.name", "venue.volume",
                                          "venue.info.name_zh", "venue.issue",
                                          "year", "authors._id",
                                          "authors.name",
                                          "reference", "num_citation",
                                          "title_zh", "authors.name_zh",
                                          "pdf"]}}]

        return scrapy.Request('https://apiv2.aminer.cn/magic', method='POST',
                              cb_kwargs={'author_id': author_id,
                                         'offset': offset},
                              body=json.dumps(post_data), priority=30,
                              dont_filter=True,
                              callback=self.parse_paper_result)

    def create_ego_network_request(self, author_id):
        post_data = [{"action": "personapi.GetEgoNetworkGraph",
                      "parameters": {"id": author_id, "reloadcache": True}}]
        return scrapy.Request('https://apiv2.aminer.cn/n', method='POST',
                              cb_kwargs={'author_id': author_id},
                              body=json.dumps(post_data), priority=40,
                              dont_filter=True,
                              callback=self.parse_ego_network_result)

    @staticmethod
    def get_data(response):
        assert response.status == 200
        data = json.loads(response.text)
        assert data['data'][0]['succeed'], data['data'][0]['error']
        return data['data'][0]

    def parse_search_aggregation_result(self, response, filters, rest_filters):
        data = self.get_data(response)['data']

        hits_total = data['result']['hitsTotal']

        assert hits_total != -1

        if hits_total < 10000 or len(rest_filters) == 0:
            for offset in range(0, hits_total, 200):
                yield self.create_search_request(offset, filters)
        else:
            # add more filters
            next_filter, rest_filters = rest_filters[0], rest_filters[1:]
            for value in self.FILTERS[next_filter]:
                filters = copy.deepcopy(filters)
                filters[next_filter] = value
                yield self.create_search_aggregation_request(filters,
                                                             rest_filters)

    def parse_search_result(self, response):
        data = self.get_data(response)['data']

        yield AuthorItem({'authors': data['PersonList']})

        for author in data['PersonList']:
            with self.lock:
                if not author['id'] in self.visited_authors:
                    self.visited_authors.add(author['id'])
                    yield self.create_ego_network_request(author['id'])
                    yield self.create_paper_request(author['id'], 0)

    def parse_paper_result(self, response, author_id, offset):
        data = self.get_data(response)

        if 'items' in data:
            yield PaperItem({'papers': data['items'], 'author_id': author_id})

        if 'keyValues' in data:
            if offset == 0:
                yield PaperCountItem({'author_id': author_id,
                                      'count': data['keyValues']['total']})

                for off in range(offset + 200, data['keyValues']['total'],
                                 200):
                    yield self.create_paper_request(author_id, off)
        elif offset == 0:
            yield PaperCountItem({'author_id': author_id, 'count': 0})

    def parse_ego_network_result(self, response, author_id):
        try:
            data = self.get_data(response)['data']
        except Exception:
            return ErrorItem({'author_id': author_id})

        yield CoAuthorItem({'author_id': author_id, 'co_authors': data})

    def parse(self, response, **kwargs):
        pass
