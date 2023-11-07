import React, {useCallback, useEffect, useReducer, useState} from "react";
import {ActivityIndicator, Alert, Text, View} from "react-native";
import Input from "./Input";
import {Feather, FontAwesome} from "@expo/vector-icons";
import SubmitButton from "./SubmitButton";
import validate from "validate.js";
import {validateEmail, validatePassword, validateString} from "../utils/validationConstraints";

import {validateInput} from "../utils/actions/FormActions";
import {reducer} from "../utils/reducers/formReducer";
import {signUp} from "../utils/actions/authActions";
import {getFirebaseApp} from "../utils/firebaseHelper";
import colors from "../constants/colors";
import {useDispatch, useSelector} from "react-redux";

//function that execute when we want to update the state

const initialState = {

    //TODO here this has 2 inputs
    //1st To check Form is valid 2-->entire form is valid

    inputValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    },
    inputValidates: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false
}

const SignUpForm = () => {


    //Creating a dispatch
    const dispatch = useDispatch();

    const stateData = useSelector(state => state.auth)
    console.log("State Data", stateData);

    //state foe handling error
    const [error, setError] = useState()

    //state handling in spinner
    const [isLoading, setIsLoading] = useState(false)

    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangeHandler = useCallback((inputId, inputValue) => {

        // console.log(validateInput(inputId,inputValue))

        const result = validateInput(inputId, inputValue)
        dispatchFormState({inputId, validationResult: result, inputValue})

    }, [dispatchFormState])


    useEffect(() => {
        if (error) {
            // Alert.alert("An Error Occurred ",error,[{text:"Okay"}])
            Alert.alert("An Error Occurred ", error)
        }

    }, [error])



    // State to control the visibility of the alert modal
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    // Function to show the alert modal
    const showAlert = () => setIsAlertVisible(true);
    // Function to hide the alert modal
    const hideAlert = () => setIsAlertVisible(false);

    const authHandler = useCallback(async () => {




        try {
            setIsLoading(true);


            // // Check if the email contains "@horizoncampus.edu.lk"
            // if (!formState.inputValues.email.includes("@horizoncampus.edu.lk")) {
            //     Alert.alert("Invalid Email", "Please use a Horizon campus email address.");
            //     setIsLoading(false);
            //     return;
            // }

            // Check if the email contains "@horizoncampus.edu.lk"
            if (!formState.inputValues.email.includes("@horizoncampus.edu.lk")) {
                // Show the alert modal if the email is invalid
                showAlert();
                Alert.alert("Invalid Email","The Email That You using is not a horizon campus ,Please Check It Again")
                setError("Not a Horizon Campus Emial")
                setIsLoading(false);
                return;
            }

            const action = signUp(
                formState.inputValues.firstName,
                formState.inputValues.lastName,
                formState.inputValues.email,
                formState.inputValues.password,
            )

            setError(null)
            await dispatch(action)


        } catch (error) {
            //    Handling Error
            console.log(error)
            setError(error.message)
            //IF There is error don't load Spinner
            setIsLoading(false);
        }

    }, [dispatch, formState])

    return (



        <>


            <View>
                <Text style={{   fontSize: 24, fontWeight: 'bold', marginBottom: 16,}}>Create an Account</Text>
            </View>

            <Input
                id={"firstName"}
                label={"First Name"}
                icon={"user-o"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                iconPack={FontAwesome}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["firstName"]}
            />

            <Input
                id={"lastName"}
                label={"Last Name"}
                icon={"user-o"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                iconPack={FontAwesome}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["lastName"]}
            />

            <Input
                id={"email"}
                label={"Email"}
                icon={"mail"}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                iconPack={Feather}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["email"]}
            />

            <Input
                id={"password"}
                label={"Password"}
                icon={"lock"}
                autoCapitalize={"none"}
                secureTextEntry
                iconPack={Feather}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["password"]}
            />

            {
                isLoading ?
                    <ActivityIndicator size={"small"} color={colors.primary}
                                       style={{marginTop: 10}}
                    />
                    :
                    <SubmitButton
                        title={"Sign Up"}
                        onPress={authHandler}
                        style={{marginTop: 20}}
                        disabled={!formState.formIsValid}
                    />
            }

        </>
    )
}


export default SignUpForm;