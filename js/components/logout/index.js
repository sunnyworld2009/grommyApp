import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import {
  View,
  Image,
  ActivityIndicator,
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
  Right,
  Body,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";
import Accordion from 'react-native-collapsible/Accordion';
import SInfo from 'react-native-sensitive-info';

import { DrawerNavigator, NavigationActions } from "react-navigation";

import { logout } from "../../actions/logoutAction";

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];

const mapStateToProps = state => ({
  userData: state.user.data,
  list: state.list.list,
  previousOrders: state.orderHistory.orders
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

class Logout extends Component {
  static navigationOptions = {
    header: null
  };
  
  componentWillMount() {
    SInfo.deleteItem('driver_username', {
      sharedPreferencesName: 'SnappyGroom',
      keychainService: 'SnappyGroom' });

    SInfo.deleteItem('driver_password', {
      sharedPreferencesName: 'SnappyGroom',
      keychainService: 'SnappyGroom' });

    this.props.logout();

    const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
            key: null
        });

this.props.navigation.dispatch(resetAction);
  }
  
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
        
        <Content padder>
          <Text> Logging Off</Text>
          </Content>
      </Container>
    );
  }
}

export default connect (null, mapDispatchToProps)(Logout);
