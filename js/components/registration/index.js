import React, { Component } from "react";
import { connect } from "react-redux";
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
  InputGroup,
  View,
  Input,
} from "native-base";

import styles from "./styles";

class Registration extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  
  render() {
    const { props: { name, index, list } } = this;
    console.log(this.props.navigation, "000000000");
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          
          <Body>
            <Title>{name ? this.props.name : "Register Driver"}</Title>
          </Body>
          
          <Right />
        </Header>
        
        <Content padder>
          <View style={styles.bg}>
            <List>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    placeholder={"Driver name"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Licence"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Expiry"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Model"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Car Number"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Contact"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver City"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Address"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Email"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Username"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Password"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Latitude"} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Driver Longitude"} />
                </InputGroup>
              </ListItem>
            </List>
            <Button
              block
              style={styles.btn}
              onPress={() => this.props.navigation.navigate("Home")}
              >
              <Text>Register</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(Registration);
