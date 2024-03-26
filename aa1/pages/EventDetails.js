import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Pressable} from 'react-native';
import FavoriteButton from "../components/FavoriteButton";
import LinkButton from "../components/LinkButton";
import DisplayImage from "../components/DisplayImage";

export default function EventDetails({route, navigation}) {
    const {event} = route.params;

    return (<ScrollView contentContainerStyle={styles.container}>
        <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{event.name}</Text>
            <FavoriteButton event={event}/>
        </View>

        {event.images.map((image, index) => (<DisplayImage key={index} imageUrl={image} style={styles.eventImage}/>))}

        <Text style={styles.eventDetails}>Address: {event.address}</Text>
        <Text style={styles.eventDetails}>Date: {event.date} {event.start_time}</Text>
        <Text style={styles.eventDetails}>Ticket Price: {event.ticket_price}</Text>

        <LinkButton title="Location" link={event.map}/>
        <LinkButton title="Video/Playlist" link={event.video_playlist}/>
        <LinkButton title="Social Media" link={event.social_media}/>
        <LinkButton title="Buy Tickets" link={event.ticket_purchase_link}/>
        <LinkButton title="Reservations" link={`tel:${event.reservation_contact}`}/>

        <View style={styles.button}>
            <Pressable style={styles.pressable} onPress={() => navigation.goBack()}>
                <Text style={styles.text}>Back</Text>
            </Pressable>
        </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    eventName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1496de',
    },
    eventDetails: {
        fontSize: 18,
        marginBottom: 5,
    },
    eventImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    pressable: {
        backgroundColor: '#1496de',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
    }
});
