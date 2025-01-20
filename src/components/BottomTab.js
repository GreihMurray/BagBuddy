import { Button, FlatList, Image, TouchableHighlight, View } from "react-native";

export default function BottomTab({navigation}){
    const buttonData = [
        {
            icon: (
                <Image style={{width: 50, height: 50, marginLeft: "auto", marginRight: "auto"}} source={require("../../assets/disc.png")}/>
            ), 
            name: "Discs",
            route: "Discs"
        },
        {
            icon: (
                <Image style={{width: 50, height: 50, marginLeft: "auto", marginRight: "auto"}} source={require("../../assets/bag.png")}/>
            ), 
            name: "Bags",
            route: "Bags"
        },
        {
            icon: (
                <Image style={{width: 50, height: 50, marginLeft: "auto", marginRight: "auto"}} source={require("../../assets/flightchart.png")}/>
            ), 
            name: "Flight Charts",
            route: "FlightCharts"
        },
        {
            icon: (
                <Image style={{width: 50, height: 50, marginLeft: "auto", marginRight: "auto"}} source={require("../../assets/home.png")}/>
            ), 
            name: "Other",
            route: "Other"
        }
    ]

    const getView = ({item}) => {
        return (
            <TouchableHighlight onPress={() => navigation.navigate(item.route, {})} style={{width: "25%", marginLeft: "auto", marginRight: "auto"}}>
                <View style={{width: '100%', paddingLeft: "1em", marginRight: "auto"}}>
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