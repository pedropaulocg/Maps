import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'


export default function AddMarker({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


  async function addMarkers() {

    const headerOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`
      },
      body: JSON.stringify({ title: title, description: description, latitude: latitude, longitude: longitude })
    }
    const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions)
    if (response.status === 200) {
      navigation.navigate('HomeScreen')
    } else {
      Alert.alert('Erro')
    }
  }

  return (
    <View style={styles.container}>

      <MapView style={styles.map}
        onPress={(event) => {
          setLatitude(event.nativeEvent.coordinate.latitude)
          setLongitude(event.nativeEvent.coordinate.longitude)
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
          description={description}
        />

      </MapView>

      <KeyboardAvoidingView
        style={styles.addContainer}
        behavior='position'
        enabled
        keyboardVerticalOffset={50}

      >
        <View style={styles.box}>
          <TextInput style={styles.input} placeholder='Título' value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder='Descrição' value={description} onChangeText={setDescription} />
          <TouchableOpacity style={styles.btn} onPress={() => addMarkers()}>
            <Text style={styles.btnTxt}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '70%'
  },
  addContainer: {
    width: '100%',
    height: '30%',
    paddingBottom: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    backgroundColor: 'white',
    fontSize: 16,
    paddingLeft: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  box: {
    backgroundColor: '#f7f7f7',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '75%',
    backgroundColor: 'green',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
  }
});
