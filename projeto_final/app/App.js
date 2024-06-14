import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home.js'
import ConfigurationPage from './pages/ConfigurationPage.js'
import LogPage from "./pages/LogPage";

const Stack = createNativeStackNavigator();


export default function App() {
    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="ConfigurationPage">
                {props => <ConfigurationPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="LogPage">
                {props => <LogPage {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>);
}
