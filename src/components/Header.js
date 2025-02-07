import { Button, Pressable, View } from "react-native";
import Text from "./Text";
import { AntDesign } from "@expo/vector-icons";

export default function Header({title, showButton=false, buttonMethod, buttonIcon}){
    return (
        <View style={{
                width: "100%",
                height: "8%",
                paddingTop: "15",
                borderBottomWidth: 1,
                borderColor: "#CCCCCC",
                boxShadow: "10px black",
                backgroundColor: "#0a4a01",
                flexDirection: "row",
                padding: "2%"
            }}
        >
            <Text style={{width: "50%", fontSize: 24}} text={title} />
            {
                showButton 
                && 
                <Pressable style={{marginRight: "5%", marginTop: "1%", marginLeft: "auto"}} onPress={buttonMethod}>
                    {buttonIcon}
                </Pressable>
            }
            
        </View>
    )
}