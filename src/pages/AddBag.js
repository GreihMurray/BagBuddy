import { useEffect, useRef, useState } from "react"
import { getJsonData, setJsonData } from "../utils/StorageUtils"
import Header from "../components/Header"
import { Button, TextInput, View } from "react-native"
import Text from "../components/Text"
import TextboxWithLabel from "../components/TextBoxWithLabel"
import { ColorPicker, toHsv } from "react-native-color-picker"
import BottomTab from "../components/BottomTab"

export default function AddBag({navigation, route}){
    const colorPickerRef = useRef(null)
    
    const [bagName, setBagName] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState("")
    const [bagKey, setBagKey] = useState("")

    useEffect(() => {
        let bag = route?.params?.bag

        if(bag != null && bagName == ""){
            setBagName(bag?.name)
            setColor(bag?.color)
            setNotes(bag?.notes)
            setBagKey(bag?.key)
        } else{
            setColor(toHsv("#22AA22"))
        }
    }, [route])

    const addBag = async () => {
        let bag = {
            name: bagName,
            color: color,
            notes: notes
        }

        let allBags = getJsonData("all-bags")
        let key = bagKey != "" ? bagKey : new Date().getTime()
        
        allBags = {
            bags: {
                ...allBags?.bags,
                [key]: {
                    ...bag
                }
            }
        }

        await setJsonData("all-bags", allBags)

        navigation.navigate("Bags")
    }

    return (
        <>
            <Header title={"Add Bag"}/>
            <View style={{padding: "5%", overflowY: "auto"}}>
                <TextboxWithLabel 
                    label={"Bag Name"}
                    setValue={setBagName}
                    value={bagName}
                />
                
                <Text style={{marginRight: "auto", marginLeft: "auto", marginTop: 20}}>Bag Color</Text>
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
                <Text text="Notes"/>
                <TextInput
                    multiline
                    maxLength={300}
                    onChangeText={(e) => setNotes(e.target.value)}
                    numberOfLines={8}
                    value={notes}
                    style={{
                        height: "20%",
                        borderWidth: 2,
                        borderColor: "#D9D9D9",
                    }}
                />
                <Button title="Add Bag" onPress={addBag}/>
            </View>
            <BottomTab navigation={navigation}/>
        </>
    )
}