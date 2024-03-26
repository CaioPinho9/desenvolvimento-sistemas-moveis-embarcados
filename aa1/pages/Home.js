import * as React from 'react';
import {View, Text, Image, StyleSheet, BackHandler, Pressable} from 'react-native';

export default function Home({navigation}) {
    return (<View>
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.webp')}/>
            <Text style={styles.title}>Welcome to The Event</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Events')}>
                <Text style={styles.buttonText}>Events</Text>
            </Pressable>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Favorites')}>
                <Text style={styles.buttonText}>Favorites</Text>
            </Pressable>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => BackHandler.exitApp()}>
                <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60
    },
    logo: {
        height: 160,
        width: 160,
    },
    title: {
        fontSize: 24,
        color: '#1496de'
    },
    buttonContainer: {
        padding: 15,
    },
    button: {
        backgroundColor: '#1496de',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
});
