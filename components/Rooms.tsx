import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Modal, FlatList } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase'
import { firebaseConfig } from '../firebase'
import 'firebase/firestore'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/styles';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const roomsRef = db.collection('rooms')

export default function Rooms({navigation, route} : any) {
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const titleRef = useRef(null)
  const [rooms, setRooms] = useState<any>([])

  useEffect(() => {
    return roomsRef.onSnapshot((querySnapshot) => {
      const list: ((prevState: never[]) => never[]) | { id: string; title: any; description: string; }[] = [];
      querySnapshot.forEach(doc => {
        const { title } = doc.data();
        list.push({
          id: doc.id,
          title,
          description
        });
      });
      setRooms(list);
    });
  }, [])

  const handleTitle = (text : any) => {
    setTitle(text)
    console.log(title)
  }

  const handleSubmit = () => {
    if (title !== '') {
      const room = {
        title : title,
      }
      roomsRef.add(room)
      setTitle('')
      setDescription('')
      setModalVisible(false)
    }
  }

  const renderRoom = ({item} : any) => {
    console.log(item)
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
        <View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat', item.title)}>
            <View>
              <Text style={{color: '#000', fontSize: 24}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const itemSeperator = () => {
    return (
      <View style={{height: 0.3, width: '90%', backgroundColor: '#282C3D', marginBottom: 16, marginTop: 16, alignSelf: 'center'}} />
    )
  }

  return (
    <View style={{marginHorizontal: 16}}>
      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 32}}>Chat Rooms</Text>
        </View>
        <TouchableOpacity hitSlop={{right: 50, top: 50}} onPress={() => setModalVisible(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="pluscircle" size={24} color="#000"/>
            <Text style={{marginLeft: 6}}>New room</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        visible={modalVisible}
        animationType='slide'
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={{flexDirection: 'row', marginBottom: 24}}>
            <TouchableOpacity hitSlop={{right: 50, bottom: 50}} onPress={() => {
              setModalVisible(false)
              setTitle('')
              setDescription('')
              }}
            >
              <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                  <MaterialIcons name="keyboard-arrow-left" size={32} color="#000" />
                  <Text style={styles.navigationText}>Rooms</Text>
              </View>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 12}}>
              <TouchableOpacity hitSlop={{left: 50, bottom: 50}} onPress={handleSubmit}>
                <Text style={styles.navigationText}>Done</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <Text style={styles.headerText}>New Room</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.titleInput}
              placeholder = "Title"
              placeholderTextColor = "#b4bbbf"
              autoCapitalize = "sentences"
              ref = {titleRef}
              onChangeText={handleTitle}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        style={{marginTop: 16}}
        data={rooms}
        renderItem={renderRoom}
        // ItemSeparatorComponent={itemSeperator}
      />
    </View>
  )
}