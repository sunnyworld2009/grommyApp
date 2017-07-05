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
import Header from '../core/header';
import styleGuide from '../core/styleGuide';
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
  
  _renderHeader(section, index, isActive) {
    return (
      <View style={[styleGuide.accordionHeader]}>
        <View style={{alignItems: 'center', flex: 2 }}>
          <Text style={styleGuide.accordionHeadText}>Booking Details</Text>
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
            <Text style={styleGuide.accordionText}>Client Name - { section.name }</Text>
          </ListItem>
          <ListItem>
            <Text style={styleGuide.accordionText}>Client Location - { section.pickup_loc }</Text>
          </ListItem>
          <ListItem>
            <Text style={styleGuide.accordionText}>Estimated Time - { section.pickuptime }</Text>
          </ListItem>
          <ListItem>
            <Text style={styleGuide.accordionText}>Drop Location - { section.drop_loc } </Text>
          </ListItem>
          <ListItem>
            <Text style={styleGuide.accordionText}>Price - { section.price }</Text>
          </ListItem>
        </Content>
      </View>
    );
  }
  
  _renderBodyContent() {
    if(!!this.props.previousOrders && Object.keys(this.props.previousOrders).length === 0) {
      return <ActivityIndicator size='large'/>
    } else if(!!this.props.previousOrders && this.props.previousOrders.message === "not_available") {
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
        sections={this.props.previousOrders.orders}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}/>
    );
  }
  
  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header navigation={ this.props.navigation } />
        
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
