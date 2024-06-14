import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {host} from "../config/network";

export default function LogPage({navigation}) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const response = await fetch(host + '/log');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLogs(data);
        };

        fetchLogs();
    }, []);

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
