import express from "express";
import cors from "cors";
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import controllers from "./controllers";
import test from './controllers/posts/index';

const app = express();

// 미들웨어
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

// const today = new Date();
// const todayDayjs = dayjs(today).format("YYYY.MM.DD");
// console.log(todayDayjs);

// const password = "1234";
// const hashedPassword = bcrypt.hashSync(password, 10); // (password);
// console.log("비밀번호", hashedPassword);

// const token = jwt.sign("1234", "zxczxc");
// console.log("token: ", token);

// // GET Method
// // 유저 정보가져오기
// // 성공 status 200
// app.get("/users", (req, res) => {
//   res.status(200).json({ users });
// });

// // POST Method
// // 유저생성
// // 성공 status 201
// app.post("/users", (req, res) => {
//   const { name, age } = req.body;
//   console.log(req.body);
//   users.push({
//     id: new Date().getTime(),
//     name,
//     age,
//   });
//   res.status(201).json({ users });
// });

// // PATCH Method
// // 유저 수정
// // 성공 status 204
// // request.params.id
// app.patch("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, age } = req.body;
//   console.log(req.params);
//   const targetUserIdx = users.findIndex((user) => user.id === Number(id));

//   users[targetUserIdx] = {
//     id: users[targetUserIdx].id,
//     name: name ?? users[targetUserIdx].name,
//     age: age ?? users[targetUserIdx].age,
//   };
//   res.status(204).json({});
// });

// // DELETE Method
// // 유저 삭제
// // 성공 status 204
// app.delete("/users/:id", (req, res) => {
//   const { id } = req.params;

//   const deletedUsers = users.filter((user) => user.id !== Number(id));
//   users = deletedUsers;

//   res.status(204).json({});
// });

// req : 요청 => Request
// res : 응답 => Response
app.get("/", (req, res) => {
  res.send("Express");
});

app.listen(8000, () => {
  console.log("서버가 시작되었습니다.");
});
