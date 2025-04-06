import { useEffect, useRef, useState } from "react"
import { getJsonData, setJsonData } from "../utils/StorageUtils"
import Header from "../components/Header"
import { Button, Keyboard, ScrollView, TextInput, View } from "react-native"
import Text from "../components/Text"
import TextboxWithLabel from "../components/TextBoxWithLabel"
import { ColorPicker, toHsv } from "../react-native-color-picker/src/index"
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
    const [isEdit, setIsEdit] = useState(false)

    const [keyboardOpen, setKeyboardOpen] = useState(false)

    useEffect(() => {
        let bag = route?.params?.bag
        console.log(route?.params)

        if(bag != null && bagName == ""){
            setBagName(bag?.name)
            setColor(bag?.color)
            setNotes(bag?.notes)
            setBagKey(bag?.key)
            setSelectedDiscs(bag?.discs)
            setIsEdit(route?.params?.edit)
        } else{
            setColor(toHsv("#22AA22"))
        }
    }, [route])

    useEffect(() => {
        getDiscs()

        const keyBoardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardOpen(true)
            }
        )

        const keyBoardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardOpen(false)
            }
        )

        return () => {
            keyBoardDidHideListener.remove()
            keyBoardDidShowListener.remove()
        }
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

        let allBags = await getJsonData("all-bags")
        let key = bagKey != "" && isEdit ? bagKey : new Date().getTime()

        allBags = {
            bags: {
                [key]: {
                    ...bag
                },
                ...allBags?.bags
            }
        }

        await setJsonData("all-bags", allBags)

        let target = "Bags"

        if(isEdit){
            target = "BagDetails"
        }

        navigation.navigate(target, {bag: bag, key: key})
    }

    return (
        <View style={{height: "100%"}}>
            <Header title={"Add Bag"}/>
            <ScrollView contentContainerStyle={{padding: "5%", flexGrow: 1, paddingBottom: "15%"}}>
                <TextboxWithLabel 
                    label={"Bag Name"}
                    setValue={setBagName}
                    value={bagName}
                    inputStyle={{height: "60%", maxHeight: "60%", minHeight: "60%", fontSize: 16}}
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
                    items={discArray || []}
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
                        verticalAlign: "top",
                        marginBottom: "5%"
                    }}
                />
                <Button title="Save Bag" onPress={addBag} style={{marginTop: "5%"}}/>
            </ScrollView>
            {
                !keyboardOpen &&  
                <BottomTab navigation={navigation}/>
            }
            
        </View>
    )
}