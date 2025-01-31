import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import * as shape from 'd3-shape'
import { fromHsv, rotatePoint } from "react-native-color-picker/dist/utils";
import { ScrollView, View } from "react-native";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import Text from "../components/Text";

export default function DiscDetails({navigation, route}){
    const [stability, setStability] = useState([])
    const [speed, setSpeed] = useState([])
    const [disc, setDisc] = useState()
    const [flightData, setFlightData] = useState()

    useEffect(() => {
        let disc = route?.params?.disc

        generateFlightData()
        setDisc(disc)

        // if(disc != null){
        //     let points = [0, 0, 0, 0]
        //     let numPoints = 80

        //     for(let i = 0; i < numPoints; i++){
        //         const t = i / (numPoints)
        //         const x = t * parseFloat(disc?.turn)
        //         const curveOffset = (parseFloat(disc?.fade) * Math.sin(Math.PI * t))

        //         value = (x + curveOffset) * t

        //         if(t > 0.75){
        //             break
        //         } else{
        //             value *= 2
        //         }

        //         points.push(value)
        //     }

        //     setStability(points)
        //     setDisc(disc)
        // }
    }, [])

    const editDisc = () => {
        let key = route?.params?.key

        navigation.navigate("AddDisc", {disc: disc, key: key})
    }

    const generateFlightData = () => {
        let disc = route?.params?.disc
        let speed = parseFloat(disc?.speed)
        let glide = parseFloat(disc?.glide)
        let turn = parseFloat(disc?.turn)
        let fade = parseFloat(disc?.fade)

        const tempD = []
        const tempS = []
        const maxDistance = (Math.max(1, (speed * 0.5)) * 35) * ((1 + ((glide - 5)  * 0.1))) + 200 
        const step = 5;

        let tempStability = 0
        for(let i = 0; i <= maxDistance; i += step){
            let percentage = i / maxDistance;

            if(percentage <= 0.6){
                tempStability = ((1.5 * i) / maxDistance) * turn
            } else{
                tempStability = turn + (percentage * fade)
            }

            tempD.push(i)
            tempS.push(tempStability)
        }

        setFlightData({
            distance: tempD,
            stability: tempS
        })
        
    };
    
    return (
        <View style={{height: "100%"}}>
            <Header 
                title={disc?.name} 
                showButton={true} 
                buttonMethod={editDisc}
                buttonIcon={<Entypo name="edit" size={30} color={"#FFF"}/>}
            />
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "120%"}}>
                <View style={{flexDirection: "column"}}>
                    <Text text={`Disc Name: ${disc?.name}`}/>
                    <Text text={`Disc Name: ${disc?.manufacturer}`}/>
                    <Text text={`Disc Name: ${disc?.plastic}`}/>
                    <Text text={`Disc Name: ${disc?.weight}`}/>
                </View>
                <View style={{height: "100%", width: "100%", flexDirection: "row", padding: "5%"}}>
                    <View style={{flexDirection: "column", width: "20%", marginLeft: "auto", marginRight: "auto"}}>
                        <Text text={"Speed"} style={{marginLeft: "auto", marginRight: "auto"}}/>
                        <Text text={disc?.speed} style={{fontSize: 24, width: "100%", textAlign: "center", backgroundColor: "rgba(20, 148, 2, 0.3)", borderWidth: 2, borderColor: "#000"}}/>
                    </View>
                    <View style={{flexDirection: "column", width: "20%", marginLeft: "auto", marginRight: "auto"}}>
                        <Text text={"Glide"} style={{marginLeft: "auto", marginRight: "auto"}}/>
                        <Text text={disc?.glide} style={{fontSize: 24, width: "100%", textAlign: "center", backgroundColor: "rgba(20, 148, 2, 0.3)", borderWidth: 2, borderColor: "#000"}}/>
                    </View>
                    <View style={{flexDirection: "column", width: "20%", marginLeft: "auto", marginRight: "auto"}}>
                        <Text text={"Turn"} style={{marginLeft: "auto", marginRight: "auto"}}/>
                        <Text text={disc?.turn} style={{fontSize: 24, width: "100%", textAlign: "center", backgroundColor: "rgba(20, 148, 2, 0.3)", borderWidth: 2, borderColor: "#000"}}/>
                    </View>
                    <View style={{flexDirection: "column", width: "20%", marginLeft: "auto", marginRight: "auto"}}>
                        <Text text={"Fade"} style={{marginLeft: "auto", marginRight: "auto"}}/>
                        <Text text={disc?.fade} style={{fontSize: 24, width: "100%", textAlign: "center", backgroundColor: "rgba(20, 148, 2, 0.3)", borderWidth: 2, borderColor: "#000"}}/>
                    </View>
                </View>
                <View style={{flexDirection: "column", margin: "5%", height: "18%"}}>
                        <Text text={"Disc Notes"} style={{fontSize: 20, fontWeight: "bold"}}/>
                        <ScrollView contentContainerStyle={{width: "100%", borderWidth: 2, borderColor: "#FFFFFF", padding: "2%"}}>
                            <Text text={route?.params?.bag?.notes}/>
                        </ScrollView>
                    </View>
                <View style={{transform: [{scale: 1.25}], backgroundColor: "rgba(20, 148, 2, 0.3)"}}>
                    {/* <Svg 
                        height="200"
                        width="200"
                        style={{height: 300}}
                    >
                        <Path
                            d={flightData}
                            stroke={fromHsv(disc?.color) || 'blue'}
                            strokeWidth="2"
                            fill="none"
                            
                        />
                    </Svg> */}
                </View>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </View>
    )
}