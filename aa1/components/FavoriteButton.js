import React, {useState, useEffect} from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity} from "react-native";

export default function FavoriteButton({event, favorites, setFavorites}) {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, [favorites]);

    const checkFavoriteStatus = async () => {
        setIsFavorited(favorites.some(favEvent => favEvent.id === event.id));
    };

    const handleFavoritePress = () => {
        if (isFavorited) {
            setFavorites(favorites.filter(favEvent => favEvent.id !== event.id));
        } else {
            setFavorites([...favorites, event]);
        }
        setIsFavorited(!isFavorited);
    };

    return (<TouchableOpacity onPress={handleFavoritePress}>
        <FontAwesome name={isFavorited ? "star" : "star-o"} size={30} color="#1496de"/>
    </TouchableOpacity>);
}
