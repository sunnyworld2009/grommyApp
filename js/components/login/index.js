import React, { Component } from "react";
import { Image } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";

const background = require("../../../images/testimage.png");
const background1 = require("../../../images/logo.png");

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
  }
  
  setUser(name) {
    // this.props.navigation.navigate("Home");
    if(!!this.props.formValues.test) {
      this.props.setUser(this.props.formValues.test.values);
    } 
    
  }
  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          placeholderTextColor='white'
          textColor='white'
          placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
          {...input}
          />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
          <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
        </Item>
        : <Text />}
      </Item>
    );
  }
  render() {
    
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <View style={styles.bg}>
              <View style={{width:200, height: 200, alignSelf:'center'}}>
                <Image source={background1} style={styles.shadow}></Image>
              </View>
              
              <Field name="email" component={this.renderInput} />
              <Field name="password" component={this.renderInput} />
              <Button
                block
                style={styles.btn}
                onPress={() => this.setUser()}
                >
                <Text>Login</Text>
              </Button>
              <View style={{alignItems: 'center',paddingTop: 10}}>
                <Text style={{color: 'white'}}>OR</Text>
              </View>
              <Button
                block
                style={styles.btn}
                onPress={() => this.props.navigation.navigate("Registration")}
                >
                <Text>Register Driver</Text>
              </Button>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}
const LoginSwag = reduxForm(
  {
    form: "test",
    validate
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};

const mapStateToProps = (state => ({
  formValues: state.form
}));

const mapDispatchToProps = dispatch => ({
  setUser: bindActionCreators(setUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSwag)
