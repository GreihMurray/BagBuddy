import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import { LineChart, Grid } from "react-native-svg-charts";
import Svg, { G, Line, Path } from "react-native-svg";
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

    const CustomGrid = ({ x, y, data, ticks }) => (
        <G>
            {
                // Horizontal grid
                ticks.map(tick => (
                    <Line
                        key={ tick }
                        x1={ '0%' }
                        x2={ '100%' }
                        y1={ y(tick) }
                        y2={ y(tick) }
                        stroke={ 'rgba(0,0,0,0.4)' }
                    />
                ))
            }
            {
                // Vertical grid
                data.map((_, index) => (index % 8 == 0 &&
                    <Line
                        key={ index/2 }
                        y1={ '0%' }
                        y2={ '100%' }
                        x1={ x(index) }
                        x2={ x(index) }
                        stroke={ 'rgba(0,0,0,0.4)' }
                    />
                ))
            }
        </G>
    )

    const cubicBezier = (p0, p1, p2, p3, t) => {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
        
        const p = {
          x: uuu * p0.distance + 3 * uu * t * p1.distance + 3 * u * tt * p2.distance + ttt * p3.distance,
          y: uuu * p0.stability + 3 * uu * t * p1.stability + 3 * u * tt * p2.stability + ttt * p3.stability
        };
        return p;
      };

    const generateFlightData = () => {
        let disc = route?.params?.disc
        let speed = parseFloat(disc?.speed)
        let glide = parseFloat(disc?.glide)
        let turn = parseFloat(disc?.turn)
        let fade = parseFloat(disc?.fade)

        const tempFlightData = [];
        const maxDistance = 400;
        const step = 20;
        
        let tempStability = 0;
        for (let distance = 0; distance <= maxDistance; distance += step) {
            let percent = (distance / maxDistance)

            if (percent <= 0.5) {
                tempStability = ((2 * percent)) * turn 
                console.log(tempStability)
              }
          
              if (percent >= 0.5) {
                tempStability = turn + ((2 * percent) * (fade))
                console.log(turn + ((2 * percent) * (fade)))
              }
    
            // tempStability += glide * 0.1; 
    
            tempFlightData.push({
                distance: distance,
                stability: Math.min(5, tempStability),
            });
        }
    
        console.log(tempFlightData)
        setStability(tempFlightData.map(a => a.stability))

        pathData = []

        for (let i = 1; i < tempFlightData.length - 2; i++) {
            const p0 = tempFlightData[i - 1];
            const p1 = tempFlightData[i];
            const p2 = tempFlightData[i + 1];
            const p3 = tempFlightData[i + 2];
            
            for (let t = 0; t <= 1; t += 0.1) {
              const p = cubicBezier(p0, p1, p2, p3, t);
              pathData.push(p.x);
            }
        }
        // setStability(pathData)
        // setFlightData(tempFlightData.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.distance} ${150 - point.stability * step}`).join(" "))
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
                    
                    <LineChart
                        data={stability}
                        style={{height: 200, borderWidth: 3, borderColor: "black", width: "100%"}}
                        svg={{stroke: fromHsv(route?.params?.disc?.color) || "blue", strokeWidth: 3}}
                        curve={shape.curveMonotoneX}
                        contentInset={{top: 0, bottom: 0}}
                        transform={{rotate: "90"}}
                        
                    >
                        <CustomGrid belowChart={true}/>
                    </LineChart>
                </View>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </View>
    )
}