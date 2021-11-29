import Mock from "mockjs";
import AuthorMock from "./authorMock";

export default Mock.mock(/\/author\?authorId=(.*)/, "get", (options) => {
  // const authorId = JSON.parse(options.body).id;
  const authorId = new URL("https://www.t.cn" + options.url).searchParams.get("authorId");   //TODO: ugly url parse solution
  return AuthorMock(authorId);
});
