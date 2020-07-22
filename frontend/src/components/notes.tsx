import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
  Icon,
  Button,
  Popup,
} from "semantic-ui-react";
import api from "../API/api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  _id: string;
  date: string;
}

const Note: React.FC<IProps> = ({ title, _id, date }) => {
  const deleteMethod = (_id: IProps["_id"]) => {
    api.delete(`/api/notes/${_id}`).catch((err: Error) => console.log(err));
  };

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={10}>
          <div
            style={{ marginTop: "4%", marginBottom: "3%", marginLeft: "3%" }}
          >
            <Header as="h2">
              <Icon name="file outline" /> {title}
            </Header>
            <p>Last Updated on: {date}</p>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <div style={{ marginTop: "4%" }}>
            <Segment textAlign="center">
              <Popup
                content="Edit"
                trigger={
                  <Button
                    icon
                    size="big"
                    as={Link}
                    to={"/edit-note/" + _id}
                    basic
                    color="blue"
                  >
                    <Icon name="edit outline" />
                  </Button>
                }
              />
              {"     "}
              <Popup
                content="Delete"
                trigger={
                  <Button
                    icon
                    size="big"
                    basic
                    color="red"
                    onClick={() => deleteMethod(_id)}
                  >
                    <Icon name="trash alternate outline" />
                  </Button>
                }
              />
            </Segment>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Array<any> | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      window.location.pathname = "/login";
    } else {
      createNotes();
    }
  });

  const createNotes = () => {
    let currNotes = [];
    api
      .get(`/api/notes/${localStorage.getItem("uid")}`)
      .then((res: AxiosResponse) => {
        currNotes = res.data;
        currNotes.reverse();
        setNotes(
          currNotes.map(
            (note: { title: string; _id: string; updatedAt: string }) => {
              return (
                <Note
                  title={note.title}
                  _id={note._id}
                  date={
                    new Date(note.updatedAt).toLocaleDateString() +
                    ", " +
                    new Date(note.updatedAt).toLocaleTimeString()
                  }
                />
              );
            }
          )
        );
      });
  };

  const handleCreate = () => {
    api
      .post("/api/notes/add", {
        owner: localStorage.getItem("uid"),
        title: "Untitled",
        text: "",
      })
      .then((res: AxiosResponse) => {
        window.location.pathname = "/edit-note/" + res.data.id;
      });
  };

  return (
    <Container>
      <Header size="large" floated="left">
        Notes:
      </Header>
      <Popup
        content="Create New"
        trigger={
          <Button
            floated="right"
            size="medium"
            icon
            basic
            color="green"
            onClick={handleCreate}
          >
            <Icon name="add" />
          </Button>
        }
      />
      <div>
        {notes || (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
      </div>
    </Container>
  );
};

export default Notes;
