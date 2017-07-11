import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image } from 'react-native';
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
import Header from '../core/header';

const mapStateToProps = state => ({
  userData: state.user.data,
  list: state.list.list,
  bookingData: state.home.bookingData
});

class Profile extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { props: { name, index, list } } = this;
    const userData =  this.props.userData;
    return (
      <Container>
        <Header name="Profile" navigation={ this.props.navigation } />
        
        <Content padder>
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                {
                  !!userData.driver_photo &&
                  <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
                    <Image style={{alignSelf: 'center'}} source={{uri: userData.driver_photo }} style={{height: 200, width: 200, flex: 1}}/>
                  </View>
                }
                
                <List>
                  <ListItem >
                    <Text>Name - { userData.driver_name }</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Contact- { userData.driver_contact }</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Address - { userData.driver_address }</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Vehicle Number - { userData.driver_carno }</Text>
                  </ListItem>
                  <ListItem>
                    <Text>License Number - { userData.driver_licence}</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Insurance Expiry Date - { userData.driver_expiry }</Text>
                  </ListItem>
                </List>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect (mapStateToProps) (Profile);
