import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home.js'
import EventFullListScreen from './pages/EventFullListScreen.js'
import EventFavoriteListScreen from './pages/EventFavoriteListScreen.js'
import EventDetails from './pages/EventDetails.js'

const Stack = createNativeStackNavigator();

export default function App() {
    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Events" component={EventFullListScreen}/>
            <Stack.Screen name="Favorites" component={EventFavoriteListScreen}/>
            <Stack.Screen name="Details" component={EventDetails}/>
        </Stack.Navigator>
    </NavigationContainer>);
}
