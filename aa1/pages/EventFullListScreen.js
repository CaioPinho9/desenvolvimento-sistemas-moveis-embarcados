import React, {useState, useEffect} from 'react';
import EventList from "../components/EventList";
import localData from '../data/event.json';

export default function EventFullListScreen({navigation}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setData(localData);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading delay
    }, []);

    return <EventList navigation={navigation} data={data} loading={loading}/>;
}
