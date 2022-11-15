import {createSlice} from "@reduxjs/toolkit";



type Init = {
    from:string,
    where:string,
    toDate:string,
    backDate:string
}
const init:Init  = {
    from:'',
    where:'',
    toDate:'',
    backDate:''
}
const dataStoreSlice = createSlice({
    name:'dataStore',
    initialState:{storage:init},
    reducers : {
        pushData : (state, action:{type:string,payload:Init}) => {
            state.storage = action.payload
        }
    }
})

export const {pushData} = dataStoreSlice.actions

export default dataStoreSlice.reducer