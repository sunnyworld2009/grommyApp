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
import Logout from "../logout";
import Wallet from "../wallet";
import DrawBar from "../DrawBar";
import Header from '../core/header';
import styleGuide from '../core/styleGuide';
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
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
  
  _renderHeader(section, index, isActive) {
    console.log("header section is ", isActive);
    return (
      <View style={[styleGuide.accordionHeader]}>
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <Thumbnail source={{uri: section.photo}} />
        </View>
        <View style={{justifyContent: 'center', flex: 2}}>
          <Text style={ styleGuide.accordionHeadText } >Booking Id - { section.id }</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 2}}>
          {
            isActive ?
              <Icon active name="arrow-dropup" style={{ color: 'white' }} />
             : <Icon active name="arrow-dropdown" style={{ color: 'white' }} /> 
          }
        </View>
      </View>
    );
  }
  
  _renderContent(section) {
    return (
      <View style={styleGuide.accordionBody}>
        <Content>
          <ListItem >
            <Text style={ styleGuide.accordionText }>Client Name - { section.name }</Text>
          </ListItem>
          <ListItem>
            <Text style={ styleGuide.accordionText }>Client Location - { section.pickup_loc }</Text>
          </ListItem>
          <ListItem>
            <Text style={ styleGuide.accordionText }>Estimated Time - { section.pickuptime }</Text>
          </ListItem>
          <ListItem>
            <Text style={ styleGuide.accordionText }>Drop Location - { section.drop_loc } </Text>
          </ListItem>
          <ListItem>
            <Text style={ styleGuide.accordionText }>Price - { section.price }</Text>
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
        renderContent={this._renderContent}/>
    );
  }

  _openDrawer() {
    DrawerNav.navigate("DrawerOpen");
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Header isHomePage openDrawer={this._openDrawer} navigation={ this.props.navigation } />
        <Content style={{ padding: 15, backgroundColor: "#EEEEEE" }}>
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
    Wallet: { screen: Wallet },
    Logout: { screen: Logout }
  },
  {
    drawerWidth: 160,
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
