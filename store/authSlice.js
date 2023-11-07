import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:null,
        userData:null,
        didTryAutoLogin:false,
    },
    reducers:{
        authenticate:(state, action)=>{
            console.log("payload",payload)
            const {payload}=action;
            state.token=payload.token;
            state.userData=payload.userData;
            //When user login we set auto login
            state.didTryAutoLogin=true;
            console.log(state)
        },
        setDidTryAutoLogin:(state, action)=>{
            state.didTryAutoLogin=true;
        },
        logout:(state, action)=>{
            state.token=null;
            state.userData=null;
            state.didTryAutoLogin=false;
        },
        updateLoggedInUserData:(state, action)=>{
            state.userData={...state.userData,...action.payload.newData}
        }
    }
})
export const authenticate=authSlice.actions.authenticate;
export const setDidTryAutoLogin=authSlice.actions.setDidTryAutoLogin;
export const logout=authSlice.actions.logout;
export const updateLoggedInUserData=authSlice.actions.updateLoggedInUserData;
export default authSlice.reducer;