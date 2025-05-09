import { Button, Keyboard, TextInput, View } from "react-native";
import Text from "../components/Text";
import BottomTab from "../components/BottomTab";
import Header from "../components/Header";
import TextboxWithLabel from "../components/TextBoxWithLabel";
import { useEffect, useRef, useState } from "react";
import { fromHsv, toHsv } from "../react-native-color-picker/src/index"
import { getJsonData, setJsonData } from "../utils/StorageUtils";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ColorPicker, { BrightnessSlider, InputWidget, Panel3, Preview, } from "reanimated-color-picker";

export default function AddDisc({navigation, route}){
    const colorPickerRef = useRef(null)

    const manufacturerRef = useRef()
    const speedRef = useRef();
    const glideRef = useRef();
    const turnRef = useRef();
    const fadeRef = useRef();
    const notesRef = useRef();
    const plasticRef = useRef();
    const weightRef = useRef();

    const [discName, setDiscName] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [originalColor, setOriginalColor] = useState()
    const [plastic, setPlastic] = useState("")
    const [weight, setWeight] = useState("")
    const [speed, setSpeed] = useState("")
    const [glide, setGlide] = useState("")
    const [turn, setTurn] = useState("")
    const [fade, setFade] = useState("")
    const [color, setColor] = useState("")
    const [notes, setNotes] = useState("")
    const [discKey, setDiscKey] = useState("")

    const [isEdit, setIsEdit] = useState(false)
    const [keyboardOpen, setKeyboardOpen] = useState(false)

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
            setOriginalColor(fromHsv(disc?.color))
            setNotes(disc?.notes)
            setWeight(disc?.weight)
            setPlastic(disc?.plastic)
            setDiscKey(route?.params?.key)
            setIsEdit(route?.params?.edit)
        } else{
            setColor("#22AA22")
            setOriginalColor("#22AA22")
        }
    }, [route])

    useEffect(() => {
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

    const addDisc = async () => {
        let disc = {
            name: discName,
            manufacturer: manufacturer,
            speed: speed,
            glide: glide,
            turn: turn,
            fade: fade,
            color: color,
            notes: notes,
            plastic: plastic,
            weight: weight
        }

        let allDiscs = await getJsonData("all-discs")
        let key = discKey != "" && isEdit ? discKey : new Date().getTime();

        allDiscs = {
            discs: {
                ...allDiscs?.discs,
                [key]: {...disc}
            }
        }

        await setJsonData("all-discs", allDiscs)

        let target = "Discs"
        if(isEdit){
            target = "DiscDetails"
        }

        navigation.navigate(target, {disc: disc, key: key})
    }

    const onColorChange = (tempColor) => {
        setColor(tempColor.hsv)
    }

    return (
        <View style={{height: "100%"}}>
            <Header title={isEdit ? "Edit Disc" : "Add Disc"}/>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{padding: "5%", flexGrow: 1, paddingBottom: "90%"}}>
                    <TextboxWithLabel 
                        label={"Disc Name"}
                        setValue={setDiscName}
                        value={discName}
                        returnKey={"next"}
                        submitBehavior={"submit"}
                        onSubmit={() => manufacturerRef.current.focus()}
                    />
                    <TextboxWithLabel 
                        label={"Manufacturer"}
                        setValue={setManufacturer}
                        value={manufacturer}
                        ref={manufacturerRef}
                        returnKey={"next"}
                        submitBehavior={"submit"}
                        onSubmit={() => {plasticRef.current.focus()}}
                    />
                    <TextboxWithLabel 
                        label={"Plastic"}
                        setValue={setPlastic}
                        value={plastic}
                        ref={plasticRef}
                        returnKey={"next"}
                        submitBehavior={"submit"}
                        onSubmit={() => {weightRef.current.focus()}}
                    />
                    <TextboxWithLabel 
                        label={"Weight"}
                        setValue={setWeight}
                        inputMode={"numeric"}
                        value={weight}
                        ref={weightRef}
                        returnKey={"next"}
                        submitBehavior={"submit"}
                        onSubmit={() => {speedRef.current.focus()}}
                    />
                    <View style={{flexDirection: "row", marginTop: "5%", height: "10%"}}>
                        <TextboxWithLabel 
                            label={"Speed"}
                            maxLength={5}
                            setValue={setSpeed}
                            value={speed}
                            inputMode={"tel"}
                            ref={speedRef}
                            returnKey={"next"}
                            submitBehavior={"submit"}
                            onSubmit={() => {glideRef.current.focus()}}
                            labelStyle={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                            inputStyle={{width: "100%", textAlign: "center", height: "60%", marginTop: "3%"}}
                            style={{
                                width:"22%",
                                height: "100%"
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
                            inputMode={"tel"}
                            maxLength={5}
                            setValue={setGlide}
                            ref={glideRef}
                            value={glide}
                            returnKey={"next"}
                            submitBehavior={"submit"}
                            onSubmit={() => {turnRef.current.focus()}}
                            labelStyle={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                            inputStyle={{width: "100%", textAlign: "center", height: "60%", marginTop: "3%"}}
                            style={{
                                width:"22%",
                                height: "100%"
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
                            inputMode={"tel"}
                            maxLength={5}
                            setValue={setTurn}
                            ref={turnRef}
                            returnKey={"next"}
                            submitBehavior={"submit"}
                            onSubmit={() => {fadeRef.current.focus()}}
                            value={turn}
                            labelStyle={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                            inputStyle={{width: "100%", textAlign: "center", height: "60%", marginTop: "3%"}}
                            style={{
                                width:"22%",
                                height: "100%"
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
                            inputMode={"tel"}
                            maxLength={5}
                            setValue={setFade}
                            ref={fadeRef}
                            returnKey={"next"}
                            // submitBehavior={"blurAndSubmit"}
                            value={fade}
                            labelStyle={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                            inputStyle={{width: "100%", textAlign: "center", height: "60%", marginTop: "3%"}}
                            style={{
                                width:"22%",
                                height: "100%"
                            }}
                        />
                    </View>
                    <Text style={{marginRight: "auto", marginLeft: "auto", marginTop: 20}} text="Disc Color" />
                    <ColorPicker
                        onCompleteJS={onColorChange}
                        value={originalColor}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 10,
                            marginBottom: "18%",
                            marginTop: "3%",
                            marginRight: "auto",
                            marginLeft: "auto"
                        }}>
                        <Panel3/>
                        <View style={{margin: "5%"}}>
                            <BrightnessSlider style={{marginBottom: "5%"}}/>
                            <Preview hideInitialColor={true}/>  
                        </View>                 
                    </ColorPicker>

                    <Text text={"Notes"}/>
                    <TextInput
                        multiline
                        maxLength={300}
                        onChangeText={(value) => setNotes(value)}
                        numberOfLines={8}
                        ref={notesRef}
                        value={notes}
                        style={{
                            height: "20%",
                            borderWidth: 2,
                            borderColor: "#D9D9D9",
                            verticalAlign: "top",
                            marginBottom: "2%",
                            color: "#FFF"
                        }}
                    />
                    <Text text={`Characters remaining: ${notes.length}/300`} style={{marginBottom: "3%", marginRight: 0, marginLeft: "auto", fontSize: 12}}/>
                    <Button title="Save Disc" onPress={addDisc} style={{marginTop: "5%"}}/>
                </ScrollView>
            </GestureHandlerRootView>
            {
                !keyboardOpen && <BottomTab navigation={navigation}/> 
            }
        </View>
    )
}