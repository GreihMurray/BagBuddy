import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import { getDiscsInBag, getJsonData } from "../utils/StorageUtils";
import { Picker } from "@react-native-picker/picker"
import { ScrollView, View } from "react-native";
import * as d3 from "d3"
import Header from "../components/Header";
import { fromHsv } from "react-native-color-picker";
import Svg, { Circle, G, Line, Text as SVGText } from "react-native-svg";

export default function FlightCharts({navigation}){
    const [bags, setBags] = useState()
    const [selectedBag, setSelectedBag] = useState(null)
    const [bagDiscs, setBagDiscs] = useState()

    const HEIGHT = 900
    const WIDTH = 405

    useEffect(() => {
        getBags()
    }, [])

    useEffect(() => {
        if(selectedBag){
            getDiscs()    
        }
    }, [selectedBag])

    const getDiscs = async () => {
        let discs = await getDiscsInBag(selectedBag)

        setBagDiscs(discs)
    }

    const getBags = async () => {
        let tempBags = await getJsonData("all-bags")

        tempBags = Object.entries(tempBags?.bags).map(([key, value]) => {
            return {
                name: value.name,
                key: key,
                label: value.name
            }
        })

        setBags(tempBags)
        setSelectedBag(tempBags[0].key)
    }

    const getGrid = () => {
        let elements = []

        let step = HEIGHT / 15
        let mark = 16

        for(let i = 0; i <= HEIGHT + step; i += step){
            elements.push(
                <>
                    <SVGText
                        fontSize={12}
                        x={6}
                        y={i - 20}
                        stroke={"#FFF"}
                        strokeWidth={2}
                        fill={"#FFF"}
                        
                    >
                        {mark--}
                    </SVGText>
                    <Line 
                        x1={0}
                        x2={WIDTH}
                        y1={i - step}
                        y2={i - step}
                        stroke={"#FFFFFF"}
                        strokeWidth={1}
                    />
                </>
            )
        }

        step = WIDTH/10
        for(let i = 0; i <= WIDTH + step; i += step){
            elements.push(
                <Line 
                    y1={0}
                    y2={HEIGHT}
                    x1={i - (step / 2)}
                    x2={i - (step / 2)}
                    stroke={"#FFFFFF"}
                    strokeWidth={1}
                />
            )
        }

        return elements
    }

    const getCircles = () => {
        if(bagDiscs == null || bagDiscs == []){
            return
        }

        const xScale = d3.scaleLinear().domain([-5, 5]).range([WIDTH, 0])
        const yScale = d3.scaleLinear().domain([0, 15]).nice().range([HEIGHT, 0]).nice()

        let circles = []

        bagDiscs?.map(disc => {
            let xStart = xScale(parseFloat(disc?.fade) + parseFloat(disc?.turn))
            let yStart = yScale(parseFloat(disc?.speed))

            circles.push(
                <>
                    <SVGText
                        stroke={"#CCCCCC"}
                        fill={"#CCCCCC"}
                        x={xStart - 15}
                        y={yStart - 30}
                        fontSize={12}
                    >
                        {disc?.name}
                    </SVGText>
                    <Circle 
                        key={`${disc?.name}-${disc?.weight}`}
                        r={20}
                        x={xStart}
                        y={yStart}
                        stroke={fromHsv(disc?.color) || "#FF00FF"}
                        fill={fromHsv(disc.color) || "FF00FF"}
                        strokeWidth={2}
                    />
            </>)
        })

        return circles
    }

    return(
        <>
            <Header title="Flight Chart"/>
            <View style={{height: "12%", padding: "5%"}}>
                <Picker
                    onValueChange={(value) => setSelectedBag(value)}
                    selectedValue={selectedBag}
                    style={{
                        width: "100%",
                        height: "100%", 
                        backgroundColor: "#FFF"
                    }}
                >
                    {
                        bags?.map(bag => 
                            <Picker.Item 
                                label={bag?.label}
                                value={bag?.key}
                                key={bag?.key}
                            />
                        )
                    }
                </Picker>
            </View>
            <View style={{
                width: "100%",
                height: "65%",
                marginTop: "2%",
                borderWidth: 2,
                borderColor: "#FFF"
            }}>
                <ScrollView contentContainerStyle={{
                    width: "100%",
                    flexGrow: 1,
                    paddingBottom: "0%"
                }}>
                    <Svg
                        height={HEIGHT}
                        width={WIDTH}
                    >
                        <G>{getGrid()}</G>
                        {getCircles()}
                    </Svg>
                </ScrollView>
            </View>
            <BottomTab navigation={navigation} />
        </>
    )
}