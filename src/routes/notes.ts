import express, { Router, Request, Response } from "express";
import Note, { INote } from "../models/Note";
import User, { IUser } from "../models/User";
import { Document } from "mongoose";

const router: Router = express.Router();

router.route("/").get((_req: Request, res: Response) => {
  Note.find()
    .then((notes: INote[]) => res.json(notes))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req: Request, res: Response) => {
  const owner: INote["owner"] = req.body.owner;
  const title: INote["title"] = req.body.title;
  const text: INote["text"] = req.body.text;

  const newNote: Document = new Note({ owner, title, text });

  newNote
    .save()
    .then(() => {
      User.findById(owner).then((user: IUser | null) => {
        if (user) {
          user.notes.push(newNote._id);
          user
            .save()
            .then(() => console.log("User updated"))
            .catch((err: Error) => console.log(`Error ${err}`));
        }
      });
      res.json("Note Created");
    })
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/:uid").get((req: Request, res: Response) => {
  const UserId: IUser["_id"] = req.params.uid;

  User.findById(UserId)
    .then((user: IUser | null) => {
      if (user) {
        const notes: IUser["notes"] = user.notes;

        Note.find({ _id: { $in: notes } })
          .then((notes: INote[]) => res.json(notes))
          .catch((err: Error) => res.status(400).json(`Error: ${err}`));
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req: Request, res: Response) => {
  const noteId: INote["_id"] = req.params.id;

  Note.findByIdAndDelete(noteId)
    .then(() => res.json("Note deleted"))
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").patch((req: Request, res: Response) => {
  Note.findById(req.params.id)
    .then((note: INote | null) => {
      if (note) {
        note.title = req.body.title;
        note.text = req.body.text;
        note
          .save()
          .then(() => res.json("Note updated"))
          .catch((err: Error) => res.status(400).json(`Error: ${err}`));
      }
    })
    .catch((err: Error) => res.status(400).json(`Error: ${err}`));
});

export default router;
