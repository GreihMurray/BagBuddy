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

export async function getDiscsInBag(bagKey){
    try{
        const data = await AsyncStorage.getItem("all-bags").then((result) => {return result})
        let bagDiscs = []

        if(data != null){
            const jsonData = JSON.parse(data).bags
            let bag = jsonData[bagKey]

            let tempBagDiscs = bag?.discs

            let allDiscsRaw = await AsyncStorage.getItem("all-discs").then((result) => {return result})
            

            if(allDiscsRaw == null) {
                return []
            } else{
                let allDiscs = JSON.parse(allDiscsRaw)

                for(const disc of tempBagDiscs){
                    if(Object.keys(allDiscs?.discs).includes(disc)){
                        bagDiscs.push(allDiscs?.discs[disc])
                    } else{
                        tempBagDiscs.splice(tempBagDiscs.indexOf(disc), 1)
                    }
                }

                let newBags = {
                    bags: {
                        ...jsonData,
                        [bagKey]: [
                            ...tempBagDiscs
                        ]
                    }
                }

                setJsonData("all-bags", newBags)

                return bagDiscs
            }
        } else {
            return []
        }
    } catch(e) {
        return []
    }
}