import * as Swaggers from "../controllers/swagger";
import defaultSwagger from "./defualtSwagger";

// 1) 가공하는 코드
const { paths } = Object.values(Swaggers).reduce(
  (acc, apis) => {
    const APIs = Object.values(apis).map((api) => {
      return { ...api };
    });
    APIs.forEach((api) => {
      const key = Object.keys(api)[0];

      if (!acc.paths[key]) {
        acc.paths = {
          ...acc.paths,
          ...api,
        };
      } else {
        acc.paths[key] = {
          ...acc.paths[key],
          ...api[key],
        };
      }
    });
    return acc;
  },
  { paths: {} }
);

// 2) 스웨거에 등록할 Json 만들기 defaultSwagger + 가공한 코드
export const swaggerDocs = {
  ...defaultSwagger,
  paths,
};

// 3) 스웨거에 등록하기
export const options = {
  swaggerOptions: {
    url: "/swagger.json",
  },
};
