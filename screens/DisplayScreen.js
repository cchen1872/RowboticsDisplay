import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Surface, Button, Divider, IconButton } from 'react-native-paper';
import { useOrientation } from '../hooks/phoneOrientation';
import Header from '../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventSource from 'react-native-sse'
import axios from 'axios'

export default function DisplayScreen({navigation}) {
  const orientation = useOrientation()
  const handleQuit = () => navigation.navigate("Post-Workout")
  const insets = useSafeAreaInsets();
  const [es, setES] = useState(null);

  const pingHandler = useCallback(
    (event) => {
        // In Event Source Listeners in connection with redux
        // you should read state directly from store object.
        console.log(`EVENT: ${event}`);
    },
    []
);

  useEffect(() => {
    const e = new EventSource(`${process.env.EXPO_PUBLIC_FLASK_URL}/listen`) // REPLACE WITH DATA LATER ONCE QR CODED
    e.addEventListener("open", pingHandler);
    e.addEventListener("message", pingHandler);
    e.addEventListener("close", pingHandler);
    e.open()

    setES(e)
  }, [])
  if (orientation == "PORTRAIT") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please Turn Phone To Landscape Mode</Text>
        <IconButton icon="rowing" size={70} color='blue'/>
      </View>
    );
  }

  return (
    <>
        <View style={{ paddingTop: insets.top }}/>
        <View style={styles.container}>
            <View style={[styles.row, styles.flex2, styles.border]}>
                <View style={[styles.flex1]} />
                <View style={[styles.flex2, styles.data1]}>
                    <Text style={styles.textSize}>TIME</Text>
                </View>
                <View style={[styles.flex1]} />
            </View>
            {/* <View style={[styles.row, styles.flex5, styles.border]}>
            </View> */}
            
            {/* <View style={[styles.row, styles.flex1, styles.border]}>
                <View style={[styles.flex2, styles.data1, styles.borderRight]}>
                    <Text style={styles.textSize}>DISTANCE</Text>
                </View>
                <View style={styles.flex1} />
            </View> */}
            <View style={[styles.row, styles.flex3, styles.border]}>
                <View style={[styles.flex2, styles.data1, styles.borderRight]}>
                  <View style={[styles.flex1, styles.data1]}>
                      <Text style={styles.textSize}>PACE</Text>
                  </View>
                  <View style={[styles.flex1, styles.data2]}>
                      <Text style={styles.textSize}>DISTANCE</Text>
                  </View>
                  <View style={[styles.flex1, styles.data1]}>
                      <Text style={styles.textSize}>STROKE RATE</Text>
                  </View>
                </View>
                <View style={styles.flex1}>
                  <View style={[styles.flex1, styles.data2]}>
                      <Text style={styles.textSize}>TWIST ICON</Text>
                  </View>
                </View>
                <View style={styles.flex1}>
                  <View style={[styles.flex1, styles.data1]}>
                      <Text style={styles.textSize}>TILT ICON</Text>
                  </View>
                </View>
            </View>
            <Button onPress={handleQuit}>
                End Workout
            </Button>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  border: {
    borderWidth: 1.5,
    borderColor: 'outline'
  },
  borderRight: {
    borderRightWidth: 1.5,
    borderColor: 'outline'
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  data1: {
    backgroundColor: 'orange'
  }, data2: {
    backgroundColor: 'red'
  },
  textSize: {
    fontSize: 40
  }
});