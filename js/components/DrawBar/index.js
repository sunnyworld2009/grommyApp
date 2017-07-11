import React from "react";
import { AppRegistry, Image, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
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

const mapStateToProps = state => ({
  userData: state.user.data,
});

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const userData =  !!this.props.userData && this.props.userData;
    console.log("userdata is ", userData);
    return (
      <Container style={{ backgroundColor: '#1976D2' }}>
        <Content>
        {
          !this.props.userData ?
            <Image style={{height: 100, width: 100, alignSelf: 'center', marginTop: 10 }} source={{uri: 'https://www.heartlandhealthcenters.org/wp-content/themes/twentytwelve-child/images/user_default.png'}} />
           : 
            <Image style={{height: 100, width: 100, alignSelf: 'center', marginTop: 10 }} source={{uri: this.props.userData.driver_photo}} />
        }
          <View style={{ marginTop: 20, borderTopColor: 'white', borderTopWidth: 1 }}>
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem
                    style={{borderBottomWidth: 0}}
                    button
                    onPress={() => this.props.navigation.navigate(data.name)}
                    >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name={ data.iconName } style={{ color: "white", alignSelf: "center" }} />
                      <Text style={{fontSize: 17, color: 'white', alignSelf: 'center'}}>{data.name}</Text>
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

export default connect (mapStateToProps, null) (DrawBar);
