/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, Text, PermissionsAndroid} from 'react-native';
import WebView from 'react-native-webview';
import RNPermissions, {PERMISSIONS} from 'react-native-permissions';

const App: () => Node = () => {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await RNPermissions.requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      console.log('Status: ', statuses);
      setGranted(true);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Website not loaded</Text>
      {granted && (
        <WebView
          // originWhitelist={['*']}
          source={{uri: 'https://opentokdemo.tokbox.com/'}} // <--- Change url here
          javaScriptEnabled={true}
          onNavigationStateChange={navigationState => {}}
          allowsInlineMediaPlayback={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
