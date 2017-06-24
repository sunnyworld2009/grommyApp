import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import Notifications from "../notifications";
import Profile from "../profile"
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
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
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
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 },
    Notifications: { screen: Notifications },
    Profile: { screen: Profile }
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
