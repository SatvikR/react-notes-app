import React from "react";
import { Header, Container, Icon, List } from "semantic-ui-react";

const Home: React.FC = () => {
  return (
    <Container text>
      <Header as="h1" icon textAlign="center">
        <Icon name="pen square" circular />
        <Header.Content>Full Stack Notes App</Header.Content>
      </Header>
      <br />
      <Header as="h2">
        Login or Signup to Create and Save Notes on the cloud!
      </Header>
      <br />
      <Header as="h2">This app is made with:</Header>
      <List bulleted animated relaxed>
        <List.Item>
          <List.Content>
            <List.Header as="a" href="https://www.mongodb.com/" target="_blank">
              MongoDB
            </List.Header>
            <List.Description>Hosted on MongoDB Cloud Atlas</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header as="a" href="https://expressjs.com/" target="_blank">
              Express
            </List.Header>
            <List.Description>Server Hosted on aws</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header as="a" href="https://reactjs.org/" target="_blank">
              React
            </List.Header>
            <List.Description>Served on Netlify</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header
              as="a"
              href="https://www.typescriptlang.org/"
              target="_blank"
            >
              Typescript
            </List.Header>
            <List.Description>Language used to write code</List.Description>
          </List.Content>
        </List.Item>
      </List>
      <br />
      <List animated>
        <List.Item>
          <List.Icon name="github" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header
              as="a"
              href="https://github.com/SatvikR/react-notes-app"
              target="_blank"
            >
              SatvikR/react-notes-app
            </List.Header>
            <List.Description>Source Code</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  );
};

export default Home;
