import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBreakpoint: ""
}

const BreakpointSlice = createSlice({
    name: "breakpointSlice",
    initialState,
    reducers: {
        updateBreakpoint(state, {payload}){
            state.currentBreakpoint = payload
        }
    }
})

export const {updateBreakpoint} = BreakpointSlice.actions;
export default BreakpointSlice;