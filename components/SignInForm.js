import React, {useCallback, useReducer, useEffect, useState} from "react";
import {ActivityIndicator, Alert, View} from "react-native";
import Input from "./Input";
import {Feather, FontAwesome} from "@expo/vector-icons";
import SubmitButton from "./SubmitButton";
import {validateEmail, validatePassword, validateString} from "../utils/validationConstraints";
import {validateInput} from "../utils/actions/FormActions";
import {reducer} from "../utils/reducers/formReducer";
import {signIn, signUp} from "../utils/actions/authActions";

import {useDispatch} from "react-redux";
import colors from "../constants/colors";
import BeautifulInput from "./NewInput";
import BeautifulSubmitButton from "./SubmitButtonNew";

//TODO only to test app without functionality
const isTestMode = false;

const initialState = {

    //TODO here this has 2 inputs
    //1st To check Form is valid 2-->entire form is valid
    inputValues: {
        email: isTestMode ? "race123@gmail.com" : "",
        password: isTestMode ? "password" : ""

    },
    inputValidates: {
        email: isTestMode,
        password: isTestMode,
    },
    formIsValid: isTestMode
}

const SignInForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    //Creating a dispatch
    const dispatch = useDispatch();

    //state foe handling error
    const [error, setError] = useState()

    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangeHandler = useCallback((inputId, inputValue) => {

        const result = validateInput(inputId, inputValue)

        dispatchFormState({inputId, validationResult: result, inputValue})

    }, [dispatchFormState])


    useEffect(() => {
        if (error) {
            Alert.alert("An Error Occurred ", error)
        }

    }, [error])


    const authHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            const action = signIn(
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
            <Input
                id={"email"}
                label={"Email"}
                icon={"mail"}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                iconPack={Feather}
                onInputChange={inputChangeHandler}
                initialValue={formState.inputValues.email}
                errorText={formState.inputValidates["email"]}

            />

            {/*<BeautifulInput/>*/}

            <Input
                id={"password"}
                label={"Password"}
                icon={"lock"}
                autoCapitalize={"none"}
                secureTextEntry
                iconPack={Feather}
                onInputChange={inputChangeHandler}
                initialValue={formState.inputValues.password}
                errorText={formState.inputValidates["password"]}
            />

            {
                isLoading ?
                    <ActivityIndicator size={"small"} color={colors.primary}
                                       style={{marginTop: 10}}
                    />
                    :
                    <SubmitButton
                        title={"Login"}
                        onPress={authHandler}
                        style={{marginTop: 20}}
                        disabled={!formState.formIsValid}
                    />



            }


        </>
    )
}

export default SignInForm;