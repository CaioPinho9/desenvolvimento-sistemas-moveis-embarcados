import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, VirtualizedList} from 'react-native';
import localData from '../data/event.json'; // Adjust the path as necessary

export default function EventList({navigation}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setData(localData);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading delay
    }, []);

    return (<ScrollView style={styles.container}>
        {loading ? (<View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>) : (<View>
            <VirtualizedList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('EventDetails', {event: item})}>
                    <View>
                        <Text style={styles.event}>{item.name}</Text>
                    </View>
                </TouchableOpacity>}
            />
            <Button title="Voltar" onPress={() => navigation.navigate('Home')}/>
        </View>)}
    </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }, event: {
        fontSize: 18, height: 44,
    }
});
