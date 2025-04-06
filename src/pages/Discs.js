import { Image, Pressable, ScrollView, View } from "react-native";
import Text from "../components/Text";
import BottomTab from "../components/BottomTab";
import { getJsonData, setJsonData } from "../utils/StorageUtils";
import { useEffect, useState } from "react";
import { fromHsv } from "../react-native-color-picker/src/index"
import Header from "../components/Header";
import { AntDesign, Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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

    const viewDiscDetails = (disc, key) => {
        navigation.navigate("DiscDetails", {disc: disc, key: key})
    }

    const deleteDisc = async (key) => {
        delete discs.discs[key];

        await setJsonData("all-discs", discs)
        refreshData()
    }

    return(
        <View style={{height: "100%"}}>
            <Header title={"Discs"} showButton={true} buttonMethod={addDisc} buttonIcon={<AntDesign name="pluscircle" size={30} color={"#FFFFFF"}/>}/>
            
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "30%", zIndex: 2}}>
                {discs == null ? <Text text={"What is this, my DMs? \n\nWhy is it empty? Add a disc"} style={{margin: "auto", fontSize: 36, width: "80%", textAlign: "center"}}/>
                :
                Object.entries(discs?.discs)?.map(([key, disc]) => {
                    return(
                        <Pressable 
                            key={key}
                            style={({pressed}) => [{
                                backgroundColor: pressed ? "#333333" :  "#2f8224",
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
                            onPress={() => viewDiscDetails(disc, key)}
                        >
                            <FontAwesome6
                                name="compact-disc"
                                size={48}
                                color={fromHsv(disc?.color) || "#000"}
                                style={{
                                    marginLeft: "2%",
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "2%"
                                }} 
                            />
                            <View style={{flexDirection: "column", flex: 5}}>
                                <Text 
                                    style={{
                                        marginTop: "auto", 
                                        marginLeft: "2%", 
                                        fontSize: 16, 
                                        fontWeight: "bold"
                                    }}
                                    text={disc?.name}
                                />
                                <Text 
                                    style={{
                                        marginLeft: "2%", 
                                        marginTop: "0", 
                                        marginBottom: "auto"
                                    }}
                                    text={`${disc?.speed || "?"}/${disc?.glide || "?"}/${disc?.turn || "?"}/${disc?.fade || "?"}`}
                                />                                
                            </View>
                            <Pressable 
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "5%"
                                }}
                                onPress={() => editDisc(disc, key)}
                            >
                                <Entypo name="edit" size={30} color={"#FFF"}/>
                            </Pressable>
                            <Pressable 
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "5%"
                                }}
                                onPress={() => deleteDisc(key)}
                            >
                                <Feather name="trash-2" size={30} color={"#FFF"}/>
                            </Pressable>
                        </Pressable>
                    )
                })}

            </ScrollView>

            <BottomTab navigation={navigation} />
        </View>
    )
}