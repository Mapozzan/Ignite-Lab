import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';


import {THEME} from './src/styles/theme'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


import {Routes} from './src/routes/';
import {Loading} from './src/Components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Routes /> : <Loading />}           
    </NativeBaseProvider>

  );
}

