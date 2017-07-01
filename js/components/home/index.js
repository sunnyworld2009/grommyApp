import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import Notifications from "../notifications";
import Profile from "../profile";
import OrderHistory from "../orderHistory";
import Wallet from "../wallet";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
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
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import { getCurrentBookingData } from "../../actions/homeAction";
import styles from "./styles";
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

const mapStateToProps = state => ({
  userData: state.user.data,
  list: state.list.list,
  bookingData: state.home.bookingData
});

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };
  
  componentWillMount() {
    console.log("driver id is ",this.props.userData.driver_id);
    const driver_id = this.props.userData.driver_id;
    this.props.getCurrentBookingData(driver_id);
  }
  
  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }
  
  _renderHeader(section) {
    console.log("header section is ", section);
    return (
      <View style={styles.accordionHeader}>
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <Thumbnail source={{uri: section.photo}} />
        </View>
        <View style={{justifyContent: 'center', flex: 2}}>
          <Text note>Booking Id - { section.id }</Text>
        </View>
      </View>
    );
  }
  
  _renderContent(section) {
    return (
      <View style={styles.accordionBody}>
        <Content>
          <ListItem >
            <Text>Client Name - { section.name }</Text>
          </ListItem>
          <ListItem>
            <Text>Client Location - { section.pickup_loc }</Text>
          </ListItem>
          <ListItem>
            <Text>Estimated Time - { section.pickuptime }</Text>
          </ListItem>
          <ListItem>
            <Text>Drop Location - { section.drop_loc } </Text>
          </ListItem>
          <ListItem>
            <Text>Price - { section.price }</Text>
          </ListItem>
        </Content>
      </View>
    );
  }
  
  _renderBodyContent() {
    if(Object.keys(this.props.bookingData).length === 0) {
      return <ActivityIndicator size='large'/>
    } else if(this.props.bookingData.message === "not_available") {
      return (
        <View style={{ padding: 30}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>
            No Data
          </Text>
        </View>
      );
    }
    return (
      !!this.props.bookingData && !_.isEmpty(this.props.bookingData.orders) &&
      <Accordion
        sections={this.props.bookingData.orders}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        />
    );
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => DrawerNav.navigate("DrawerOpen")}
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
        <Content style={{ padding: 15 }}>
          {
            this._renderBodyContent()
          }
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    getCurrentBookingData: (driver_id) => dispatch(getCurrentBookingData(driver_id))
  };
}


const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 },
    Notifications: { screen: Notifications },
    Profile: { screen: Profile },
    "Order History": { screen: OrderHistory },
    Wallet: { screen: Wallet }
  },
  {
    contentComponent: props => <DrawBar {...props} />
}
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
