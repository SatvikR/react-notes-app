import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import api from "../API/api";
import { AxiosResponse } from "axios";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeat, setRepeat] = useState<string>("");

  const [pswdMatch, setpswdMatch] = useState<boolean>(true);

  useEffect(() => {
    setpswdMatch(password === repeat);
  }, [password, repeat]);

  const handleSubmit = () => {
    if (pswdMatch) {
      api
        .post("/api/users/add", {
          username: username,
          password: password,
        })
        .then((res: AxiosResponse) => {
          localStorage.setItem("uid", res.data.id);
          window.location.pathname = "/notes";
        });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {!pswdMatch && (
          <Message warning>
            <Message.Header>Your Passwords Don't Match</Message.Header>
            <p>Please make sure your passwords match</p>
          </Message>
        )}
        <Header as="h2" textAlign="center">
          <Icon name="sign-in" /> Create an Account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repeat Password"
              type="password"
              value={repeat}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRepeat(e.target.value)
              }
            />
            <Button color="black" fluid size="large" type="submit">
              Signup
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;
