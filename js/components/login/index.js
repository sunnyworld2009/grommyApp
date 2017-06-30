import React, { Component } from "react";
import { Image } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import _ from 'lodash';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  ListItem,
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
  /* if (ema.length < 8 && ema !== "") {
  error.email = "too short";
  }
  if (pw.length > 12) {
  error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
  error.password = "Weak";
  } */
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      showError: false
    };
    this.renderInput = this.renderInput.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.formValues.test, nextProps.formValues.test)) {
      this.setState({
        showError: false
      });
    }
    
    if(!!nextProps.userData && nextProps.userData.message === "success") {
      this.props.navigation.navigate("Home");
    }
  }
  
  setUser(name) {
    // this.props.navigation.navigate("Home");
    if(!!this.props.formValues.test && !!this.props.formValues.test.values && !!this.props.formValues.test.values.email && !!this.props.formValues.test.values.password) {
      this.props.setUser(this.props.formValues.test.values);
    } else {
      this.setState({
        showError: true
      });
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
    if(!!this.props.userData && this.props.userData.message === "success") {
      this.props.navigation.navigate("Home");
    }
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
              <View style={{alignItems: 'center',paddingTop: 10}}>
                {
                  this.state.showError && <Text style={{ color: 'red' }}>All Fields are mandatory</Text>
              }
            </View>
            <View style={{alignItems: 'center',paddingTop: 10}}>
              {
                !!this.props.userData && this.props.userData.message === "invalid" && <Text style={{ color: 'red' }}>Please Enter Correct Username and Password</Text>
            }
          </View>
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
  formValues: state.form,
  userData: state.user.data
}));

const mapDispatchToProps = dispatch => ({
  setUser: bindActionCreators(setUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSwag)
