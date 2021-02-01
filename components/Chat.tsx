import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, Button, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase'
import { firebaseConfig } from '../firebase'
import 'firebase/firestore'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default function Chat({navigation, route} : any) {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])

  console.log(route.params)

  const chatsRef = db.collection(route.params)

  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot: { docChanges: () => any[] }) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
            const message = doc.data()
            return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a: { createdAt: { getTime: () => number } }, b: { createdAt: { getTime: () => number } }) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

  async function readUser() {
    const user = await AsyncStorage.getItem(route.params + 'User')
    if (user) {
      setUser(JSON.parse(user))
    }
  }
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem(route.params + 'User', JSON.stringify(user))
    setUser(user)
  }
  async function handleSend(messages: any[]) {
    const writes = messages.map((m: any) => chatsRef.add(m))
    await Promise.all(writes)
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>{route.params}</Text>
        <TextInput style={styles.input} placeholder="Enter your alias" value={name} onChangeText={setName} />
        <Button onPress={handlePress} title="Enter" />
      </View>
    )
  }
  return (
    <View
    style={{flex : 1}}
    accessible
    accessibilityLabel='main'
    testID='main'
    >
      <SafeAreaView style={{flexDirection: 'row', marginBottom: 24}}>
        <TouchableOpacity hitSlop={{right: 50, bottom: 50}} onPress={() => {
          navigation.navigate('Rooms')
          }}
        >
          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <MaterialIcons name="keyboard-arrow-left" size={32} color="#000" />
              <Text style={{fontSize: 18}}>Rooms</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>{route.params}</Text>
      </View>
      <GiftedChat messages={messages} user={user} onSend={handleSend} renderUsernameOnMessage={true} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    input: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      padding: 15,
      marginBottom: 20,
      borderColor: 'gray',
    },
})