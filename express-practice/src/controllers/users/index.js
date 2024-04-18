// 강의 버전

import { Router } from "express";
import { UserDTO, CreateUserDTO } from "./dto";

class UserController {
  router;
  path = "/users";
  users = [
    {
      id: 1,
      firstName: "junseok",
      lastName: "Park",
      age: 10,
    },
  ];

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/", this.getUsers.bind(this));
    this.router.get("/detail/:id", this.getUser.bind(this));
    this.router.get("/detail/:id/fullName", this.getUserFullName.bind(this));
    this.router.post("/", this.createUser.bind(this));
    this.router.patch("/:id", this.updateUser.bind(this));
    this.router.delete("/:id", this.deleteUser.bind(this));
  }

  getUsers(req, res, next) {
    try {
      const users = this.users.map((user) => new UserDTO(user));

      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }

  getUserFullName(req, res, next) {
    try {
      const { id } = req.params;
      const targetUser = this.users.find((user) => user.id === Number(id));

      if (!targetUser) {
        throw { status: 404, message: "유저를 찾을 수 없습니다." };
      }

      const user = new UserDTO(targetUser);

      res.status(200).json({ fullName: user.getFullName() });
    } catch (err) {
      next(err);
    }
  }

  getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = this.users.find((user) => user.id === Number(id));

      if (!user) {
        throw { status: 404, message: "유저를 찾을 수 없습니다." };
      }

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  createUser(req, res, next) {
    try {
      const { firstName, lastName, age } = req.body;

      if (!firstName || !lastName) {
        throw { status: 404, message: "이름이 없습니다." };
      }

      const newUser = new CreateUserDTO(firstName, lastName, age).getNewUser();

      this.users.push(newUser);

      res.status(201).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }

  updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { age, firstName, lastName } = req.body;

      const targetUserIdx = this.users.findIndex(
        (user) => user.id === Number(id)
      );

      this.users[targetUserIdx] = {
        id: this.users[targetUserIdx].id,
        firstName: firstName ?? this.users[targetUserIdx].firstName,
        age: age ?? this.users[targetUserIdx].age,
      };

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUsers = this.users.filter((user) => user.id !== Number(id));
      this.users = deletedUsers;

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();
export default userController;
