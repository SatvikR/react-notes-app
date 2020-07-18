import express from "express";
import User, { IUser } from "../models/User";
import mongoose from "mongoose";

const router: express.Router = express.Router();

router.route("/").get((_req: express.Request, res: express.Response) => {
  User.find()
    .then((users: IUser[]) => res.json(users))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/find/:id").get((req: express.Request, res: express.Response) => {
  User.findById(req.params.id)
    .then((user: IUser | null) => res.json(user))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req: express.Request, res: express.Response) => {
  const username: IUser["username"] = req.body.username;
  const password: IUser["password"] = req.body.password;
  const notes: IUser["notes"] = [];

  const newUser = new User({ username, password, notes });

  newUser
    .save()
    .then(() => res.json("User created"))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router
  .route("/update/:id")
  .patch((req: express.Request, res: express.Response) => {
    User.findById(req.params.id)
      .then((user: IUser | null) => {
        if (user) {
          user.username = req.body.username;
          user.password = req.body.password;

          user
            .save()
            .then(() => res.json("User updated"))
            .catch((err: Error) => res.status(400).json(`Error: ${err}`));
        } else {
          res.json("User not found");
        }
      })
      .catch((err: Error) => res.status(400).json(`Error: ${err}`));
  });

export default router;
