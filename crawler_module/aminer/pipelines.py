from aminer.items import AuthorItem, CoAuthorItem, PaperItem, PaperCountItem, \
    ErrorItem
import pymongo


def extract_one(path, data):
    try:
        for k in path:
            data = data[k]
        return data
    except KeyError:
        pass


def extract(kws, data):
    result = {}
    for key in kws:
        value = extract_one(kws[key], data)
        if value is not None:
            result[key] = value
    return result


class AminerPipeline:
    def __init__(self):
        self.client = None
        self.authors = None
        self.papers = None
        self.known_authors = None
        self.errors = None

    def open_spider(self, spider):
        self.client = pymongo.MongoClient()
        self.authors = self.client.ir.authors
        self.papers = self.client.ir.papers
        self.known_authors = self.client.ir.known_authors
        self.errors = self.client.ir.errors

    def close_spider(self, spider):
        self.client.close()

    def save_known_authors(self, authors):
        try:
            self.known_authors.insert_many(
                [{'_id': author_id} for author_id in authors])
        except pymongo.errors.BulkWriteError:
            pass

    def process_item(self, item, spider):
        if isinstance(item, AuthorItem):
            self.process_authors(**item)
        elif isinstance(item, CoAuthorItem):
            self.process_co_authors(**item)
        elif isinstance(item, PaperItem):
            self.process_papers(**item)
        elif isinstance(item, PaperCountItem):
            self.process_paper_count(**item)
        elif isinstance(item, ErrorItem):
            self.process_error(**item)
        else:
            return item

    def process_paper_count(self, author_id, count):
        self.authors.update({'_id': author_id},
                            {'$set': {'realPaperCount': count}}, upsert=True)

    def process_authors(self, authors):
        author_ids = []
        for author in authors:
            author_ids.append(author['id'])
            data = extract({
                'authorId': ['id'],
                'name': ['name'],
                'photoUrl': ['avatar'],
                'academicTitle': ['profile', 'position'],
                'affiliations': ['profile', 'affiliation'],
                'paperCount': ['indices', 'pubs'],
                'citationCount': ['indices', 'citations'],
                'hIndex': ['indices', 'hindex'],
            }, author)

            if 'affiliations' in data:
                data['affiliations'] = [data['affiliations']]

            self.authors.update({'_id': author['id']}, {'$set': data},
                                upsert=True)
        self.save_known_authors(author_ids)

    def process_co_authors(self, author_id, co_authors):
        data = []
        author_ids = []
        for co_author in co_authors:
            if 'id' in co_author:
                author_ids.append(co_author['id'])

            if co_author['bole'] != 'self':
                data.append(extract({
                    "authorId": ['id'],
                    "name": ['name'],
                    "copaperCount": ['w'],
                    "hIndex": ['h_index']
                }, co_author))
        self.save_known_authors(author_ids)
        self.authors.update({'_id': author_id}, {'$set': {'coAuthors': data}},
                            upsert=True)

    def process_papers(self, author_id, papers):
        author_ids = []
        paper_ids = []
        paper_infos = []
        for paper in papers:
            paper_ids.append(paper['id'])
            paper_infos.append(extract({
                '_id': ['id'],
                "url": ['pdf'],
                "title": ['title'],
                "abstract": ['abstract'],
                "venue": ['venue', 'info', 'name'],
                "year": ['year'],
                "citationCount": ['num_citation'],
                "authors": ['authors']
            }, paper))
            for author in paper.get('authors', []):
                if 'id' in author:
                    author_ids.append(author['id'])

        self.save_known_authors(author_ids)
        self.authors.update({'_id': author_id},
                            {'$addToSet': {'papers': {'$each': paper_ids}}},
                            upsert=True)

        try:
            self.papers.insert_many(paper_infos)
        except pymongo.errors.BulkWriteError:
            pass

    def process_error(self, author_id):
        try:
            self.errors.update_one({'_id': author_id}, upsert=True)
        except pymongo.errors.DuplicateKeyError:
            pass
