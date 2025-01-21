import { Button, Image, Pressable, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BottomTab from "../components/BottomTab";
import { getJsonData, setJsonData } from "../utils/StorageUtils";
import { useEffect, useState } from "react";
import { fromHsv } from "react-native-color-picker";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

export default function Discs({navigation}){
    const [discs, setDiscs] = useState();

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = async () => {
        let discs = await getJsonData("all-discs")

        let sorted = Object.entries(discs?.discs).sort(
            (a, b) => (a[0].name < b[0].name) ? -1 : 1
        ).map((v) => {
            return {
                [v[0]]: v[1]
            }
        }).reduce((a, v) => ({...a, ...v}))

        discs = {
            discs : {
                ...sorted
            }
        }

        setDiscs(discs)
    }

    const addDisc = () => {
        navigation.navigate("AddDisc")
    }

    const editDisc = (disc, key) => {
        navigation.navigate("AddDisc", {disc: disc, key: key})
    }

    const deleteDisc = async (key) => {
        delete discs.discs[key];

        await setJsonData("all-discs", discs)
        refreshData()
    }

    return(
        <View style={{height: "100%"}}>
            <Header title={"Discs"} showButton={true} buttonMethod={addDisc} buttonText={"Add Disc"}/>
            
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "30%", zIndex: 2}}>
                {discs && Object.entries(discs?.discs)?.map(([key, disc]) => {
                    return(
                        <Pressable 
                            key={key}
                            style={({pressed}) => [{
                                backgroundColor: pressed ? "#333333" :  "#BBBBBB",
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
                            onPress={() => editDisc(disc, key)}
                        >
                            <Image 
                                style={{
                                    height: 100, 
                                    aspectRatio: "1/1", 
                                    borderColor: disc?.color ? fromHsv(disc?.color) : "#FF0000",
                                    overflow: "hidden",
                                    borderWidth: 10,
                                    borderRadius: 50,
                                    flex: 0.7, 
                                    margin: "auto",
                                    marginLeft: 5
                                }} 
                                source={require("../../assets/favicon.png")} 
                            />
                            <View style={{flexDirection: "column", flex: 5}}>
                                <Text style={{marginTop: "auto", marginLeft: "2%", fontSize: 16, fontWeight: "bold"}}>
                                    {disc?.name}
                                </Text>
                                <Text style={{marginLeft: "2%", marginTop: "0", marginBottom: "auto"}}>
                                    {`${disc?.speed || "?"}/${disc?.glide || "?"}/${disc?.turn || "?"}/${disc?.fade || "?"}`}
                                </Text>
                            </View>
                            <Pressable 
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "5%"
                                }}
                                onPress={() => deleteDisc(key)}
                            >
                                <Feather name="trash-2" size={40}/>
                            </Pressable>
                        </Pressable>
                    )
                })}

            </ScrollView>

            <BottomTab navigation={navigation} />
        </View>
    )
}