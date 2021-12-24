# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import operator

import pymongo


class TutorialPipeline:
    def __init__(self):
        mongo_host = "localhost"
        mongo_port = 27017
        mongo_db = "semantic"
        author_col = "author_col"
        paper_col = "paper_col"
        client = pymongo.MongoClient(host=mongo_host, port=mongo_port)
        db = client[mongo_db]
        self.author_info = db[author_col]
        self.paper_info = db[paper_col]
        self.author_info.create_index('authorId', unique=True)
        self.paper_info.create_index('paperId', unique=True)
        print("mongodb数据库连接成功\n")

    def process_item(self, item, spider):
        list_fields = []
        list_coauthors = []
        list_authorId = []
        result_fields = []
        result_coauthors = []
        list_paperId = []
        list_papers = []
        if len(item['papers']) <= 160:

            for paper in item['papers']:
                # self.paper_info.update_one(paper, {'$set': paper}, upsert=True)
                try:
                    self.paper_info.insert_one(paper)
                except Exception:
                    pass
                list_papers.append(paper)
                list_paperId.append(paper['paperId'])
                if paper['fieldsOfStudy']:
                    for i in paper['fieldsOfStudy']:
                        list_fields.append(i)
                if paper['authors']:
                    for authorinfo in paper['authors']:
                        list_coauthors.append(authorinfo)
                        list_authorId.append(authorinfo['authorId'])
            if len(list_fields) > 0:
                dict_fields = {}
                for i in list_fields:
                    dict_fields[i] = list_fields.count(i)
                sort_fields = sorted(dict_fields.items(), key=operator.itemgetter(1))

                k = 1
                for field in sort_fields[::-1]:
                    if k > 4:
                        break
                    result_fields.append(field[0])
                    k += 1
            item['fieldsOfStudy'] = result_fields
            if len(list_coauthors) > 1:
                dict_authors = {}
                for i in list_authorId:
                    dict_authors[i] = list_authorId.count(i)
                sort_authors = sorted(dict_authors.items(), key=operator.itemgetter(1))
                result_authorId = []
                k = 1
                for i in sort_authors[::-1]:
                    if k > 6:
                        break
                    result_authorId.append(i[0])
                    k += 1
                if len(result_authorId) > 0:
                    del result_authorId[result_authorId.index(item['authorId'])]
                for i in result_authorId:
                    result_coauthors.append(list_coauthors[list_authorId.index(i)])
            item['coAuthors'] = result_coauthors
            item['papers'] = list_paperId
            try:
                # self.paper_info.insert_many(list_papers)
                self.author_info.insert_one(item)
            except Exception:
                pass
            # self.author_info.update_one(item, {"$set": item}, upsert=True)
            print(item)
            # self.col_info.insert_one(item)
            # return item
