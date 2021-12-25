BOT_NAME = 'aminer'

SPIDER_MODULES = ['aminer.spiders']
NEWSPIDER_MODULE = 'aminer.spiders'

LOG_LEVEL = 'INFO'
# LOG_FILE = 'log.log'
ROBOTSTXT_OBEY = False
DOWNLOAD_DELAY = 0
CONCURRENT_REQUESTS = 200
COOKIES_ENABLED = False

ITEM_PIPELINES = {
    'aminer.pipelines.AminerPipeline': 300,
}
