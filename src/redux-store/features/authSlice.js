import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    wpmArray: [],
    wpm :0,
    givenString: '',
    writenString: [],
    secondsArray: [],
    typeTime:'',
    accuracy: 0,
    gameType: 'normal',
    mistakesArray: [],
    place: '1/4',
}

export const gameDataSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        addGameData:(state, action)=>{
                return action.payload
        },
 
    }

})

export const {addGameData} = gameDataSlice.actions
export default gameDataSlice.reducer
