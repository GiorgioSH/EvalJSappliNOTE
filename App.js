/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Newnote from './Newnote.js';


type Props = {};
export default class App extends Component<Props> {
  state = {
    notes: [],
    currentnote:'',
    showCommentModal: false,
}
_addnote(note) {

  console.log('nouvelle note ?', note) ;

  console.log( this.state.currentnote.note) ;
  var allnotes =  this.state.currentnote.note || [] ;
  allnotes.push(notes) ;
  var currentnote = this.state.currentnote ;
  currentnote.note = allnotes;
  this.setState({currentnote : currentnote}) ;
}
_buttonComment() {
  this.setState({ showCommentModal: true })
}
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            
            <Text style={{ fontSize: 30 }}>&#128221;</Text>
            <Text style={{fontSize:30}}>TOUTES LES NOTES</Text>
          </View>

          <View style={styles.bouton }>
            <TouchableOpacity style={styles.boutontext}
            onPress={() => {
              this._buttonComment();
          }}>
                    <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
          {(this.state.showCommentModal) ? (
                                    <View>
                                       <Newnote setParentState={this.setState.bind(this)} addnote={this._addnote.bind(this)} />
                                    </View>
                                ) : (
                                        <View>
                                        </View>
                                    )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
   
    marginTop:15,
  },
  boutontext:{
    position: 'absolute',
    zIndex: 11,
    right:20,
    top:390,
    backgroundColor:"#FFA500",
    width:90,
    height:90,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    

  },
  plus: {
   fontSize:25,
   color: 'white',
  },
  container: {
    flex: 1,
  
    backgroundColor: '#F5FCFF',
  },
  
});
