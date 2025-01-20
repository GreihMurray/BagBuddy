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
        
        const jsonData = JSON.parse(data)
        if(data != null){
            return jsonData
        } else{
            return "yoyoyo"
        }
    } catch(e){
        console.log("FFFF")
    }
}