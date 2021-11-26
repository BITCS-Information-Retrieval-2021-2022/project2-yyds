from django.http import HttpResponse
import json
import requests
from requests import status_codes

POST_FORM = '''
<form method='post' action='/api/search/'>
    Search keyword: <input type='text' name='key'>
    <input type='submit' value='post'>
</form>
'''
def hello_view(request):
    return HttpResponse(POST_FORM)

def search_view(request):
    url = 'http://101.35.199.231:9200/scholardb/_search?'
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        key = request.GET.get('key', '')

    elif request.method == 'POST':
        key = request.POST.get('key', '')

    else:
        return HttpResponse(status_codes='404')

    args = dict()
    args['query'] = {'dis_max':{'queries':[ 
            {'match': {'name': '%s' % key}}, 
            {'match': {'academicTitle': '%s' % key}},
            {'match': {'affiliations': '%s' % key}},
            {'match': {'papers.fieldsOfStudy': '%s' % key}},
            {'match': {'papers.title': '%s' % key}},
        ]}}
    # actully we still need fieldsOfStudy!
    args['_source'] = {'exclude':['coAuthors', 'papers']}
    # query['sort'] = [{'paperCount':'desc'}]
    payload = json.dumps(args)
    r = requests.post(url, headers=headers, data=payload)
    if r.status_code != 200:
            return HttpResponse(status=r.status_code)
    
    re_from_es = json.loads(r.text)
    rdata = dict()
    rdata['totalNum'] = re_from_es['hits']['total']['value']
    details = re_from_es['hits']['hits']
    rdata['authors'] = list()
    for dt in details:
        rdata['authors'].append(dt['_source'])
    return HttpResponse(json.dumps(rdata), content_type='application/json')

def author_view(request, authorid = ''):
    if authorid == '' and request.method == 'GET':
        authorid = request.GET.get('authorId')
    if authorid == '':
        return HttpResponse(status = 404)
    
    url = 'http://101.35.199.231:9200/scholardb/_search?'
    headers = {'Content-Type': 'application/json'}
    args = dict()
    args['query'] = {'match': {'authorId': '%s' % authorid}}
    payload = json.dumps(args)
    r = requests.post(url, headers=headers, data=payload)
    if r.status_code != 200:
            return HttpResponse(status=r.status_code)
    
    re_from_es = json.loads(r.text)
    if re_from_es['hits']['total']['value'] != 1:
        return HttpResponse(status=404)
    rdata = re_from_es['hits']['hits'][0]['_source']
    rdata['fieldsOfStudy'] = ['Computer Science', 'Edge Computing'] # haven't implement. just a place holder
    return HttpResponse(json.dumps(rdata), content_type='application/json')