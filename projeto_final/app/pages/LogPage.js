import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {host} from "../config/network";

export default function LogPage({navigation}) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        const response = await fetch(host + '/log');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLogs(data);
    };

    useEffect(() => {
        setLoading(true);
        fetchLogs(); // Fetch logs immediately on component mount
        setLoading(false);
        const intervalId = setInterval(fetchLogs, 5000); // Fetch logs every 5 seconds

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {logs.map((log, index) => (
                <View key={index} style={styles.logItem}>
                    <Text>Input: {log.input}</Text>
                    <Text>Value: {log.value}</Text>
                    <Text>Date: {log.date}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    logItem: {
        marginBottom: 20,
    },
});
