import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
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

class Notifications extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Notifications</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

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
