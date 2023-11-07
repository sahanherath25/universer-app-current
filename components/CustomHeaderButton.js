import React from "react";
import {StyleSheet} from "react-native";
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";
import colors from "../constants/colors";

const CustomHeaderButton = (props) => {
    return(
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            // TODO ?? means if props.color null then use blue color
            color={props.color ?? colors.blue}
        />
    )

}

const styles = StyleSheet.create(
    {

    }
)

export default CustomHeaderButton