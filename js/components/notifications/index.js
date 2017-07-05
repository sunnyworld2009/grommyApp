import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import Header from '../core/header';

class Notifications extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header navigation={ this.props.navigation } />

        <Content padder>
          <List>
            <ListItem >
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </ListItem>
            <ListItem>
              <Text>It is a long established fact that a reader will be distracted by the readable content</Text>
            </ListItem>
            <ListItem>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </ListItem>
            <ListItem>
              <Text>It is a long established fact that a reader will be distracted by the readable content</Text>
            </ListItem>
            <ListItem>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </ListItem>
            <ListItem>
              <Text>It is a long established fact that a reader will be distracted by the readable content</Text>
            </ListItem>
            <ListItem>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Notifications;
