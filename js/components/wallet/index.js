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
import Modal from 'react-native-modalbox';
import TextField from 'react-native-md-textinput';

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
          <View>
            {
              this.state.showUpdateMsg && <Text style={{ color: 'blue', paddingLeft: 20 }}>Amount Withdraw Requested - { this.state.amount }</Text>
          }
        </View>
      </Card>
      { this._showTransactions() }
      
      <Button
        block
        onPress={() => this.refs.modal2.open()}
        >
        <Text>Withdraw Request</Text>
      </Button>
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
      <Modal style={[styles.modal2]} backdrop={false}  position={"center"} ref={"modal2"}>
        <View style={styles.modal}>
          <TextField
            label={'Amount To Withdraw'}
            highlightColor={'#00BCD4'}
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
            block
            onPress={() => this.refs.modal2.close()}
            >
            <Text>Cancel</Text>
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            block
            onPress={() => this.withdrawRequest()}
            >
            <Text>Ok</Text>
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
    height: 230,
    backgroundColor: "white"
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
