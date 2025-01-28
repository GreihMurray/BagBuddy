import { useEffect, useRef, useState } from "react"
import { getJsonData, setJsonData } from "../utils/StorageUtils"
import Header from "../components/Header"
import { Button, ScrollView, TextInput, View } from "react-native"
import Text from "../components/Text"
import TextboxWithLabel from "../components/TextBoxWithLabel"
import { ColorPicker, toHsv } from "react-native-color-picker"
import BottomTab from "../components/BottomTab"
import MultiSelect from "react-native-multiple-select"

export default function AddBag({navigation, route}){
    const colorPickerRef = useRef(null)
    
    const [bagName, setBagName] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState("")
    const [bagKey, setBagKey] = useState("")

    const [selectedDiscs, setSelectedDiscs] = useState([])
    const [discArray, setDiscArray] = useState()
    const [discs, setDiscs] = useState()

    useEffect(() => {
        let bag = route?.params?.bag

        if(bag != null && bagName == ""){
            setBagName(bag?.name)
            setColor(bag?.color)
            setNotes(bag?.notes)
            setBagKey(bag?.key)
            setSelectedDiscs(bag?.discs)
        } else{
            setColor(toHsv("#22AA22"))
        }
    }, [route])

    useEffect(() => {
        getDiscs()
    }, [])

    const getDiscs = async () => {
        let temp = await getJsonData("all-discs")
        setDiscs(temp?.discs)
        let discArray = []

        for(const [key, value] of Object.entries(temp?.discs)){
            discArray.push({
                id: key,
                ...value
            })
        }

        setDiscArray(discArray)
    }

    const addBag = async () => {
        let bag = {
            name: bagName,
            color: color,
            notes: notes,
            discs: selectedDiscs
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
        <View style={{height: "100%"}}>
            <Header title={"Add Bag"}/>
            <ScrollView style={{padding: "5%", overflowY: "auto"}}>
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

                <MultiSelect
                    items={discArray}
                    uniqueKey="id"
                    ref={(comp) => this.multiSelect = comp}
                    selectedItems={selectedDiscs}
                    selectText="Add discs to bag"
                    displayKey="name"
                    onSelectedItemsChange={(e) => setSelectedDiscs(e)}
                />

                <Text text="Notes"/>
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
                        color: "#FFFFFF",
                        verticalAlign: "top"
                    }}
                />
                <Button title="Save Bag" onPress={addBag}/>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </View>
    )
}