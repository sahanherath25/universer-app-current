export const reducer=(state,action)=>{

    const {validationResult,inputId,inputValue}=action;

    console.log(validationResult);

    const updatedValues={
        ...state.inputValues,
        [inputId]:inputValue
    }

    const updatedValidities={
        ...state.inputValidates,
        [inputId]:validationResult
    }

    let updatedFormIsValid=true;
    //Here we're looping over each of values in form

    for(const key in updatedValidities){

        // TODO Here we're checking each of input field and Returning th Updated State

        if(updatedValidities[key]!== undefined){
            updatedFormIsValid =false;
            break;
        }
    }
    return {
        inputValidates: updatedValidities,
        inputValues:updatedValues,
        formIsValid:updatedFormIsValid
    };
}