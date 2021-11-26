import Mock from 'mockjs';
// import AuthorMock from "./authorMock";
const Random = Mock.Random;


export default Mock.mock(/\/search\?key=(.*)/, "get", (options) => {
  // const searchKey = JSON.parse(options.body).key;
  // const searchKey = options.url.replace("/search?key=", "");
  const searchKey = new URL("https://example.com" + options.url).searchParams.get("key");  //TODO: ugly url parse solution
  let totalNum = Random.integer(1, 50);
  // let authors = `authors|${totalNum}`;
  let authorId = String(Random.integer(1000000, 9999999));
  let paperCount = Random.integer(1, 50);
  return (
    Mock.mock({
      "totalNum": totalNum,
      [`authors|${totalNum}`]:
        [
          // AuthorMock(searchKey)
          {
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
          }
        ]
    })
  );
});
