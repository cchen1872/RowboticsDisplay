import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Surface, Button, Divider, IconButton } from 'react-native-paper';
import { useOrientation } from '../hooks/phoneOrientation';
import Header from '../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNEventSource from "react-native-event-source";
import axios from 'axios'

export default function DisplayScreen({navigation}) {
  const orientation = useOrientation()
  const insets = useSafeAreaInsets();
  const [es, setES] = useState(null);
  const [rowingInfo, setrowingInfo] = useState(null);
  const [timediff, setTimediff] = useState(null);
  const handleQuit = () => {
    axios.patch(`${process.env.EXPO_PUBLIC_FLASK_URL}/close`)
      .then(data => console.log(data))
      .catch(err => console.error(err));
    // es.close();
    
    setES(null);
    navigation.navigate("Post-Workout")
  }
  
  const pingHandler = useCallback(
    (event) => {
        // In Event Source Listeners in connection with redux
        // you should read state directly from store object.
        console.log(`EVENT: ${JSON.stringify(event)}`);
        var b = event.data.replace(/'/g, '"');
        let data = JSON.parse(b)
        console.log("DATA");
        console.log(JSON.stringify(data));
        setrowingInfo(data);
    },
    [rowingInfo]
  );
  const openHandler = useCallback(
    (event) => {
        // In Event Source Listeners in connection with redux
        // you should read state directly from store object.
        console.log(`EVENT: ${JSON.stringify(event)}`);
    },
    []
  );

  useEffect(() => {
    const e = new RNEventSource(
      `${process.env.EXPO_PUBLIC_FLASK_URL}/listen`,
      {
        headers: {
          Connection: "keep-alive",
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          "Keep-Alive": "timeout=1000000000000, max=0"
        }
      }
    ); // REPLACE WITH DATA LATER ONCE QR CODED
    e.addEventListener("open", (event) => {
      // In Event Source Listeners in connection with redux
      // you should read state directly from store object.
      console.log(`EVENT THIS: ${JSON.stringify(event)}`);
  });
    e.addEventListener("message", pingHandler);
    e.addEventListener("close", openHandler);
    // e.open()
    console.log("EVENTSOURCE OPENED")
    // axios.patch(`${process.env.EXPO_PUBLIC_FLASK_URL}/open`)
    // .then(data => console.log(data))
    // .catch(err => console.error(err));
    console.log("EVENTSOURCE OPENED OVER API")
    console.log("DSJKLFSFL")
    console.log(e)

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
                    <Text style={styles.textSize}>{`TIME: ${rowingInfo !== null && rowingInfo.time_diff_min}:${rowingInfo !== null && rowingInfo.time_diff_sec}`}</Text>
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
                      <Text style={styles.textSize}>{`PACE: ${rowingInfo !== null && rowingInfo.pace} min/500 m`}</Text>
                  </View>
                  <View style={[styles.flex1, styles.data2]}>
                      <Text style={styles.textSize}>{`DIST: ${rowingInfo !== null && rowingInfo.distance} m`}</Text>
                  </View>
                  <View style={[styles.flex1, styles.data1]}>
                      <Text style={styles.textSize}>{`STROKE RATE: ${rowingInfo !== null && rowingInfo.stroke_rate}`}</Text>
                  </View>
                </View>
                <View style={styles.flex1}>
                  <View style={[styles.flex1, styles.data2]}>
                      <Text style={styles.textSize}>{`TWIST ANGLE: ${rowingInfo !== null && rowingInfo.twist_angle}`}</Text>
                  </View>
                </View>
                <View style={styles.flex1}>
                  <View style={[styles.flex1, styles.data1]}>
                      <Text style={styles.textSize}>{rowingInfo != null && (rowingInfo.in_water)}</Text>
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
