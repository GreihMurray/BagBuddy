import { Text as RNText } from "react-native";

export default function Text({text, style, adjustFontSize = false, minScale=1}){
    return (
        <RNText
            adjustsFontSizeToFit={adjustFontSize}
            minimumFontScale={minScale}
            style={{
                color: "#FFFFFF",
                ...style
            }}
        >
            {text}
        </RNText>
    )
}