import React from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import ProfileImage from "./ProfileImage";
import colors from "../constants/colors";
import {AntDesign, Ionicons} from "@expo/vector-icons";

const imageSize=60;

const DataItem = (props) => {

    const {title, subTitle, image,type,isChecked,icon,} = props;

    const hideImage=props.hideImage && props.hideImage=== true;

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>

                {
                    !icon && !hideImage && 
                    <ProfileImage uri={image} size={imageSize}/>
                }

                {
                    icon &&
                    <View style={styles.leftIconContainer}>
                        <AntDesign name={icon} size={20} color={colors.blue}/>
                    </View>
                }


                <View style={styles.textContainer}>

                    <Text
                        style={{...styles.title,...{color:type=== "button" ? colors.blue : colors.textColor}}}
                        numberOfLines={1}
                    >
                        {title}

                    </Text>

                    {
                        subTitle &&
                        <Text style={styles.subTitle} numberOfLines={1}>{subTitle}</Text>
                    }

                </View>

                {
                    type === "checkbox" &&
                    <View style={{...styles.iconContainer,...isChecked && styles.checkedStyle}}>
                        <Ionicons name="checkmark" size={18} color="white" />
                    </View>
                }

                {
                    type === "link" &&
                    <View >
                        <Ionicons name="chevron-forward-outline" size={18} color={colors.grey} />
                    </View>
                }



            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            paddingVertical: 7,
            borderBottomColor: colors.lightGrey,
            borderBottomWidth: 1,
            alignItems: "center",
            minHeight: 50,
        },
        textContainer: {
            marginLeft:14,
            flex:1,

        }
        ,
        title: {
            fontFamily: "regular",
            fontSize: 16,
            letterSpacing: 0.3,

        },
        subTitle: {
            fontFamily: "montserratRegular",
            color: colors.grey,
            letterSpacing: 0.3,
        },
        iconContainer: {
            borderWidth:1,
            borderRadius:50,
            borderColor:colors.lightGrey,
            backgroundColor:"white",
        },
        checkedStyle:{
            backgroundColor:colors.primary,
            borderColor:"transparent"
        },
        leftIconContainer: {

            backgroundColor:colors.extraLightGray,
            borderRadius:50,
            alignItems:"center",
            justifyContent:"center",
            width:40,
            height:40,
        }


    }
)

export default DataItem;