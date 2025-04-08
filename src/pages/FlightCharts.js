import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import { getDiscsInBag, getJsonData } from "../utils/StorageUtils";
import { Picker } from "@react-native-picker/picker"
import { View } from "react-native";
import * as d3 from "d3"
import Header from "../components/Header";
import { fromHsv } from "../react-native-color-picker/src/index"
import Svg, { Circle, G, Rect, Text as SVGText } from "react-native-svg";

export default function FlightCharts({navigation}){
    const [bags, setBags] = useState()
    const [selectedBag, setSelectedBag] = useState(null)
    const [bagDiscs, setBagDiscs] = useState()

    const HEIGHT = 570
    const WIDTH = 430

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

        let boxWidth = WIDTH / 11

        const xScale = d3.scaleLinear().domain([-6, 6]).range([WIDTH, 3])
        const yScale = d3.scaleLinear().domain([0, 16]).nice().range([HEIGHT, 5]).nice()

        for(let row = 1; row <= 16; row++){
            for(let col = -6; col <= 6; col++){
                elements.push(
                    <Rect 
                        id={`${row}-${col}`}
                        x={xScale(col) - (0.5 * boxWidth)}
                        y={yScale(row) - (0.5 * boxWidth)}
                        stroke={"#000"}
                        fill={"none"}
                        width={boxWidth - 4}
                        height={boxWidth - 4}
                        opacity={0.4}
                    />
                )
            }
            if(row == 16){
                break
            }
            elements.push(
                <SVGText
                    id={`text-${row}`}
                    stroke={"#FFF"}
                    strokeWidth={2}
                    fontSize={12}
                    x={3}
                    y={yScale(row)}
                >
                    {row}
                </SVGText>
            )
        }

        for(let i = -5; i <= 5; i++){
            elements.push(
                <SVGText
                    id={`grid-${i}`}
                    stroke={"#FFF"}
                    strokeWidth={1}
                    fontSize={12}
                    x={xScale(i) - 5}
                    y={15}
                >
                    {i}
                </SVGText>
            )
        }

        return elements
    }

    const getCircles = () => {
        if(bagDiscs == null || bagDiscs == []){
            return
        }

        let xMin = -6
        let xMax = 6
        let yMin = 0
        let yMax = 16

        const xScale = d3.scaleLinear().domain([xMin, xMax]).range([WIDTH, 3])
        const yScale = d3.scaleLinear().domain([yMin, yMax]).nice().range([HEIGHT, 5]).nice()

        let circles = []

        bagDiscs?.map(disc => {
            if(disc?.glide && disc?.turn && disc?.fade && disc?.speed){
                let xStart = xScale(parseFloat(disc?.fade) + parseFloat(disc?.turn))
                let yStart = yScale(parseFloat(disc?.speed))

                circles.push(
                    <>
                        <SVGText
                            stroke={"#FFF"}
                            fill={"#FFF"}
                            x={xStart - 15}
                            y={yStart - 15}
                            fontSize={12}
                        >
                            {disc?.name}
                        </SVGText>
                        <Circle 
                            key={`${disc?.name}-${disc?.weight}`}
                            r={12}
                            x={xStart}
                            y={yStart}
                            stroke={fromHsv(disc?.color) || "#FF00FF"}
                            fill={fromHsv(disc.color) || "FF00FF"}
                            strokeWidth={2}
                        />
                </>)
            }
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
                height: "67%",
                marginTop: "2%",
                borderWidth: 2,
                borderColor: "#FFF",
                backgroundColor: "#005500"
            }}>
                
                    <Svg
                        height={HEIGHT}
                        width={WIDTH}
                    >
                        <G>{getGrid()}</G>
                        {getCircles()}
                    </Svg>
            </View>
            <BottomTab navigation={navigation} />
        </>
    )
}