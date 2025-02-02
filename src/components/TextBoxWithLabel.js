import { TextInput, View } from "react-native"
import Text from "./Text"

export default function TextboxWithLabel({setValue, label, value, labelStyle, inputStyle, style, inputMode}){
    return (
        <View style={{flexDirection: "column", height: "12%", ...style}}>
            <Text style={{ ...labelStyle}} text={label} />
            <TextInput
                inputMode={inputMode || "text"}
                mode="outlined"
                label={label}
                onChangeText={(value) => setValue(value)}
                value={value}
                style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#D9D9D9",
                    height: "50%",
                    color: "#FFFFFF",
                    ...inputStyle
                }}
            />
        </View>
    )
}