import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './pages/SplashScreen.js'
import EventList from './pages/EventList.js'
import EventDetails from './pages/EventDetails.js'

const Stack = createNativeStackNavigator();

export default function App() {
    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen name="EventList" component={EventList}/>
            <Stack.Screen name="EventDetails" component={EventDetails}/>
        </Stack.Navigator>
    </NavigationContainer>);
}
