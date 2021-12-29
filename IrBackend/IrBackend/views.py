from django.http import HttpResponse
import json
import requests
# from requests import status_codes

POST_FORM = '''
<form method='post' action='/api/search/'>
    Search keyword: <input type='text' name='key'>
    <input type='submit' value='post'>
</form>
'''


def hello_view(request):
    return HttpResponse(POST_FORM)


def search_view(request):
    url = 'http://xx.xx.xx.xx:yyyy/mergeauthors/_search?'
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        key = request.GET.get('key', '')

    elif request.method == 'POST':
        key = request.POST.get('key', '')

    else:
        return HttpResponse(status_codes='404')

    args = dict()
    args['query'] = {'dis_max': {'queries': [
        {'match': {'name': '%s' % key}},
        {'match': {'academicTitle': '%s' % key}},
        {'match': {'affiliations': '%s' % key}},
        {'match': {'papers': '%s' % key}},
    ]}}
    args['_source'] = {'exclude': ['coAuthors', 'papers']}
    args['size'] = 200
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
        item = dt['_source']
        if 'academicTitle' not in item:
            item['academicTitle'] = "🎅"
        if 'affiliations' not in item:
            item['affiliations'] = ["🎈", "🎄", "🤶"]
        item['photoUrl'] = "http://xx.xx.xx.xx/api/static/chrismas.jpg"
        rdata['authors'].append(item)
    return HttpResponse(json.dumps(rdata), content_type='application/json')


class coAuthorItem:
    def __init__(self, authorId, name):
        self.copaperCount = 1
        self.authorId = authorId
        self.name = name


def author_view(request, authorid=''):
    if authorid == '' and request.method == 'GET':
        authorid = request.GET.get('authorId')
    if authorid == '':
        return HttpResponse(status=404)

    url = 'http://xx.xx.xx.xx:yyyy/mergeauthors/_search?'
    url_paper1 = 'http://xx.xx.xx.xx:yyyy/paper_col/_search?'
    url_paper2 = 'http://xx.xx.xx.xx:yyyy/mergepaper/_search?'
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
    if 'academicTitle' not in rdata:
        rdata["academicTitle"] = "🎅"
    if 'affiliations' not in rdata:
        rdata['affiliations'] = ["🎈", "🎄", "🤶"]
    rdata["photoUrl"] = "http://xx.xx.xx.xx/api/static/chrismas.jpg"
    papers_list = list()
    fields_of_study = dict()
    rdata['realPaperCount'] = rdata['paperCount']
    rdata['paperCount'] = 0
    for paper_id in rdata["papers"]:
        args['query'] = {'match': {'paperId': '%s' % paper_id}}
        payload = json.dumps(args)
        r = requests.post(url_paper1, headers=headers, data=payload)
        re_from_es = json.loads(r.text)
        if re_from_es['hits']['total']['value'] != 1:
            args['query'] = {'match': {'_id': '%s' % paper_id}}
            payload = json.dumps(args)
            r = requests.post(url_paper2, headers=headers, data=payload)
            re_from_es = json.loads(r.text)
            if re_from_es['hits']['total']['value'] != 1:
                print("NO REC %s" % paper_id)
                continue
        rdata['paperCount'] += 1
        paperinfo = re_from_es['hits']['hits'][0]['_source']
        if 'fieldsOfStudy' in paperinfo:
            for field in paperinfo['fieldOfStudy']:
                if field in fields_of_study:
                    fields_of_study[field] += 1
                else:
                    fields_of_study[field] = 1
        else:
            paperinfo['fieldsOfStudy'] = ["🔔", "🎁", "🧦"]
        if 'venue' not in paperinfo:
            paperinfo['venue'] = "🎄"
        else:
            paperinfo['venue'] = paperinfo['venue'].capitalize()
        papers_list.append(paperinfo)
    rdata['papers'] = papers_list
    rdata['fieldsOfStudy'] = list()
    if len(fields_of_study) == 0:
        rdata['fieldsOfStudy'] = ["🔔", "🎁", "🧦"]
    else:
        for tp in sorted(fields_of_study.items(),
                         key=lambda kv: (kv[1], kv[0]), reverse=True)[0:4]:
            rdata['fieldsOfStudy'].append(tp[0])
    return HttpResponse(json.dumps(rdata), content_type='application/json')
