import * as React from 'react';
import {View, Text, Image, Button, StyleSheet, BackHandler} from 'react-native';

export default function SplashScreen({navigation}) {
    return (<View>
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.webp')}/>
            <Text style={styles.title}>Welcome to the Event</Text>
        </View>
        <View style={styles.button}>
            <Button title="Events" onPress={() => navigation.navigate('EventList')}/>
        </View>
        <View style={styles.button}>
            <Button title="Sair" onPress={() => BackHandler.exitApp()}/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', justifyContent: 'center', padding: 60
    }, logo: {
        height: 160, width: 160,
    }, title: {
        padding: 30, fontSize: 18,
    }, button: {
        padding: 15
    }
});
