import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image } from 'react-native';
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
  Card,
  CardItem,
  Thumbnail,
} from "native-base";

class Wallet extends Component {
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
            <Title>Wallet</Title>
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
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 25 }}>$ 2000</Text>
            </View>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Text style={{ fontSize: 15 }}>$ 2000</Text>
                <Body>
                  <Text>Booking Id - 121 </Text>
                  <Text note>Name - Sherlock Holmes</Text>
                </Body>
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Text style={{ fontSize: 15 }}>$ 2000</Text>
                <Body>
                  <Text>Booking Id - 121 </Text>
                  <Text note>Name - Sherlock Holmes</Text>
                </Body>
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Text style={{ fontSize: 15 }}>$ 2000</Text>
                <Body>
                  <Text>Booking Id - 121 </Text>
                  <Text note>Name - Sherlock Holmes</Text>
                </Body>
              </ListItem>
            </List>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Wallet;
