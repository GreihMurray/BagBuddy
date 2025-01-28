import { useEffect, useState } from "react";
import { getDiscsInBag } from "../utils/StorageUtils";
import Header from "../components/Header";
import { Image, ScrollView, View } from "react-native";
import Text from "../components/Text";
import { fromHsv } from "react-native-color-picker";
import BottomTab from "../components/BottomTab";
import { Entypo } from "@expo/vector-icons";

export default function BagDetails({navigation, route}){
    const [discs, setDiscs] = useState()

    useEffect(() => {
        getDiscs()
    }, [])

    const getDiscs = async () => {
        let discs = await getDiscsInBag(route?.params?.key)

        setDiscs(discs)
    }

    const editBag = () => {
        let bag = route?.params?.bag
        let key = route?.params?.key
        navigation.navigate("AddBag", {bag: bag, key: key})
    }

    return (
        <View style={{height: "100%"}}>
            <Header title={route?.params?.bag?.name} showButton={true}
                buttonMethod={editBag} 
                buttonIcon={<Entypo name="edit" size={30} color={"#FFF"}/>}/>

            <View style={{flexDirection: "column", margin: "5%", height: "18%"}}>
                <Text text={"Bag Notes"} style={{fontSize: 20, fontWeight: "bold"}}/>
                <ScrollView contentContainerStyle={{width: "100%", borderWidth: 2, borderColor: "#FFFFFF", padding: "2%"}}>
                    <Text text={route?.params?.bag?.notes}/>
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "30%", zIndex: 2}}>
            {discs && discs?.map((disc) => {
                    return(
                        <View 
                            key={disc.name}
                            style={{
                                backgroundColor: "#2f8224",
                                width: "90%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                borderRadius: 5,
                                overflow: "hidden",
                                marginTop: 5,
                                height: "15%",
                                display: "flex",
                                flexDirection: "row",
                            }}
                            onPress={() => editDisc(disc, key)}
                        >
                            <Image 
                                style={{
                                    aspectRatio: "1/1", 
                                    borderColor: disc?.color ? fromHsv(disc?.color) : "#FF0000",
                                    overflow: "hidden",
                                    borderWidth: 5,
                                    borderRadius: 50,
                                    flex: 0.7, 
                                    margin: "auto",
                                    marginLeft: 5
                                }} 
                                source={require("../../assets/favicon.png")} 
                            />
                            <View style={{flexDirection: "row", flex: 5}}>
                                <Text 
                                    style={{
                                        marginTop: "auto",
                                        marginBottom: "auto", 
                                        marginLeft: "5%", 
                                        fontSize: 16, 
                                        fontWeight: "bold"
                                    }}
                                    text={disc?.name}
                                />
                                <Text 
                                    style={{
                                        marginRight: "10%",
                                        marginLeft: "auto", 
                                        marginTop: "auto", 
                                        marginBottom: "auto",
                                        fontSize: 16
                                    }}
                                    text={`${disc?.speed || "?"}/${disc?.glide || "?"}/${disc?.turn || "?"}/${disc?.fade || "?"}`}
                                />                                
                            </View>
                            
                        </View>
                    )
                })}
            </ScrollView>

            <BottomTab navigation={navigation} />
        </View>
    )
}