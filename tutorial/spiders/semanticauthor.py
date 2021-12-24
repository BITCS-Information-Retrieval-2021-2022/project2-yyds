import json
import scrapy
from scrapy.cmdline import execute

# from tutorial.tutorial.items import TutorialItem
from tutorial.items import TutorialItem


class SemanticauthorSpider(scrapy.Spider):
    # 149408648
    id = 1678282
    n = 1856665

    handle_httpstatus_list = [404]
    name = 'semanticauthor'

    def start_requests(self, *args, **kwargs):
        for i in range(1000):
            yield scrapy.Request(
                'https://api.semanticscholar.org/graph/v1/author/{}?fields=authorId,url,paperCount,citationCount,name,'
                'affiliations,hIndex,papers.authors,papers.url,papers.title,papers.year,papers.citationCount,'
                'papers.venue,papers.fieldsOfStudy,papers.referenceCount'.format(self.n + i))
        self.n += 1001
        # yield scrapy.Request('http://www.example.com', callback=self.start_requests, priority=-1, dont_filter=True)
        yield scrapy.Request('https://api.semanticscholar.org/graph/v1/author/{}?fields=authorId,url,'
                             'paperCount,citationCount,name,affiliations,hIndex,papers.authors,papers.url,'
                             'papers.title,papers.year,papers.citationCount,papers.fieldsOfStudy,papers.venue,'
                             'papers.fieldsOfStudy,papers.referenceCount'.format(self.n - 1),
                             callback=self.start_requests)

    def parse(self, response):
        if response.status == 404:
            pass
        else:
            item = TutorialItem()
            item = json.loads(response.text)
            if self.id < self.n:
                self.id = self.n
            print(self.id)

            yield item


if __name__ == '__main__':
    execute(['scrapy', 'crawl', 'semanticauthor'])
