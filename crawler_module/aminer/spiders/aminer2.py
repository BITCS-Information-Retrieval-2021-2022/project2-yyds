import json
import threading
import scrapy
from aminer.items import AuthorItem, CoAuthorItem, PaperItem, PaperCountItem, \
    ErrorItem
import pymongo


class Aminer2Spider(scrapy.Spider):
    name = 'aminer2'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.lock = threading.RLock()
        self.visiting_authors = set()
        self.client = pymongo.MongoClient()
        self.db = self.client.ir

    def get_not_visited_author_ids(self, limit=10000):
        return [doc['_id'] for doc in self.db.known_authors.aggregate([
            {'$project': {'_id': 1}},
            {'$lookup': {'from': 'authors', 'localField': "_id",
                         'foreignField': "_id", 'as': "crawled"}},
            {'$match': {'crawled': []}},
            {'$project': {'_id': 1}},
            {'$limit': limit}])]

    def start_requests(self, *args, **kwargs):
        not_visited_authors = set(self.get_not_visited_author_ids())
        not_visited_authors.difference_update(self.visiting_authors)

        for author_id in not_visited_authors:
            with self.lock:
                self.visiting_authors.add(author_id)
            yield scrapy.Request('https://www.aminer.cn/profile/' + author_id,
                                 cb_kwargs={'author_id': author_id})
        yield scrapy.Request('http://www.example.com/', priority=-1,
                             dont_filter=True, callback=self.start_requests)

    @staticmethod
    def get_data(response):
        assert response.status == 200
        data = json.loads(response.text)
        assert data['data'][0]['succeed'], data['data'][0]['error']
        return data['data'][0]

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

    def parse(self, response, author_id):
        si = response.text.find('window.g_initialProps')
        si = response.text.find('{', si)
        di = response.text.find(';\n', si)
        try:
            data = json.loads(response.text[si:di])['profile']['profile']
        except Exception:
            return ErrorItem({'author_id': author_id})

        yield AuthorItem({'authors': [data]})
        yield self.create_ego_network_request(author_id)
        yield self.create_paper_request(data['id'], 0)

        with self.lock:
            self.visiting_authors.remove(author_id)

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

    def parse_ego_network_result(self, response, author_id):
        try:
            data = self.get_data(response)['data']
        except Exception:
            return ErrorItem({'author_id': author_id})

        yield CoAuthorItem({'author_id': author_id, 'co_authors': data})
