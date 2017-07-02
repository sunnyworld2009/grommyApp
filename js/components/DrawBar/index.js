import React from "react";
import { AppRegistry, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Thumbnail,
} from "native-base";
const routes = ["Home", "Profile", "Order History", "Wallet", "Logout"];
const background = require("../../../images/logo.png");
export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Content>
          <Image style={{ height: 100, width: 100, alignSelf: 'center' }} source={{uri: 'https://www.heartlandhealthcenters.org/wp-content/themes/twentytwelve-child/images/user_default.png'}} />
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                  >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
            />
        </Content>
      </Container>
    );
  }
}
