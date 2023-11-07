import {View, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const PageContainer = (props) => {

    return (


            <View style={{...styles.container, ...props.style}}>
                {props.children}
            </View>

    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "white",
    },
    // background: {
    //     flex: 1,
    // },

})

export default PageContainer;