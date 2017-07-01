import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { View, Image } from 'react-native';
import _ from 'lodash';
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

import { getWalletData } from "../../actions/walletAction";

const mapStateToProps = state => ({
  userData: state.user.data,
  list: state.list.list,
  walletAmount: state.wallet.wallet,
  transactions: state.wallet.transactions
});

const mapDispatchToProps = dispatch => ({
  getWalletData: bindActionCreators(getWalletData, dispatch),
});

class Wallet extends Component {
  static navigationOptions = {
    header: null
  };
  
  componentWillMount() {
    this.props.getWalletData(this.props.userData.driver_id);
  }
  
  _showTransactions() {
    return !_.isEmpty(this.props.transactions) && this.props.transactions.map((transaction) => {
      return (
        <Card>
          <List>
            <ListItem>
              <Text style={{ fontSize: 15 }}>$ { transaction.deposite }</Text>
              <Body>
                <Text>Booking Id - { transaction.tran_id } </Text>
                <Text note>Name - { transaction.driver_name }</Text>
              </Body>
            </ListItem>
          </List>
        </Card>
      );
    });
  }
  
  _renderBodyContent() {
    console.log(this.props.transactions);
    if(Object.keys(this.props.walletAmount) === null) {
      return <ActivityIndicator size='large'/>
    } else if(this.props.walletAmount.message === "not_available") {
      return (
        <View style={{ padding: 30}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>
            No Data
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 25 }}>$ { !!this.props.walletAmount[0] && this.props.walletAmount[0].amount }</Text>
          </View>
        </Card>
        { this._showTransactions() }
      </View>
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
            <Title>Wallet</Title>
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
          { this._renderBodyContent() }
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Wallet);
