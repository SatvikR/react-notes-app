import React, { useState, useEffect } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../API/api";
import { AxiosResponse } from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      api
        .get(`/api/users/find/${localStorage.getItem("uid")}`)
        .then((res: AxiosResponse) => setCurrUser(res.data.username))
        .catch((err: Error) => console.log(err));
    }
  });

  const handleSubmit = () => {
    api
      .get(`/api/users/login/${username}&${password}`)
      .then((res: AxiosResponse) => {
        console.log(res.data.length);
        if (res.data.length === 0) {
          setFailedLogin(true);
        } else {
          localStorage.setItem("logged_in", "true");
          localStorage.setItem("uid", res.data[0]._id);
          window.location.pathname = "/notes";
        }
      })
      .catch((err: Error) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("logged_in");
    window.location.pathname = "/";
  };

  if (localStorage.getItem("logged_in")) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            You are currently logged in as {currUser}
          </Header>
          <Header as="h2" textAlign="center">
            <Icon name="log out" /> Log-out of your account
          </Header>
          <Form size="large" onSubmit={handleLogout}>
            <Button color="black" fluid size="large" type="submit">
              Logout
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {failedLogin && (
            <Message color="red" onDismiss={() => setFailedLogin(false)}>
              <Message.Header>Login Failed...</Message.Header>
              <p>Either your username or password was incorrect</p>
            </Message>
          )}
          <Header as="h2" textAlign="center">
            <Icon name="sign-in" /> Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Button color="black" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't Have an Account? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
};

export default Login;
