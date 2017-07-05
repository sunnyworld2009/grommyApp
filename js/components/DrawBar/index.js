import React from "react";
import { AppRegistry, Image, TouchableOpacity, View } from "react-native";
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
// const routes = ["Home", "Profile", "Order History", "Wallet", "Logout"];
const routes = [
{
  name: "Home",
  iconName: "home"
},
{
  name: "Profile",
  iconName: "person"
},
{
  name: "Order History",
  iconName: "cart"
},
{
  name: "Wallet",
  iconName: "card"
},
{
  name: "Logout",
  iconName: "log-out"
}
];
const background = require("../../../images/logo.png");
export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container style={{ backgroundColor: '#1976D2' }}>
        <Content>
          <Image style={{ height: 100, width: 100, alignSelf: 'center' }} source={{uri: 'https://www.heartlandhealthcenters.org/wp-content/themes/twentytwelve-child/images/user_default.png'}} />
          <View style={{ marginTop: 20 }}>
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this.props.navigation.navigate(data.name)}
                    >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={ data.iconName } style={{ color: "white", alignSelf: "center" }} />
                      <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>{data.name}</Text>
                    </View>
                  </ListItem>
                );
              }} />
            </View>
        </Content>
      </Container>
    );
  }
}
