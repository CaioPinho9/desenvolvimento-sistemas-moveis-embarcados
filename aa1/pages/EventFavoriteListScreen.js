import React, {useState, useEffect} from 'react';
import EventList from "../components/EventList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EventFavoriteListScreen({navigation, favorites, setFavorites}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setData(JSON.parse(await AsyncStorage.getItem('favorites')) || []);
            setTimeout(() => {
                setLoading(false);
            }, 1000); // Simulate loading delay
        };
        fetchData();
    }, []);

    return <EventList navigation={navigation} data={data} loading={loading} favorites={favorites} setFavorites={setFavorites}/>;
}
