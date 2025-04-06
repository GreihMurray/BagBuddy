import { Pressable, ScrollView, View } from "react-native";
import BottomTab from "../components/BottomTab";
import { getJsonData, setJsonData } from "../utils/StorageUtils";
import { useEffect, useState } from "react";
import { fromHsv } from "../react-native-color-picker/dist/index";
import Header from "../components/Header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Text from "../components/Text";

export default function Bags({navigation}){
    const [bags, setBags] = useState(null);

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = async () => {
        let bags = await getJsonData("all-bags")
        
        setBags(bags)
    }

    const addBag = () => {
        navigation.navigate("AddBag")
    }

    const editBag = (bag, key) => {
        navigation.navigate("AddBag", {bag: bag, key: key})
    }

    const viewBagDetails = (bag, key) => {
        navigation.navigate("BagDetails", {bag: bag, key: key})
    }

    const deleteBag = async (key) => {
        delete bags.bags[key];

        await setJsonData("all-bags", bags)
        refreshData()
    }

    return(
        <View style={{height: "100%"}}>
            <Header title={"Bags"} showButton={true} buttonMethod={addBag} buttonIcon={
                <AntDesign name="pluscircle" size={30} color={"#FFFFFF"}/>
            }/>
            
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "30%", zIndex: 2}}>
                {bags == null ? <Text text={"What is this, my DMs? \n\nWhy is it empty? Add a Bag"} style={{margin: "auto", fontSize: 36, width: "80%", textAlign: "center"}}/>
                :
                Object.entries(bags?.bags)?.map(([key, bag]) => {
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
                            onPress={() => viewBagDetails(bag, key)}
                        >
                            <MaterialIcons 
                                name="backpack" 
                                size={40}
                                color={bag?.color != null ? fromHsv(bag?.color) : "#000000"}
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginLeft: "2%"
                                }}
                            />
                            <View style={{flexDirection: "column", flex: 5}}>
                                <Text 
                                    style={{
                                        marginTop: "auto", 
                                        marginBottom: "auto", 
                                        marginLeft: "2%", 
                                        fontSize: 16, 
                                        fontWeight: "bold"
                                    }}
                                    text={bag?.name}
                                />
                            </View>
                            <Pressable 
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "5%"
                                }}
                                onPress={() => editBag(bag, key)}
                            >
                                <Entypo name="edit" size={30} color={"#FFF"}/>
                            </Pressable>
                            <Pressable 
                                style={{
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "5%"
                                }}
                                onPress={() => deleteBag(key)}
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