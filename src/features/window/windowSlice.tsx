import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export type Window = {
    appTitle: string,
    windowX: number,
    windowY: number,
    windowWidth: number,
    windowHeight: number,
    focus: number,
    minimized: boolean,
}

export interface WindowSliceState {
    Windows: Array<Window>,
}

const initialState: WindowSliceState = {
    Windows: []
}

export const windowSlice = createAppSlice({
    name: 'windowSlice',
    initialState,
    reducers: {
        initializeWindow(state, action: PayloadAction<{newWindow: Window}>) {
            state.Windows.push(action.payload.newWindow)
        },
        toggleMinimized(state, action: PayloadAction<{appTitle: string}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].minimized = !state.Windows[index].minimized
        },
        toggleFocused(state, action: PayloadAction<{appTitle: string}>) {
            const index = state.Windows.forEach((e) => {
                if (e.appTitle == action.payload.appTitle) {
                    e.focus = 1000
                } else {
                    e.focus -= 1
                }
            })
        },
        moveWindow(state, action: PayloadAction<{appTitle: string, deltaX: number, deltaY: number, maxX: number, maxY: number}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].windowX += action.payload.deltaX
            state.Windows[index].windowY += action.payload.deltaY

            const maxX = action.payload.maxX - state.Windows[index].windowWidth
            const maxY = action.payload.maxY - state.Windows[index].windowHeight

            if (state.Windows[index].windowX < 0) {
                state.Windows[index].windowX = 0
            }
            if (state.Windows[index].windowY < 0) {
                state.Windows[index].windowY = 0
            }
            if(state.Windows[index].windowX > maxX) {
                state.Windows[index].windowX = maxX
            }
            if(state.Windows[index].windowY > maxY) {
                state.Windows[index].windowY = maxY
            }
        },
        resizeWindow(state, action: PayloadAction<{appTitle: string, deltaX: number, deltaY: number}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].windowWidth += action.payload.deltaX
            state.Windows[index].windowHeight += action.payload.deltaY
            if (state.Windows[index].windowWidth < 300) {
                state.Windows[index].windowWidth = 300
            }
            if (state.Windows[index].windowHeight < 300) {
                state.Windows[index].windowHeight = 300
            }
        }
    }
})

export const { initializeWindow, toggleMinimized, toggleFocused, moveWindow, resizeWindow } = windowSlice.actions

// export default windowSlice.reducer
