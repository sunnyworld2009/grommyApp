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

class Profile extends Component {
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
            <Title>Profile</Title>
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
        <Card style={{flex: 0}}>
          <CardItem>
            <Body>
            <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
              <Image style={{alignSelf: 'center'}} source={{uri: 'https://static1.squarespace.com/static/50de3e1fe4b0a05702aa9cda/t/50eb2245e4b0404f3771bbcb/1357589992287/ss_profile.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
            </View>
            <List>
              <ListItem >
                <Text>Name - William Shaw</Text>
              </ListItem>
              <ListItem>
                <Text>Contact- 97764646778</Text>
              </ListItem>
              <ListItem>
                <Text>Address - 221B Baker Street</Text>
              </ListItem>
              <ListItem>
                <Text>Vehicle Number - MH04 MQ6535</Text>
              </ListItem>
              <ListItem>
                <Text>License Number - 75674476689866</Text>
              </ListItem>
              <ListItem>
                <Text>Insurance No. - 8787076566588</Text>
              </ListItem>
              <ListItem>
                <Text>Insurance Expiry Date - 22/04/2020</Text>
              </ListItem>
            </List>
            </Body>
          </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

export default Profile;
