import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Container,
  Form,
  Header,
  Button,
  Icon,
  Popup,
} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import api from "../API/api";
import { RouteComponentProps } from "react-router-dom";
import { AxiosResponse } from "axios";

interface IRouterProps {
  id: string;
}

const EditNote: React.FC<RouteComponentProps<IRouterProps>> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const id = props.match.params.id;

  useEffect(() => {
    api.get("/api/notes/find/" + id).then((res: AxiosResponse) => {
      setTitle(res.data.title);
      setText(res.data.text);
    }); // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    api.patch("/api/notes/" + id, {
      title: title,
      text: text,
    });
  };

  const handleBack = () => {
    api.patch("/api/notes/" + id, {
      title: title,
      text: text,
    });
    window.location.pathname = "/notes";
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <Header as="h2" floated="left">
        Edit Note:
      </Header>
      <Form>
        <Popup
          content="Save"
          trigger={
            <Button
              floated="right"
              icon
              basic
              color="green"
              onClick={handleSave}
            >
              <Icon name="save" />
            </Button>
          }
        />
        <Popup
          content="Save and Exit"
          trigger={
            <Button
              floated="right"
              icon
              basic
              color="blue"
              onClick={handleBack}
            >
              <Icon name="arrow alternate circle left outline" />
            </Button>
          }
        />
        <Form.Field>
          <label>Title:</label>
          <input
            placeholder="Title goes here"
            value={title}
            onChange={handleTitle}
          />
        </Form.Field>
        <Form.Field>
          <TextareaAutosize
            autoFocus
            minRows={20}
            value={text}
            onChange={handleText}
            style={{ fontSize: 16 }}
          />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default EditNote;
