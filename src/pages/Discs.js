import { Button, Image, Pressable, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BottomTab from "../components/BottomTab";
import { getJsonData, setJsonData } from "../utils/StorageUtils";
import { useEffect, useState } from "react";
import { fromHsv } from "react-native-color-picker";
import Header from "../components/Header";

export default function Discs({navigation}){
    const [discs, setDiscs] = useState();

    useEffect(() => {
        async function getData(){
            setDiscs(await getJsonData("all-discs"))
        }

        getData()
    }, [])

    const addDisc = () => {
        navigation.navigate("AddDisc")
    }

    const populate = async () => {
        await setJsonData("all-discs", {
            discs: {
                "time": {
                    name: "tttt",
                    company: "",
                    speed: 1,
                    glide: 1,
                    turn: 1,
                    fade: 1,
                    color: ""
                },
                "t": {
                    name: "eeee",
                    company: "",
                    speed: 1,
                    glide: 1,
                    turn: 1,
                    fade: 1,
                    color: ""
                },
                "p": {
                    name: "ssss",
                    company: "",
                    speed: 1,
                    glide: 1,
                    turn: 1,
                    fade: 1,
                    color: ""
                },
                "l": {
                    name: "qqqq",
                    company: "",
                    speed: 1,
                    glide: 1,
                    turn: 1,
                    fade: 1,
                    color: ""
                },
            }
        })

        setDiscs(await getJsonData("all-discs"))

    }

    return(
        <View style={{height: "100%"}}>
            <Header title={"Discs"} showButton={true} buttonMethod={addDisc} buttonText={"Add Disc"}/>
            
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "40%", zIndex: 2}}>
            {discs && Object.entries(discs?.discs)?.map(([key, disc]) => {
                return(
                    <Pressable 
                        key={key}
                        style={({pressed}) => [{
                            backgroundColor: pressed ? "#333333" : disc.color != "" ? fromHsv(disc?.color) : "#BBBBBB",
                            width: "90%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: 5,
                            overflow: "hidden",
                            marginTop: 5,
                            height: "10%",
                            display: "flex",
                            flexDirection: "row",
                        }]}
                    >
                        <Image 
                            style={{
                                height: 100, 
                                aspectRatio: "1/1", 
                                borderColor: "#FF0000",
                                overflow: "hidden",
                                borderWidth: 10,
                                borderRadius: 50,
                                flex: 1, 
                                margin: "auto",
                                marginLeft: 5
                            }} 
                            source={require("../../assets/favicon.png")} 
                        />
                        <Text style={{flex: 6}}>
                            {disc?.name}
                        </Text>
                    </Pressable>
                )
            })}

            <Button title="Populate" onPress={populate}/>
            </ScrollView>

            <BottomTab navigation={navigation} />
        </View>
    )
}