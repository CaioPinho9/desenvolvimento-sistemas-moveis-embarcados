import {Image, View} from "react-native";

export default function DisplayImage({imageUrl, style = {height: 200, width: 200}}) {
    try {
        new URL(imageUrl);
        return (<View>
            <Image source={{uri: imageUrl}} style={style}/>
        </View>);
    } catch (_) {
        return null;
    }
}
