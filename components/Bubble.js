import React, {useRef} from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../constants/colors";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import uuid from "react-native-uuid";
import * as Clipboard from 'expo-clipboard';
import {Feather, FontAwesome} from "@expo/vector-icons";
import {starMessage} from "../utils/actions/chatActions";
import {useSelector} from "react-redux";



function formatAmPm(dateString) {

    const date=new Date(dateString);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;

}


const MenuItem = (props) => {

    const Icon=props.iconPack ?? Feather;

    return (
        <MenuOption onSelect={props.onSelect}>
            <View style={styles.menuItemContainer}>
                <Text style={styles.menuText}>{props.text}</Text>
                <Icon name={props.icon} size={18}/>
            </View>
        </MenuOption>
    )
}

const Bubble = (props) => {

    const {text, type,messageId,userId,chatId,date,setReply,replyingTo,name,imageUrl} = props;
    console.log("IMAGEURL ",imageUrl)

    const starredMessages=useSelector(state=>state.messages.starredMessages[chatId] ?? {});

    const storedUsers=useSelector(state=>state.users.storedUsers)

    console.log("BUBBLE JS",starredMessages)


    const bubbleStyle = {...styles.container};
    const textStyle = {...styles.text};
    const wrapperStyle = {...styles.wrapperStyle};




    const menuRef = useRef(null)

    let Container = View;
    let isUserMessage=false;
    const dateString=date &&formatAmPm(date);



    //Generating a unique id for menu
    const id = useRef(uuid.v4());

    console.log("UseRef Id ", id.current)

    switch (type) {
        case "system":
            textStyle.color = "#65644a";
            bubbleStyle.backgroundColor = colors.beige;
            bubbleStyle.alignItems = "center";
            bubbleStyle.marginTop = 10;
            break;
        case  "error":
            bubbleStyle.backgroundColor = colors.red;
            textStyle.color = "white";
            bubbleStyle.marginTop = 10;
            break;

        case "myMessage":
            wrapperStyle.justifyContent = "flex-end";
            bubbleStyle.backgroundColor = "#e7fed6";
            bubbleStyle.maxWidth = "90%";
            Container = TouchableWithoutFeedback;
            isUserMessage=true;
            break;


        case "userMessage":
            wrapperStyle.justifyContent = "flex-start";
            bubbleStyle.maxWidth = "90%";
            Container = TouchableWithoutFeedback;
            isUserMessage=true;
            break;
        case "reply":
            bubbleStyle.backgroundColor="#f2f2f2"
            break;

        case"info":
            bubbleStyle.backgroundColor="white";
            bubbleStyle.alignItems = "center";
            textStyle.color=colors.textColor;
            break;


        default:
            break;
    }

    const copyToClipboard = async (text) => {
        try {
            await Clipboard.setStringAsync(text)
        } catch (e) {

            console.log(e.toString())
        }

    }

    const isStarred=isUserMessage && starredMessages[messageId] !== undefined;

    const replyingToUser=replyingTo && storedUsers[replyingTo.sentBy]



    return (

        <View style={wrapperStyle}>
            <Container style={{width: "100%"}}
                       onLongPress={() => console.log(menuRef.current.props.ctx.menuActions.openMenu(id.current))}>
                <View style={bubbleStyle}>

                    {
                        name && type !== "info" &&
                        <Text style={styles.name}>{name}</Text>

                    }

                    {
                        replyingToUser &&
                        <Bubble type={"reply"} text={replyingTo.text} name={`${replyingToUser.firstName} ${replyingToUser.lastName} `}

                        />
                    }

                    {
                        !imageUrl &&
                        <Text style={textStyle}>
                            {text}
                        </Text>
                    }

                    {
                        imageUrl &&
                        <Image source={{uri:imageUrl}} style={styles.image}/>
                    }

                    {
                        dateString && type !== "info" && <View style={styles.timeContainer}>
                            {isStarred && <FontAwesome name={"star"} size={14} color={colors.textColor} style={{marginRight:5,marginTop:3}}/>}
                            <Text style={styles.time}>{dateString}</Text>
                        </View>
                    }

                    <Menu ref={menuRef} name={id.current}>
                        <MenuTrigger/>
                        <MenuOptions>
                            {/*<MenuOption />*/}
                            <MenuItem text={"Copy To Clipboard"} onSelect={() => copyToClipboard(text)}  icon={"copy"}/>
                            <MenuItem text={`${isStarred ? 'Unstar' : 'Star'} message`} onSelect={() => starMessage(messageId,chatId,userId)} icon={`${isStarred ? 'star-o' : 'star'}`} iconPack={FontAwesome}/>
                            <MenuItem text={"Reply To"} onSelect={setReply} icon={"arrow-left-circle"} />


                        </MenuOptions>
                    </Menu>


                </View>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        wrapperStyle: {
            flexDirection: "row",
            justifyContent: "center",
        },
        container: {
            backgroundColor: colors.white,
            borderRadius: 6,
            padding: 5,
            marginBottom: 10,
            borderColor: "#e2d8cc",
            borderWidth: 1,
        }
        ,
        text: {
            fontFamily: "regular",
            letterSpacing: 0.3,
        },
        menuItemContainer: {
            flexDirection:"row",
            padding:5,
        },
        menuText: {

            flex:1,
            fontFamily:"regular",
            letterSpacing:0.3,
            fontSize:15,
        },
        timeContainer: {
            flexDirection:'row',
            justifyContent:"flex-end",
        },
        time:{
           fontFamily:"regular",
           letterSpacing:0.3,
           color:colors.grey,
           fontSize:12,
        },
        name:{
            fontFamily:"medium",
            letterSpacing:0.3,
        },
        image:{
            width:300,
            height:300,
            marginBottom:5,
        },

    }
)

export default Bubble;