import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Other from "./src/pages/Other.js"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';
import Discs from './src/pages/Discs.js';
import Bags from './src/pages/Bags.js';
import FlightCharts from './src/pages/FlightCharts.js';
import AddDisc from './src/pages/AddDisc.js';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'none', headerBackVisible: false,headerShown: false }}>
        <Stack.Screen 
          name="Discs" 
          component={Discs} 
          options={{
            title: "Discs",
          }}
        />
        <Stack.Screen name="Bags" component={Bags} options={{title: "Bags"}}/>
        <Stack.Screen name="FlightCharts" component={FlightCharts} options={{title: "Flight Charts"}}/>
        <Stack.Screen name="Other" component={Other} options={{title: "Other"}}/>
        <Stack.Screen name="AddDisc" component={AddDisc} options={{title: "Add Disc"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
