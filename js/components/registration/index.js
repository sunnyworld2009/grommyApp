import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  Image,
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
  InputGroup,
  View,
  Input,
  Thumbnail,
} from "native-base";
import ImagePicker from 'react-native-image-picker';

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
      name: "",
      avatarSource: null,
    };
  }
  
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: source
        });
      }
    });
  }
  
  render() {
    const { props: { name, index, list } } = this;
    console.log(this.props.navigation, "000000000");
    let imageUri = null;
    if(!!this.state.avatarSource) {
      imageUri = this.state.avatarSource;
      console.log("image uri is ", imageUri);
    }
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
            <List>
              
              <View style={styles.accordionHeader}>
                <View style={{justifyContent: 'center', flex: 2}}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                      <Text>Select a Photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 10, flex: 1}}>
                  {
                    this.state.avatarSource === null ?
                    <Thumbnail source={{ uri: 'https://www.heartlandhealthcenters.org/wp-content/themes/twentytwelve-child/images/user_default.png' }} /> :
                      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        <Image style={styles.avatar} source={this.state.avatarSource} />
                      </View>
                    }
                    
                  </View>
                </View>
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
  