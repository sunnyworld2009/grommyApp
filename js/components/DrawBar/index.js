import React from "react";
import { AppRegistry, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "BlankPage2"];
const background = require("../../../images/logo.png");
export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/2GjQ8GaAMwyX3iAl-6R8-T9AA3kC0XXYgIrZkBzye0lZLBK-u7cYulkmzc6tddAWDYI=w300"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("DrawerClose")}
            >
              <Image
                square
                style={{ height: 80, width: 70 }}
                source={{
                  uri: "https://lh3.googleusercontent.com/2GjQ8GaAMwyX3iAl-6R8-T9AA3kC0XXYgIrZkBzye0lZLBK-u7cYulkmzc6tddAWDYI=w300"
                }}
              />
            </TouchableOpacity>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
