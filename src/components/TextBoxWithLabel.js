import { Text, TextInput, View } from "react-native"

export default function TextboxWithLabel({setValue, label, value, labelStyle, inputStyle, style, inputMode}){
    return (
        <View style={{flexDirection: "column", ...style}}>
            <Text style={{...labelStyle}}>{label}</Text>
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
                    ...inputStyle
                }}
            />
        </View>
    )
}