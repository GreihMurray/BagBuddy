import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import { ScrollView, View } from "react-native";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import Text from "../components/Text";
import * as scale from "d3-scale"
import * as shape from "d3-shape"
import * as d3 from "d3"
import Svg, { G, Line, Path, Text as SVGText } from "react-native-svg";
import { fromHsv } from "react-native-color-picker";

export default function DiscDetails({navigation, route}){
    const [disc, setDisc] = useState()
    const [flightData, setFlightData] = useState()
    const [path, setPath] = useState("")

    useEffect(() => {
        let disc = route?.params?.disc

        generateFlightData()
        setDisc(disc)
    }, [])

    const editDisc = () => {
        let key = route?.params?.key

        navigation.navigate("AddDisc", {disc: disc, key: key, edit: true})
    }

    const generateFlightData = () => {
        let disc = route?.params?.disc
        let speed = parseFloat(disc?.speed)
        let glide = parseFloat(disc?.glide)
        let turn = parseFloat(disc?.turn)
        let fade = parseFloat(disc?.fade)

        const tempData = []
        const maxDistance = (Math.max(1, (speed * 0.5)) * 35) * ((1 + ((glide - 5)  * 0.1))) + 200 

        tempData.push({
            distance: 0,
            stability: 0
        })
        tempData.push({
            distance: (maxDistance * 0.6),
            stability: turn
        })
        tempData.push({
            distance: maxDistance,
            stability: (turn + fade)
        })

        setFlightData({
            data: tempData,
            maxDistance: maxDistance
        })
        
        getSvgData({
            data: tempData,
            maxDistance: maxDistance
        })
    };

    const getSvgData = (tempFlightData) => {
        const scaleY = scale.scaleLinear().domain([0, 500]).nice().range([475, 0]).nice()
        const scaleX = scale.scaleLinear().domain([-5, 5]).nice().range([300, 0]).nice()

        const line = shape.line()
                            .curve(d3.curveCatmullRom)
                            .x((d) => scaleX(d.stability))
                            .y((d) => scaleY(d.distance))

        setPath(line(tempFlightData.data))
    }

    const getGrid = () => {
        let elements = []

        for(let i = 0; i < 500; i += 50){
            elements.push(
                <>
                    <SVGText
                        stroke={"#CCCCCC"}
                        fill={"#CCCCCC"}
                        x={5}
                        y={(i - 4)}
                        fontSize={16}
                    >
                        {500 - i}
                    </SVGText>
                    <Line 
                        x1={0}
                        x2={500}
                        y1={i}
                        y2={i}
                        stroke={"#070707"}
                        strokeWidth={1}
                    />
                </>
            )
        }

        return (
            <>
                {elements.map(a => a)}
            </>
        )
    }
    
    return (
        <View style={{height: "100%"}}>
            <Header 
                title={disc?.name} 
                showButton={true} 
                buttonMethod={editDisc}
                buttonIcon={<Entypo name="edit" size={30} color={"#FFF"}/>}
            />
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: "100%"}}>
                <View style={{flexDirection: "column", padding: "5%"}}>
                    <Text text={`Disc Name: ${disc?.name}`}/>
                    <Text text={`Disc Name: ${disc?.manufacturer}`}/>
                    <Text text={`Disc Name: ${disc?.plastic}`}/>
                    <Text text={`Disc Name: ${disc?.weight}`}/>
                </View>
                <View style={{height: "15%", width: "100%", flexDirection: "row", padding: "5%"}}>
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

                <View style={{flexDirection: "column", margin: "5%", height: "50%"}}>
                    <Text text={"Disc Notes"} style={{fontSize: 20, fontWeight: "bold"}}/>
                    <ScrollView contentContainerStyle={{width: "100%", borderWidth: 2, borderColor: "#FFFFFF", padding: "2%", height: "80%"}}>
                        <Text text={route?.params?.bag?.notes}/>
                    </ScrollView>
                </View>
                
                <View style={{backgroundColor: "rgba(20, 148, 2, 0.3)", borderWidth: 2, borderColor: "#000", width: "80%", height: "50%", margin: "auto", marginTop: "-15%"}}>
                    <Svg 
                        height="675"
                        width="325"
                        style={{height: "100%"}}
                    >
                        <G>
                            {getGrid()}
                        </G>
                        <Path
                            d={path}
                            stroke={fromHsv(disc?.color) || '#FFF'}
                            strokeWidth="2"
                            fill="none"
                        />
                    </Svg>
                </View>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </View>
    )
}