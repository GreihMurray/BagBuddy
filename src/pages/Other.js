import BottomTab from "../components/BottomTab";
import Text from "../components/Text";

export default function Other({navigation}){
    return(
        <>
            <Text text={"Coming Soon"} style={{
                margin: "auto",
                fontSize: 36,
                fontWeight: "bold"
            }}/>

            <BottomTab navigation={navigation} />
        </>
    )
}