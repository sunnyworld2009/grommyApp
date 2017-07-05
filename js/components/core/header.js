import React, { Component } from "react";
import {
  View,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  List,
  ListItem,
} from "native-base";

export default class AppHeader extends Component {
  render() {
    return (
      <View>
        {
          !!this.props.isHomePage ?
          <Header style={{ backgroundColor: '#1565C0' }}>
            <Left>
            <Button
              transparent
              onPress={() => this.props.openDrawer()}
              >
              <Icon active name="menu" />
            </Button>
          </Left>
          
          <Body>
            <Title>Home</Title>
          </Body>
          
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Notifications")}
              >
              <Icon active name="notifications" />
            </Button>
          </Right>
          </Header>
          :
          <Header style={{ backgroundColor: '#1565C0' }}>
            <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          
          <Body>
            <Title>Order History</Title>
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
        }
        </View>
      );
  }
}