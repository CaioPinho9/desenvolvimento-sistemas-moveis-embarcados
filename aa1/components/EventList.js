import {Text, View, StyleSheet, Button, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import FavoriteButton from "./FavoriteButton";
import DisplayImage from "./DisplayImage";

function parseDateTime(dateStr, timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    // Convert hours to 24-hour format if necessary
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    // Reconstruct the date string with the 24-hour time format
    const dateTimeStr = `${dateStr} ${hours}:${minutes}:00`;

    // Create a Date object from the reconstructed string
    const dateTime = new Date(dateTimeStr);

    if (isNaN(dateTime.getTime())) {
        console.error(`Invalid date/time format for: ${dateTimeStr}`);
        return new Date(0); // Return epoch start as a fallback
    }

    return dateTime;
}

function sortEvents(events) {
    return events.sort((a, b) => {
        const dateTimeA = parseDateTime(a.date, a.start_time);
        const dateTimeB = parseDateTime(b.date, b.start_time);

        return dateTimeA - dateTimeB;
    });
}

export default function EventList({navigation, data, loading, favorites, setFavorites}) {
    return (<View style={styles.container}>
        {loading ? (<View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1496de"/>
        </View>) : data.length > 0 ? (<FlatList
            data={sortEvents(data)}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (<TouchableOpacity style={styles.eventContainer} onPress={() => navigation.navigate('Details', {event: item})}>
                <View style={styles.row}>
                    <Text style={styles.event}>{item.name}</Text>
                    <FavoriteButton event={item} favorites={favorites} setFavorites={setFavorites}/>
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
        padding: 15,
        height: '100%'
    }, event: {
        fontSize: 18, height: 44, display: 'flex', alignItems: 'center', color: '#1496de'
    }, row: {
        flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10,
    }, loadingContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
    }, eventContainer: {
        borderWidth: 1, borderColor: '#1496de', padding: 10, margin: 10,
    }, warning: {
        fontSize: 18, color: 'red', textAlign: 'center', padding: 10
    }
});
