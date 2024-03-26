import {Text, Linking, StyleSheet, View, Pressable} from "react-native";

export default function LinkButton({title, link}) {
    try {
        new URL(link);
        return (<View style={styles.button}>
            <Pressable style={styles.pressable} onPress={() => Linking.openURL(link)}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>);
    } catch (_) {
        return null;
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
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
