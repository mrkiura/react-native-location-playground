import React, { Component } from 'react'
import {StyleSheet, Text, View } from 'react-native';


exports.framework = 'React';
exports.title = 'Geolocation';
exports.description = 'Example using the Geolocation API';
exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): React.createElement<any> {
      return <Geolocation />;
    }
  }
]

export default class Geolocation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      initialPosition: 'unkown',
      lastPosition: 'unkown',
    }
  };
  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        console.log('initial position')
        console.log(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     );
     this.watchId = navigator.geolocation.watchPosition((position) => {
       let lastPosition = JSON.stringify(position);
        console.log('last position position')
        console.log(position);
        this.setState({lastPosition});
     })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  }
})