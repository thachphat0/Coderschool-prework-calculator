import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  AsyncStorage
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneTransition: 0,
      segmentSelectedIndex : 0
    };
  }

  componentDidMount(){
    this.getSceneTransition();
    this.getSegmentSelectedIndex();
  }

  setSelectSceneTransition(scene) {
    try {
      this.setSceneTransition(scene);
      this.setState({
        sceneTransition: scene
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }

  async setSceneTransition(scene){
    try{
      await AsyncStorage.setItem('SCENE_SELECTED', scene);
      this.setState({
        sceneTransition : scene
      })
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      console.log(sceneTransitionValue);
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  segmentValues() {
    return ['10%', '15%', '50%'];
  }

  handleSegmentChange(index) {
    this.setState({
      segmentSelectedIndex : index
    })
    this.setSegmentSelectedIndex(index)
  }

  async setSegmentSelectedIndex(index){
    try{
      await AsyncStorage.setItem('SEGMENT_SELECTED_INDEX', index.toString());
      this.setState({
        segmentSelectedIndex : index
      })
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  async getSegmentSelectedIndex(){
    try{
      let index = await AsyncStorage.getItem("SEGMENT_SELECTED_INDEX");
      index = parseInt(index);
      this.setState({
        segmentSelectedIndex : index
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  render() {
    return(
      <View style={{marginTop:50,padding:10}}>
        <View>
          <Text style={{fontSize:25}}>Scene Transitions</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>

        <View>
          <Text style={{fontSize:25}}>Default Tip Percentage</Text>
          <SegmentedControlTab
            values={this.segmentValues()}
            selectedIndex={this.state.segmentSelectedIndex}
            onTabPress= {index => this.handleSegmentChange(index)}
          />
        </View>
      </View>
    )
  }
}

module.exports = Settings
