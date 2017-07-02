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
  Picker,
  Item,
} from "native-base";
import ImagePicker from 'react-native-image-picker';
import TextField from 'react-native-md-textinput';

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
      license: '',
      expiry: '',
      model: '',
      carNumber: '',
      contactNumber: '',
      city: '',
      address: '',
      email: '',
      username: '',
      password: '',
      avatarSource: null,
      showError: false
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
          avatarSource: source,
          avatarData: response.data
        });
      }
    });
  }
  
  onValueChange (value: string) {
    this.setState({
      driverAvailable : value
    });
  }
  
  onRegisterPress() {
    
    if(!this.state.name || !this.state.license || !this.state.expiry || !this.state.model || !this.state.carNumber || !this.state.contactNumber
      || !this.state.city || !this.state.address || !this.state.email || !this.state.username || !this.state.password
      || !this.state.avatarSource ) {
        this.setState({
          showError: true
        });
        return;
      } else {
        this.setState({
          showError: false
        });
        
        let self = this;
        
        const formdata = new FormData();
        formdata.append("driver_name", this.state.name);
        formdata.append("driver_licence", this.state.license);
        formdata.append("driver_expiry", this.state.expiry);
        formdata.append("driver_model", this.state.model);
        formdata.append("driver_carno", this.state.carNumber);
        formdata.append("driver_contact", this.state.contactNumber);
        formdata.append("driver_city", this.state.city);
        formdata.append("driver_address", this.state.address);
        formdata.append("driver_email", this.state.email);
        formdata.append("driver_username", this.state.username);
        formdata.append("driver_password", this.state.password);
        formdata.append('driver_photo', {
          uri: this.state.avatarSource.uri,
          type: 'image/jpeg', // or photo.type
          name: 'testPhotoName'
        });
        fetch("http://hairdiction.technoplanetsoftwares.com/web/driver.php", {
          method: 'post',
          body: formdata
        }).then((response) => response.json())
        .catch((error) => {
          console.log("ERROR " + error)
        })
        .then((responseData) => {
          alert("Driver Registered Successfully");
          setTimeout(() =>{
            self.props.navigation.goBack();
          },3000);
        }).done();
      }
      
    }
    
    render() {
      const { props: { name, index, list } } = this;
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
              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='person' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                  label={'Driver Name'}
                  highlightColor='white'
                  labelColor='white'
                  textColor='white'
                  textFocusColor='white'
                  onChangeText={(text) => {
                    this.setState({name: text})
                  }}
                  value={this.state.name}
                height={40} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='document' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver License'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({license: text})
                    }}
                    value={this.state.license}
                    height={40} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='calendar' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Expiry'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({expiry: text})
                    }}
                    value={this.state.expiry}
                    height={40} />
                </View>                
              </View>
            
              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='car' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Model'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({model: text})
                    }}
                    value={this.state.model}
                    height={40} />
                </View>                
              </View>
              
              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='car' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Car Number'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({carNumber: text})
                    }}
                    value={this.state.carNumber}
                    height={40} />
                </View>                
              </View>
              
              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='call' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Contact'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({contactNumber: text})
                    }}
                    value={this.state.contactNumber}
                    height={40}
                    keyboardType={'numeric'} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='home' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver City'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({city: text})
                    }}
                    value={this.state.city}
                    height={40} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='home' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Address'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({address: text})
                    }}
                    value={this.state.address}
                    height={40} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='mail' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Email'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({email: text})
                    }}
                    value={this.state.email}
                    height={40} />
                </View>                
              </View>

              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='person' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Username'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({username: text})
                    }}
                    value={this.state.username}
                    height={40} />
                </View>                
              </View>         
              
              <View style={{ flex: 1, alignItems: 'stretch' ,flexDirection: "row"}} >
                <View style={{ flex: 0.1, justifyContent: 'flex-end' }} ><Icon color='white' style={{ color: 'white' }} name='eye' /></View>
                <View style={{ flex: 0.9, paddingLeft: 5 }}>
                  <TextField
                    label={'Driver Password'}
                    highlightColor='white'
                    labelColor='white'
                    textColor='white'
                    textFocusColor='white'
                    onChangeText={(text) => {
                      this.setState({password: text})
                    }}
                    value={this.state.password}
                    height={40} />
                </View>                
              </View>     
              
              <View style={styles.accordionHeader}>
                <View style={{justifyContent: 'center', flex: 2}}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                      <Text style={{color: 'white'}}>Select a Photo</Text>
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
                <ListItem>
                  {
                    this.state.showError && <Text style={{ color: 'red' }}>All Fields are mandatory</Text>
                }
              </ListItem>
              <Button
                block
                iconLeft
                style={styles.btn}
                onPress={() => this.onRegisterPress()}
                >
                <Icon name='people' />
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
  