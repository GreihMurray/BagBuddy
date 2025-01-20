import { Button, Text, TextInput, View } from "react-native";
import BottomTab from "../components/BottomTab";
import Header from "../components/Header";
import TextboxWithLabel from "../components/TextBoxWithLabel";
import { useRef, useState } from "react";
import { ColorPicker } from "react-native-color-picker";
import { getJsonData, setJsonData } from "../utils/StorageUtils";

export default function AddDisc({navigation}){
    const colorPickerRef = useRef(null)

    const [discName, setDiscName] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [speed, setSpeed] = useState("")
    const [glide, setGlide] = useState("")
    const [turn, setTurn] = useState("")
    const [fade, setFade] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState("")

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

        let discs = await getJsonData("all-discs")
        let timeStamp = new Date().getTime();

        discs = {
            discs: {
                [timeStamp]: {...disc},
                ...discs?.discs
            }
        }

        console.log(discs)
        console.log(disc)

        await setJsonData("all-discs", discs)

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
                    value={discName}
                />
                <View style={{flexDirection: "row"}}>
                    <TextboxWithLabel 
                        label={"Speed"}
                        setValue={setSpeed}
                        value={discName}
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
                    >
                        |
                    </Text>
                    <TextboxWithLabel 
                        label={"Glide"}
                        inputMode={"numeric"}
                        setValue={setGlide}
                        value={discName}
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
                    >
                        |
                    </Text>
                    <TextboxWithLabel 
                        label={"Turn"}
                        inputMode={"numeric"}
                        setValue={setTurn}
                        value={discName}
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
                    >
                        |
                    </Text>
                    <TextboxWithLabel 
                        label={"Fade"}
                        inputMode={"numeric"}
                        setValue={setFade}
                        value={discName}
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
                <Text style={{marginRight: "auto", marginLeft: "auto", marginTop: 20}}>Disc Color</Text>
                <ColorPicker
                    ref={colorPickerRef}
                    onColorChange={(color) => setColor(color)}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        marginBottom: 10,
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}
                />
                <Text>Notes</Text>
                <TextInput
                    multiline
                    maxLength={300}
                    onChangeText={(e) => setNotes(e.target.value)}
                    numberOfLines={8}
                    style={{
                        height: "20%",
                        borderWidth: 2,
                        borderColor: "#D9D9D9",
                    }}
                />
                <Button title="Add Disc" onPress={addDisc}/>
            </View>
            <BottomTab navigation={navigation}/>
        </>
    )
}