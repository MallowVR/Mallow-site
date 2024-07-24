import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface ProgramListSliceState {
    open: boolean,
}

const initialState: ProgramListSliceState = {
    open: false,
}

export const programListSlice = createAppSlice({
    name: 'programListSlice',
    initialState,
    reducers: {
        toggleList(state) {
            state.open = !state.open
        }
    }
})

export const { toggleList } = programListSlice.actions
