import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity} from "react-native";

export default function FavoriteButton({event}) {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setIsFavorited(favorites.some(favEvent => favEvent.id === event.id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleFavoritePress = async () => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            if (isFavorited) {
                const newFavorites = favorites.filter(favEvent => favEvent.id !== event.id);
                await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            } else {
                favorites.push(event);
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            }
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error(error);
        }
    };

    return (<TouchableOpacity onPress={handleFavoritePress}>
        <FontAwesome name={isFavorited ? "star" : "star-o"} size={30} color="#1496de"/>
    </TouchableOpacity>);
}
