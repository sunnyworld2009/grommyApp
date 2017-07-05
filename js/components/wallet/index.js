import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
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
import Modal from 'react-native-modalbox';
import TextField from 'react-native-md-textinput';
import Header from '../core/header';

import { getWalletData, setWithDrawAmount } from "../../actions/walletAction";

const mapStateToProps = state => ({
  userData: state.user.data,
  list: state.list.list,
  walletAmount: state.wallet.wallet,
  transactions: state.wallet.transactions
});

const mapDispatchToProps = dispatch => ({
  getWalletData: bindActionCreators(getWalletData, dispatch),
  setWithDrawAmount: bindActionCreators(setWithDrawAmount, dispatch),
});

class Wallet extends Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      amount: 0,
      showError: false,
      showUpdateMsg: false
    };
  }
  
  componentWillMount() {
    this.props.getWalletData(this.props.userData.driver_id);
  }
  
  withdrawRequest() {
    console.log("amount is ", this.state.amount);
    console.log("wallet is ", this.props.walletAmount[0].amount);
    if(!!this.props.walletAmount[0] && parseFloat(this.props.walletAmount[0].amount) >= parseFloat(this.state.amount)) {
      this.setState({
        showError: false
      });
      this.props.setWithDrawAmount(this.props.userData.driver_id, this.state.amount);
      this.setState({
        showUpdateMsg: true
      });
      this.refs.modal2.close();
    } else {
      this.setState({
        showError: true
      });
    }
  }
  
  onChanged(text) {
    // code to remove non-numeric characters from text
    text = text.replace(/\D/g,'');
    this.setState({amount: text});
  }
  
  _showTransactions() {
    return !_.isEmpty(this.props.transactions) && this.props.transactions.map((transaction) => {
      return (
        <Card style={{ backgroundColor: '#1E90FF' }}>
          <List>
            <ListItem>
              <Text style={{ fontSize: 15, color: 'white' }}>$ { transaction.deposite }</Text>
              <Body>
                <Text style={{ color: 'white' }}>Booking Id - { transaction.tran_id } </Text>
                <Text style={{ color: 'white' }}>Name - { transaction.driver_name }</Text>
                <Text style={{ color: 'white' }}>Date - { transaction.createdat }</Text>
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
          <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#3F51B5' }}>
            <Text style={{ fontSize: 25, color: 'white' }}>$ { !!this.props.walletAmount[0] && this.props.walletAmount[0].amount }</Text>
          </View>
          <View>
            {
              this.state.showUpdateMsg && <Text style={{ color: 'blue', paddingLeft: 20 }}>Amount Withdraw Requested - { this.state.amount }</Text>
          }
        </View>
      </Card>
      { this._showTransactions() }
      {
        !_.isEmpty(this.props.transactions) &&
          <View style={{ paddingTop: 10, marginBottom: 30 }}>
            <Button
              block
              onPress={() => this.refs.modal2.open()}
              >
              <Text>Withdraw Request</Text>
            </Button>
          </View>
      }
      
    </View>
  );
  
}

render() {
  const { props: { name, index, list } } = this;
  return (
    <Container>
      <Header navigation={ this.props.navigation } />
      
      <Content padder>
        { this._renderBodyContent() }
      </Content>
        <Modal style={[styles.modal2]} backdrop={false}  position={"center"} ref={"modal2"}>
        <View style={styles.modal}>
          <TextField
            label={'Amount To Withdraw'}
            highlightColor='white'
            labelColor='white'
            textColor='white'
            textFocusColor='white'
            onChangeText = {(text)=> this.onChanged(text)}
            keyboardType={'numeric'}
            value={this.state.amount}
            height={40}
            />
          <View>
            {
              this.state.showError && <Text style={{ color: 'red' }}>Please enter Amount less than Wallet Amount</Text>
          }
        </View>
        <View style={{ paddingTop: 20, flexDirection: 'row', alignItems: 'stretch' }}>
          <Button
            bordered 
            info
            onPress={() => this.refs.modal2.close()}
            >
            <Text>Cancel</Text>
          </Button>
          <Button
            style={{ marginLeft: 5, color: 'white', borderColor: 'white' }}
            bordered 
            onPress={() => this.withdrawRequest()}
            >
            <Text style={{ color: 'white' }}>Ok</Text>
          </Button>
        </View>
      </View>
    </Modal>
      
  </Container>
);
}
}

const styles = StyleSheet.create({
  
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  
  modal: {
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  
  modal2: {
    height: 200,
    width: 300,
    backgroundColor: "#3F51B5",
    borderRadius: 5
  },
  
  modal3: {
    height: 300,
    width: 300
  },
  
  modal4: {
    height: 300
  },
  
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  
  text: {
    fontSize: 22
  }
  
});

export default connect(mapStateToProps, mapDispatchToProps) (Wallet);
