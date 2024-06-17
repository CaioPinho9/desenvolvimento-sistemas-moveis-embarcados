import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, Alert, ScrollView, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {host} from "../config/network";

export default function ConfigurationPage({navigation}) {
    const [loading, setLoading] = useState(true);
    const [lightSensitivity, setLightSensitivity] = useState(0);
    const [red, setRed] = useState(false);
    const [green, setGreen] = useState(false);
    const [blue, setBlue] = useState(false);
    const [colors, setColors] = useState([]);

    const saveConfiguration = async () => {
        try {
            const response = await fetch(host + '/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lightSensitivity,
                    colors,
                }),
            });

            if (!response.ok) {
                const message = await response.text()
                throw new Error(message);
            }
            Alert.alert('Saved successfully');
        } catch (error) {
            console.error(error);
            Alert.alert('Failed to save.' + error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const response = await fetch(host + '/config');

                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }

                const config = await response.json();

                setLightSensitivity(config.light_sensitivity);

                try {
                    setColors(config.colors);
                } catch (error) {
                    console.error(error);
                    Alert.alert('Failed to parse colors.' + error.message);
                }

                setLoading(false);
            } catch (error) {
                console.error(error);
                Alert.alert('Failed to fetch configuration.' + error.message);
                throw error;
            }
        };
        fetchData();
    }, []);

    const addColor = () => {
        setColors([...colors, [red ? 1 : 0, green ? 1 : 0, blue ? 1 : 0]]);
    };

    const removeColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Light Sensitivity: {lightSensitivity}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={1023}
                step={1}
                value={lightSensitivity}
                onValueChange={setLightSensitivity}
            />
            <View style={styles.divider} />
            <Text>Colors</Text>
            <View style={styles.colorContainer}>
                <View style={styles.colorButton}>
                    <Text style={{color: 'red'}}>R</Text>
                    <TouchableOpacity style={styles.toggleButton} onPress={() => setRed(!red)}>
                        <Text>{red ? 1 : 0}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.colorButton}>
                    <Text style={{color: 'green'}}>G</Text>
                    <TouchableOpacity style={styles.toggleButton} onPress={() => setGreen(!green)}>
                        <Text>{green ? 1 : 0}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.colorButton}>
                    <Text style={{color: 'blue'}}>B</Text>
                    <TouchableOpacity style={styles.toggleButton} onPress={() => setBlue(!blue)}>
                        <Text>{blue ? 1 : 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width: 40, height: 40, margin: 10, backgroundColor: `rgb(${red ? 255 : 0}, ${green ? 255 : 0}, ${blue ? 255 : 0})`}}/>
            <Button title="Add Color" onPress={addColor}/>
            <ScrollView style={styles.colorListContainer}>
                {colors.map((color, index) => (
                    <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 40, height: 40, margin: 10, backgroundColor: `rgb(${color[0] ? 255 : 0}, ${color[1] ? 255 : 0}, ${color[2] ? 255 : 0})`}}/>
                        <Button title="Remove" onPress={() => removeColor(index)}/>
                    </View>
                ))}
            </ScrollView>
            <Button title="Save" onPress={saveConfiguration}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
    },
    toggleButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        margin: 5,
    },
    colorListContainer: {
        marginTop: 10,
        padding: 20,
    },
    colorButton: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
    },
});
