import { Button, TextInput, View } from "react-native";
import Text from "../components/Text";
import BottomTab from "../components/BottomTab";
import Header from "../components/Header";
import TextboxWithLabel from "../components/TextBoxWithLabel";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, toHsv } from "react-native-color-picker";
import { getJsonData, setJsonData } from "../utils/StorageUtils";

export default function AddDisc({navigation, route}){
    const colorPickerRef = useRef(null)

    const [discName, setDiscName] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [speed, setSpeed] = useState("")
    const [glide, setGlide] = useState("")
    const [turn, setTurn] = useState("")
    const [fade, setFade] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState("")
    const [discKey, setDiscKey] = useState("")

    useEffect(() => {
        if(route?.params?.disc && discName == ""){
            let disc = route?.params?.disc
            setDiscName(disc?.name)
            setManufacturer(disc.manufacturer)
            setSpeed(disc.speed)
            setGlide(disc?.glide)
            setTurn(disc?.turn)
            setFade(disc?.fade)
            setColor(disc?.color)
            setNotes(disc?.notes)
            setDiscKey(route?.params?.key)
        } else{
            setColor(toHsv("#22AA22"))
        }
    }, [route])

    const addDisc = async () => {
        let disc = {
            name: discName,
            manufacturer: manufacturer,
            speed: speed,
            glide: glide,
            turn: turn,
            fade: fade,
            color: color,
            notes: notes
        }

        let allDiscs = await getJsonData("all-discs")
        let key = discKey != "" ? discKey : new Date().getTime();

        allDiscs = {
            discs: {
                ...allDiscs?.discs,
                [key]: {...disc},
            }
        }

        await setJsonData("all-discs", allDiscs)

        navigation.navigate("Discs")
    }

    return (
        <>
            <Header title={"Add Disc"}/>
            <View style={{padding: "5%", overflowY: "auto"}}>
                <TextboxWithLabel 
                    label={"Disc Name"}
                    setValue={setDiscName}
                    value={discName}
                />
                <TextboxWithLabel 
                    label={"Manufacturer"}
                    setValue={setManufacturer}
                    value={manufacturer}
                />
                <View style={{flexDirection: "row"}}>
                    <TextboxWithLabel 
                        label={"Speed"}
                        setValue={setSpeed}
                        value={speed}
                        inputMode={"numeric"}
                        labelStyle={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                        inputStyle={{width: "100%", textAlign: "center"}}
                        style={{
                            width:"22%"
                        }}
                    />
                    <Text  
                        style={{
                            fontSize: 48,
                            marginTop: "2%"
                        }}
                        text="|"
                    />
                    <TextboxWithLabel 
                        label={"Glide"}
                        inputMode={"numeric"}
                        setValue={setGlide}
                        value={glide}
                        inputStyle={{width: "100%", textAlign: "center"}}
                        labelStyle={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                        style={{
                            width:"22%"
                        }}
                    />
                    <Text  
                        style={{
                            fontSize: 48,
                            marginTop: "2%"
                        }}
                        text="|"
                    />
                    <TextboxWithLabel 
                        label={"Turn"}
                        inputMode={"numeric"}
                        setValue={setTurn}
                        value={turn}
                        inputStyle={{width: "100%", textAlign: "center"}}
                        labelStyle={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                        style={{
                            width:"23%"
                        }}
                    />
                    <Text  
                        style={{
                            fontSize: 48,
                            marginTop: "2%"
                        }}
                        text="|"
                    />
                    <TextboxWithLabel 
                        label={"Fade"}
                        inputMode={"numeric"}
                        setValue={setFade}
                        value={fade}
                        inputStyle={{width: "100%", textAlign: "center"}}
                        labelStyle={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                        style={{
                            width:"23%"
                        }}
                    />
                </View>
                <Text style={{marginRight: "auto", marginLeft: "auto", marginTop: 20}} text="Disc Color" />
                <ColorPicker
                    ref={colorPickerRef}
                    onColorChange={(color) => setColor(color)}
                    color={color}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        marginBottom: 10,
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}
                />
                <Text text={"Notes"}/>
                <TextInput
                    multiline
                    maxLength={300}
                    onChangeText={(value) => setNotes(value)}
                    numberOfLines={8}
                    value={notes}
                    style={{
                        height: "20%",
                        borderWidth: 2,
                        borderColor: "#D9D9D9",
                    }}
                />
                <Button title="Save Disc" onPress={addDisc}/>
            </View>
            <BottomTab navigation={navigation}/>
        </>
    )
}