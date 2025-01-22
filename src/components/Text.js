import { Text as RNText } from "react-native";

export default function Text({text, style}){
    return (
        <RNText
            style={{
                color: "#FFFFFF",
                ...style
            }}
        >
            {text}
        </RNText>
    )
}