import { createSlice, } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played
const initialState = {
    wpm :0,
    accuracy: 0,
    userName: '',
    finishingTime: '',
    place: '1/4',
    carPosition:''
}

export const socketShareDatasSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        addUserShareData:(state, action)=>{

                return  {...state, ...action.payload}
        },
 
    }

})

export const {addUserShareData} = socketShareDatasSlice.actions
export default socketShareDatasSlice.reducer
