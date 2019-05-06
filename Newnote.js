import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

type Props = {};
export default class Newnote extends Component<Props> {
constructor(props) {
  super(props);
  this.state = { text: 'Enter your new note here'};
}
   state = {
    modalVisible: true,
    note: "",
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _escapemodal(){
    this.props.setParentState({showCommentModal:false})
  }
  _onPublish() {
    console.log('onPublish')
// recuperer le commentaire tapé par le pelo 
// le comm est dans la variable this.state.note
var note = {
    titre: this.state.titre,
    description: this.state.description,
    datecreat: this.state.datecreat,
    datemodif: this.state.datemodif,
  } ;
// Envoyer au serveur 
fetch('http://192.168.33.50:3000/newnote', {
    // fetch('http://192.168.33.15:3000/users', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
    .then((response) => response.text())
    .then((datas) => {
      console.log(datas);
         // Fermer ma modale 
         this.props.setParentState({showCommentModal:false})
        // demander au Dashboard d'afficher la réponse 
        this.props.addnote(note)
    })
}
  render() {
    return (
      
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
         
         <View style={styles.container}>
                
          
            <View style={{ alignItems:'center', marginTop:100, }}>
                    <TextInput style={styles.text1}
                      multiline={true}
                      numberOfLines={10}
                      value={this.state.note}
                      placeholder="TITRE DE LA NOTE"
                      autoCorrect={false}
                      onChangeText={(text) => { this.setState({ note: text }) }} />
                    
                    <TextInput style={styles.textcom}
                      multiline={true}
                      numberOfLines={10}
                      value={this.state.note}
                      placeholder="CONTENU DE LA NOTE"
                      autoCorrect={false}
                      onChangeText={(text) => { this.setState({ note: text }) }} />

                <TouchableOpacity>
                  <Text style={styles.buttonpublish}
                    onPress={this._onPublish.bind(this)}>
                  Créer la note</Text>
                </TouchableOpacity>
                  </View>
          </View>
              <TouchableOpacity
                onPress={() => {
                  this._escapemodal(!this.state.modalVisible);
                }}>
                <Text style={{ fontSize: 30, textAlign: 'center', marginBottom:20, color:'red' }}>&#10006;</Text>
              </TouchableOpacity>
        
        </Modal>
        </View>
        
    );
  }
}
const styles = StyleSheet.create({
  text1 : {
    height:50,
    width:200,
    borderColor: 'silver',
    borderWidth:1,
    textAlign:'left',
    textAlignVertical: 'top',
    marginBottom:15
  },
  textcom: {
    height:100,
    width:200,
    borderColor: 'silver',
    borderWidth:1,
    textAlign:'left',
    textAlignVertical: 'top',
 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalStyle: {
    flexDirection: 'row',
    //Le margin et Padding "Bouscule" les autre view  
    
},
  modalLogoStyle: {
    marginTop: 30,
    height: 50,
    width: 50
  },
  buttonpublish : {
    marginTop: 20, 
    color: '#FFF', 
    backgroundColor:'black', 
    fontSize:40, 
    borderRadius:20, 
    borderColor: '#FFA500' ,
    borderWidth:10,
    textAlign: 'center'
  },
});