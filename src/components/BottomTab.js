import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Button, FlatList, Image, TouchableHighlight, View } from "react-native";

export default function BottomTab({navigation}){
    const buttonData = [
        {
            icon: (
                <FontAwesome6 name="compact-disc" size={40} style={{marginLeft: "auto", marginRight: "auto"}} color="#FFFFFF"/>
            ), 
            name: "Discs",
            route: "Discs"
        },
        {
            icon: (
                <MaterialIcons name="backpack" size={48} style={{marginLeft: "auto", marginRight: "auto"}} color="#FFFFFF"/>
            ), 
            name: "Bags",
            route: "Bags"
        },
        {
            icon: (
                <MaterialIcons name="grid-on" size={48} style={{marginLeft: "auto", marginRight: "auto"}} color="#FFFFFF"/>
            ), 
            name: "Flight Charts",
            route: "FlightCharts"
        },
        {
            icon: (
                <FontAwesome name="gear" size={48} style={{marginLeft: "auto", marginRight: "auto"}} color="#FFFFFF"/>
            ), 
            name: "Other",
            route: "Other"
        }
    ]

    const getView = ({item}) => {
        return (
            <TouchableHighlight onPress={() => navigation.navigate(item.route, {})} style={{width: "25%", marginLeft: "auto", marginRight: "auto"}}>
                <View style={{width: '100%', paddingLeft: "1em", marginRight: "auto", paddingTop: "10%"}}>
                    {item.icon}
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <FlatList 
            renderItem={getView} 
            numColumns={4} 
            data={buttonData} 
            style={{
                width: "100%", 
                marginLeft: "auto", 
                marginRight: "auto",
                position: "absolute",
                backgroundColor: "#000000",
                bottom: "0",
                zIndex: 5000
            }}>
            
        </FlatList>
    )
}