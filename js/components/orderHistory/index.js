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
import styles from "./styles";
import Accordion from 'react-native-collapsible/Accordion';

import { getOrderHistoryData } from "../../actions/orderHistoryAction";

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
  getOrderHistoryData: bindActionCreators(getOrderHistoryData, dispatch),
});

class OrderHistory extends Component {
  static navigationOptions = {
    header: null
  };
  
  componentWillMount() {
    this.props.getOrderHistoryData(this.props.userData.driver_id);
  }
  
  _renderHeader(section) {
    return (
      <View style={styles.accordionHeader}>
        <View style={{alignItems: 'center', flex: 2 }}>
          <Text style={{ fontSize: 20 }} note>Booking Details</Text>
          <Icon name="ios-arrow-round-down" color='grey' />
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
    if(Object.keys(this.props.previousOrders).length === 0) {
      return <ActivityIndicator size='large'/>
    } else if(this.props.previousOrders.message === "not_available") {
      return (
        <View style={{ padding: 30}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>
            No Data
          </Text>
        </View>
      );
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
          {
            this._renderBodyContent()
          }
        </Content>
      </Container>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (OrderHistory);
