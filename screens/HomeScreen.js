import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {
  const [marker, setMarker] = useState([]);
  useFocusEffect(
    useCallback(() => {
      async function getData() {
        const headerOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`
          },
        }
        const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
        const marker = await response.json();
        setMarker(marker);
      }
      getData();
    }, [])
  )

  return (

    <View style={styles.container}>

      <MapView style={styles.map}
        initialRegion={{
          latitude: -5.837443966870198,
          longitude: -35.210563963993195,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
      >



        {
          marker.map((marker, id) => <Marker
            key={id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />)
        }
      </MapView>

      <ActionButton
        buttonColor="green"
        onPress={() => navigation.navigate('AddMarker')}
      />

    </View>


  );
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
    height: '100%'
  },
});
