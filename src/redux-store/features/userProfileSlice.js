import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    nickName:0,
    userName:'',
    email:'',
    password:'',
    avtar:'',
    awards:'',

}

export const userDataSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        addGameData:(state, action)=>{
        return {...action.payload}
        },
 
    }

})

export const {addGameData} = userDataSlice.actions
export default userDataSlice.reducer
