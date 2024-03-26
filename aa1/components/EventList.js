import {Text, View, StyleSheet, Button, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import FavoriteButton from "./FavoriteButton";
import DisplayImage from "./DisplayImage";

export default function EventList({navigation, data, loading}) {
    let sortedData;
    try {
        sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.start_time);
            const dateB = new Date(b.date + ' ' + b.start_time);
            return dateA - dateB;
        });
    } catch (_) {
        sortedData = []
    }

    return (<View style={styles.container}>
        {loading ? (<View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1496de"/>
        </View>) : sortedData.length > 0 ? (<FlatList
            data={sortedData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (<TouchableOpacity style={styles.eventContainer} onPress={() => navigation.navigate('Details', {event: item})}>
                <View style={styles.row}>
                    <Text style={styles.event}>{item.name}</Text>
                    <FavoriteButton event={item}/>
                </View>
                <DisplayImage imageUrl={item.images ? item.images[0] : null} style={styles.eventImage}/>
                <Text style={styles.event}>{item.address}</Text>
                <Text style={styles.event}>Date: {item.date} {item.start_time}</Text>
            </TouchableOpacity>)}
        />) : (<Text style={styles.warning}>No events found</Text>)}
        <Button title="Voltar" onPress={() => navigation.navigate('Home')}/>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }, event: {
        fontSize: 18, height: 44, display: 'flex', alignItems: 'center', color: '#1496de'
    }, row: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10,
    }, loadingContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
    }, eventContainer: {
        borderWidth: 1, borderColor: '#1496de', padding: 10, margin: 10,
    }, warning: {
        fontSize: 18, color: 'red', textAlign: 'center', padding: 10
    }
});
