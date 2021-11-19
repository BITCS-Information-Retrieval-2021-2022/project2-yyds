### 前后端接口定义

#### 搜索功能

|          |        Value         |
| :------: | :------------------: |
|   URL    |      `/search`       |
| 请求方式 |        `GET`         |
|   示例   | `/search?key=Bengio` |

- 请求参数

| 参数  |   类型   |    说明    |
| :---: | :------: | :--------: |
| `key` | `string` | 搜索关键字 |

- 响应结果

```json
{
    "totalNum": 50,
    "authors":
    [
        {
            "authorId": "1741101",
            "url": "http://82.156.177.164/author/1741101",
            "name": "Oren Etzioni",
            "photoUrl": "http://82.156.177.164/image/1741101.jpg",
            "academicTitle": "Professor",
            "affiliations":
            [
                "Allen Institute for AI"
            ],
            "fieldsOfStudy":
            [
                "Computer Science"
            ],
            "paperCount": 10,
            "citationCount": 50,
            "hIndex": 5,
            "coAuthors":
            [
                {
                    "authorId": "123",
                    "name": "Bob",
                    "copaperCount": 13,
                    "citationCount": 150,
                    "hIndex": 3
                }
            ],
            "papers":
            [
                {
                    "paperId": "649def34f8be52c8b66281af98ae884c09aef38b",
                    "url": "https://www.semanticscholar.org/paper/649def34f8be52c8b66281af98ae884c09aef38b",
                    "title": "Construction of the Literature Graph in Semantic Scholar",
                    "abstract": "We describe a deployed scalable system for organizing published scientific literature into a heterogeneous graph to facilitate algorithmic manipulation and discovery.",
                    "venue": "NAACL",
                    "year": 2018,
                    "referenceCount": 321,
                    "citationCount": 987,
                    "influentialCitationCount": 654,
                    "fieldsOfStudy":
                    [
                        "Computer Science"
                    ],
                    "authors":
                    [
                        {
                            "authorId": "1741101",
                            "name": "Oren Etzioni"
                        }
                    ]
                }
            ],
            "fieldsOfStudyByYear":
            [
                {
                    "startYear": 2001,
                    "endYear": 2021,
                    "details":
                    [
                        {
                            "year": 2001,
                            "interests":
                            [
                                {
                                    "fieldsOfStudy": "Computer Science",
                                    "paperCount": 2
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

