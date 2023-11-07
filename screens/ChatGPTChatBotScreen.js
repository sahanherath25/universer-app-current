import React, {useState} from "react";
import {Text, TextInput, View, Animated, StyleSheet, TouchableOpacity, Alert, ScrollView} from "react-native";

const ChatGPTChatBotScreen=()=>{

    const [inputMessage, setInputMessage] = useState('');
    const [botReply, setBotReply] = useState('');


    //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 -API KEY

    //API KEY 2 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
    const handleButtonClick = () => {


        console.log("TYPED TEST",inputMessage)
        // Alert.alert("User Typed ",inputText)

        // URL need to fetch,
        //Chat Completion ref -https://api.openai.com/v1/completions

        //Chat API=  https://api.openai.com/v1/chat/completions

        // https://api.openai.com/v1/chat/completions
        fetch("https://api.openai.com/v1/chat/completions",{

            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"

            },
            //TODO HEre we are passing the question that need to ask
            //TODO Here when we passing our data we need to convert that into JSON  to convert our JS object to string data
            body:JSON.stringify({
                "model": "gpt-3.5-turbo",
                'messages': [
                    {
                        "role": "user",
                        "content": inputMessage,
                    }
                ]

            })

            //    Here when the user click the button we are fetching our request to the above URL
            //    Here we're passing our question with our API Key to the ChatGPT


        })
            .then((response)=> response.json())
            .then((data)=>{

                console.log("RESPONSE RECEIVED ",data)
                //    Accessing th Response data .This data is response by JSON Format
                let answer=data.choices[0].message.content.trim()
                console.log("RESPONSE RECEIVED ",answer)
                setBotReply(answer)
            })

        setInputMessage("")


    };


    const handleInputChangeText=(text)=>{
        console.log(text)
        setInputMessage(text)
    }


    // Animation configuration
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <ScrollView ontentContainerStyle={styles.scrollContainer} >
                <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.botMessage}>{botReply}</Text>
                </Animated.View>
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your question..."
                    value={inputMessage}
                    onChangeText={handleInputChangeText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleButtonClick}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginTop:8,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    botMessage: {
        fontSize: 16,
        color: '#333333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom:5,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 8,
        fontSize: 16,
        color: '#333333',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flexGrow: 1,
        marginTop:8,
    }

});

export default  ChatGPTChatBotScreen;