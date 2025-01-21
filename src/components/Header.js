import { Button, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Header({title, showButton=false, buttonMethod, buttonText}){
    return (
        <View style={{
                width: "100%",
                height: "12%",
                paddingTop: "50",
                borderBottomWidth: 1,
                borderColor: "#CCCCCC",
                boxShadow: "10px black",
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                padding: "2%"
            }}
        >
            <Text style={{width: "50%", fontSize: 24}}>
                {title}
            </Text>
            {
                showButton 
                && 
                <Pressable style={{marginRight: "5%", marginTop: "1%", marginLeft: "auto"}} onPress={buttonMethod}>
                    <AntDesign name="pluscircle" size={30}/>
                </Pressable>
                
                // <View style={{
                //     width: "fit-content",
                //     marginRight: "0px",
                //     marginLeft: "auto",
                // }}>
                //     <Button 
                //         title={buttonText}
                //         style={{
                //             width: 10,
                //             marginRight: 0, 
                //             marginLeft: "auto"
                //         }}
                        
                //         onPress={buttonMethod}
                //     />
                // </View>
            }
            
        </View>
    )
}