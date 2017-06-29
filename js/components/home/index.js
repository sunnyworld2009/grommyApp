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
  name: state.user.name,
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
  
  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }
  
  _renderHeader(section) {
    return (
      <View style={styles.accordionHeader}>
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <Thumbnail source={{uri: 'https://www.heartlandhealthcenters.org/wp-content/themes/twentytwelve-child/images/user_default.png'}} />
        </View>
        <View style={{justifyContent: 'center', flex: 2}}>
          <Text note>Booking 1</Text>
        </View>
      </View>
    );
  }
  
  _renderContent(section) {
    return (
      <View style={styles.accordionBody}>
        <Content>
          <ListItem >
            <Text>Client Name - XYZ</Text>
          </ListItem>
          <ListItem>
            <Text>Client Location - XYZ</Text>
          </ListItem>
          <ListItem>
            <Text>Estimated Time - XYZ</Text>
          </ListItem>
          <ListItem>
            <Text>Pickup & Drop Coordinates - XYZ </Text>
          </ListItem>
          <ListItem>
            <Text>Payment Mode - XYZ</Text>
          </ListItem>
        </Content>
      </View>
    );
  }
  
  _renderBodyContent() {
    if(Object.keys(this.props.bookingData).length === 0) {
      return <ActivityIndicator size='large'/>
    }
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        />
    );
  }
  
  render() {
    console.log(DrawNav, "786785786");
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
    openDrawer: () => dispatch(openDrawer())
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
