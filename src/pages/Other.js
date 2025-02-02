import { Alert, Button, View } from "react-native";
import BottomTab from "../components/BottomTab";
import Text from "../components/Text";
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"
import Header from "../components/Header";
import { getJsonData, setJsonData } from "../utils/StorageUtils";

export default function Other({navigation}){
    const {StorageAccessFramework} = FileSystem

    const exportData = async () => {
        let fileName = FileSystem.documentDirectory + "dataExport.json"

        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()

        if(permissions.granted){
            console.log(fileName)

            let allBags = await getJsonData("all-bags")
            let allDiscs = await getJsonData("all-discs")

            console.log(allBags)

            StorageAccessFramework.createFileAsync(permissions.directoryUri, "bagbuddy-dataExport.json", "application/json").then(async (file) => {
                await FileSystem.writeAsStringAsync(file, JSON.stringify({"all-bags": {...allBags}, "all-discs": {...allDiscs}})).then((a) => {
                    Alert.alert(
                        "Success",
                        "Data exported successfully"
                    )
                })
            }).catch((e) => {
                console.log(e)
            })  
        }
    }

    const importData = async () => {
        const filePath = await DocumentPicker.getDocumentAsync()

        const file = filePath.assets[0]

        console.log(file.uri, file.name)

        StorageAccessFramework.readAsStringAsync(file.uri, {encoding: "utf8"}).then((result) => {
            let json = JSON.parse(result)

            setJsonData("all-bags", json["all-bags"])
            setJsonData("all-discs", json["all-discs"])

            Alert.alert(
                "Success",
                "Data was imported successfully"
            )
        }).catch((e) => {
            console.log(e)
        })
    }

    return(
        <>
            <Header title={"Settings"}/>
            <View style={{height: "80%", width: "100%", padding: "5%"}}>
                <Text text={"Export Data"} style={{
                    margin: "auto",
                    marginTop: "0",
                    marginBottom: "5%",
                    fontSize: 24,
                    fontWeight: "bold"
                }}/>

                <Button  title={"Export"} onPress={exportData} style={{height: "20%", width: "80%"}}/>

                <Text text={"Import Data"} style={{
                    margin: "auto",
                    marginTop: "10%",
                    marginBottom: "5%",
                    fontSize: 24,
                    fontWeight: "bold"
                }}/>

                <Button  title={"Import"} onPress={importData} style={{height: "20%", width: "80%"}}/>
            </View>
            <BottomTab navigation={navigation} />
        </>
    )
}