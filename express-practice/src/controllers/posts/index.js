// 혼자 해본 버전

import { Router } from "express";

const router = Router();
const path = "/posts";

const posts = [
  {
    id: 1,
    title: "ㄴㅇㅁㄴㅇ",
    content: "안녕하세요, 프론트엔드 개발자가 백엔드도 배웁니다.",
  },
];

const getPosts = (req, res) => {
  res.status(200).json({ posts });
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  posts.push({
    id: new Date().getTime(),
    title,
    content,
  });

  res.status(201).json({ posts });
};

router.get("/", getPosts);
router.post("/", createPost);

export default { router, path };
