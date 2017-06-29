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
    
    console.log("Name is ",this.state.name);
    console.log("Name is ",this.state.license);
    console.log("Name is ",this.state.expiry);
    console.log("Name is ",this.state.model);
    console.log("Name is ",this.state.carNumber);
    console.log("Name is ",this.state.contactNumber);
    console.log("Name is ",this.state.city);
    console.log("Name is ",this.state.address);
    console.log("Name is ",this.state.email);
    console.log("Name is ",this.state.username);
    console.log("Name is ",this.state.password);
    
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
        
        console.log(this.state.avatarSource);
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
              <List>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({name: text})}
                      value={this.state.name}
                      placeholder={"Driver name"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({license: text})}
                      value={this.state.license}
                      placeholder={"Driver Licence"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({expiry: text})}
                      value={this.state.expiry}
                      placeholder={"Driver Expiry"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({model: text})}
                      value={this.state.model}
                      placeholder={"Driver Model"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({carNumber: text})}
                      value={this.state.carNumber}
                      placeholder={"Driver Car Number"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({contactNumber: text})}
                      value={this.state.contactNumber}
                      placeholder={"Driver Contact"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({city: text})}
                      value={this.state.city}
                      placeholder={"Driver City"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({address: text})}
                      value={this.state.address}
                      placeholder={"Driver Address"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                      placeholder={"Driver Email"} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input
                      onChangeText={(text) => this.setState({username: text})}
                      value={this.state.username}
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
                
                <View style={styles.accordionHeader}>
                  <View style={{justifyContent: 'center', flex: 2}}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        <Text style={{color: '#575757'}}>Select a Photo</Text>
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
              </List>
              <Button
                block
                style={styles.btn}
                onPress={() => this.onRegisterPress()}
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
  