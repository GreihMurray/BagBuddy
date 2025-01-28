import { StyleSheet } from 'react-native';
import Other from "./src/pages/Other.js"
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discs from './src/pages/Discs.js';
import Bags from './src/pages/Bags.js';
import FlightCharts from './src/pages/FlightCharts.js';
import AddDisc from './src/pages/AddDisc.js';
import AddBag from './src/pages/AddBag.js';
import BagDetails from './src/pages/BagDetails.js';
import DiscDetails from './src/pages/DiscDetails.js';

const Stack = createNativeStackNavigator()

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#041F00",
  }
}

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
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
        <Stack.Screen name="AddBag" component={AddBag} options={{title: "Add Bag"}}/>
        <Stack.Screen name="DiscDetails" component={DiscDetails} options={{title: "Disc Details"}}/>
        <Stack.Screen name="BagDetails" component={BagDetails} options={{title: "Bag Details"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041F00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
