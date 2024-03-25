import * as React from 'react';
import { Text, View, StyleSheet, Button, Linking, Image, ScrollView } from 'react-native';

export default function EventDetails({ route, navigation }) {
  const { event } = route.params;

  // Assuming event.map is a URL to the location on a map service like Google Maps
  const mapUrl = event.map;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDetails}>Address: {event.address}</Text>
      <Text style={styles.eventDetails}>Start Time: {event.start_time}</Text>

      {event.images && event.images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.eventImage} />
      ))}

      <View style={styles.button}>
        <Button onPress={() => Linking.openURL(mapUrl)}
          title="Location" />
      </View>

      {event.video_playlist && (
        <View style={styles.button}>
          <Button onPress={() => Linking.openURL(event.video_playlist)}
            title="Video/Playlist" />
        </View>
      )}

      {event.social_media && (
        <View style={styles.button}>
          <Button onPress={() => Linking.openURL(event.social_media)}
            title="Social Media" />
        </View>
      )}

      <Text style={styles.eventDetails}>Ticket Price: {event.ticket_price}</Text>

      {event.ticket_purchase_link && (
        <View style={styles.button}>
          <Button onPress={() => Linking.openURL(event.ticket_purchase_link)}
            title="Buy Tickets" />
        </View>
      )}

      {event.reservation_contact && (
        <View style={styles.button}>
          <Button onPress={() => Linking.openURL(`tel:${event.reservation_contact}`)}
            title="Reservations" />
        </View>
      )}

      <View style={styles.button}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  }
});
