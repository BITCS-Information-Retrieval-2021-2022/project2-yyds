import Mock from "mockjs";
const Random = Mock.Random;




const AuthorMock = function (searchKey) {
  let authorId = String(Random.integer(1000000, 9999999));
  let paperCount = Random.integer(1, 50);

  return Mock.mock(  {
  "key|+1": 1,  //TODO: just for test
  "authorId": authorId,
  "url": `http://82.156.177.164/author/${authorId}`,
  // "name": Random.name(),
  "name": searchKey,  //TODO: use real name
  "photoUrl": `http://82.156.177.164/image/${authorId}.jpg`,
  "academicTitle|1": ["Professor", "Associate Professor", "instructor"],
  "affiliations|1-3":
    [
      Random.title(3, 5)
    ],
  "fieldsOfStudy|1-5":
    [
      Random.title(1, 5)
    ],
  "paperCount": paperCount,
  "realPaperCount": paperCount,
  "citationCount": Random.integer(1, 100),
  "hIndex": Random.integer(1, 20),
  "coAuthors|1-10":
    [
      {
        "authorId": String(Random.integer(1000000, 9999999)),
        "name": Random.name(),
        "copaperCount": Random.integer(1, 50),
        "citationCount": Random.integer(1, 100),
        "hIndex": Random.integer(1, 20)
      }
    ],
  [`papers|${paperCount}`]:
    [
      {
        "paperId": Random.id(),
        "url": Random.url(),
        "title": Random.title(),
        "abstract": Random.sentence(),
        "venue": Random.word(),
        "year": Number(Random.date('yyyy')),
        "referenceCount": Random.integer(1,100),
        "citationCount": Random.integer(1,100),
        "influentialCitationCount": Random.integer(1,100),
        "fieldsOfStudy|1-5":
          [
            Random.title(1, 5)
          ],
        "authors|1-5":
          [
            {
              "authorId": String(Random.integer(1000000, 9999999)),
              "name": Random.name()
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
})};

export default AuthorMock;
