import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setJsonData(key, value){
    try{
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch(e){
        console.log(e)
    }
}

export async function getJsonData(key){
    try{
        const data = await AsyncStorage.getItem(key).then((result) => {return result})
        if(data != null){
            const jsonData = JSON.parse(data)
            return jsonData
        } else{
            return null
        }
    } catch(e){
        console.log("FFFF")
    }
}