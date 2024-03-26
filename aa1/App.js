import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home.js'
import EventFullListScreen from './pages/EventFullListScreen.js'
import EventFavoriteListScreen from './pages/EventFavoriteListScreen.js'
import EventDetails from './pages/EventDetails.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        };
        loadFavorites();
    }, []);

    const handleSetFavorites = async (newFavorites) => {
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Events">
                {props => <EventFullListScreen {...props} favorites={favorites} setFavorites={handleSetFavorites}/>}
            </Stack.Screen>
            <Stack.Screen name="Favorites">
                {props => <EventFavoriteListScreen {...props} favorites={favorites} setFavorites={handleSetFavorites}/>}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {props => <EventDetails {...props} favorites={favorites} setFavorites={handleSetFavorites}/>}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>);
}
