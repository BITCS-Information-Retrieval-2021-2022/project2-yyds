from django.http import HttpResponse
import json
import requests
from requests import status_codes
def test1_views(request):
    d1 = {'id': 'uid123','name': 'bob','age': 18,'score': 9.7}   
    return HttpResponse(json.dumps(d1))

POST_FORM = '''
<form method='post' action='/search/'>
    Search keyword: <input type='text' name='key'>
    <input type='submit' value='post'>
</form>
'''
def hello_view(request):
    return HttpResponse(POST_FORM)

def search_view(request):
    url = 'http://101.35.199.231:9200/test/_search?'
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        namekey = request.GET.get('key', '')

    elif request.method == 'POST':
        namekey = request.POST.get('key', '')

    else:
        return HttpResponse(status_codes='404')

    query = dict()
    query['query'] = {'match': {'name': '%s' % namekey}}
    query['fields'] = ['birth','name', 'company']
    query['_source'] = False
    query['sort'] = [{'birth':'desc'}]
    payload = json.dumps(query)
    r = requests.post(url, headers=headers, data=payload)
    if r.status_code != 200:
            return HttpResponse(status=r.status_code)
    
    re_from_es = json.loads(r.text)
    rdata = dict()
    rdata['totalNum'] = re_from_es['hits']['total']['value']
    details = re_from_es['hits']['hits']
    rdata['authors'] = list()
    for dt in details:
        tmp = dt['fields']
        obj = dict()
        obj['authorId'] = tmp['birth'][0]
        obj['name'] = tmp['name'][0]
        obj['affiliations'] = tmp['company']
        rdata['authors'].append(obj)
    return HttpResponse(json.dumps(rdata), content_type='application/json')

def author_view(request, authorid = ''):
    if authorid == '' and request.method == 'GET':
        authorid = request.GET.get('authorId')
    if authorid == '':
        return HttpResponse(status = 404)
    
    url = 'http://101.35.199.231:9200/test/_search?'
    headers = {'Content-Type': 'application/json'}
    query = dict()
    query['query'] = {'match': {'birth': '%s' % authorid}}
    payload = json.dumps(query)
    r = requests.post(url, headers=headers, data=payload)
    if r.status_code != 200:
            return HttpResponse(status=r.status_code)
    
    re_from_es = json.loads(r.text)
    rdata = re_from_es['hits']['hits'][0]['_source']
    return HttpResponse(json.dumps(rdata))