import React, { useEffect } from "react";
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

const EditNote: React.FC = (props) => {
  useEffect(() => {});

  return (
    <Container>
      <Header as="h2" floated="left">
        Edit Note:
      </Header>
      <Form>
        <Popup
          content="Save"
          trigger={
            <Button floated="right" icon basic color="green">
              <Icon name="save" />
            </Button>
          }
        />
        <Popup
          content="Back to Notes"
          trigger={
            <Button floated="right" icon basic color="blue">
              <Icon name="arrow alternate circle left outline" />
            </Button>
          }
        />
        <Form.Field>
          <label>Title:</label>
          <input placeholder="Title goes here" />
        </Form.Field>
        <Form.Field>
          <TextareaAutosize autoFocus minRows={20} />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default EditNote;
