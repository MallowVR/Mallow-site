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
    maximized: boolean,
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
            if(state.Windows.find((e) => e.appTitle == action.payload.newWindow.appTitle) == undefined)
                state.Windows.push(action.payload.newWindow)
                state.Windows.forEach((e) => {
                    if (e.appTitle == action.payload.newWindow.appTitle) {
                        e.focus = 1000
                        e.minimized = false
                    } else {
                        e.focus -= 1
                    }
                })
        },
        toggleMinimized(state, action: PayloadAction<{appTitle: string}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].minimized = !state.Windows[index].minimized
        },
        closeWindow(state, action: PayloadAction<{appTitle: string}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows.splice(index, 1)
        },
        toggleMaximized(state, action: PayloadAction<{appTitle: string}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].maximized = !state.Windows[index].maximized
        },
        toggleFocused(state, action: PayloadAction<{appTitle: string}>) {
            state.Windows.forEach((e) => {
                if (e.appTitle == action.payload.appTitle) {
                    e.focus = 1000
                    e.minimized = false
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
        resetPosition(state, action: PayloadAction<{appTitle: string, x: number, y: number}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            state.Windows[index].windowX = action.payload.x
            state.Windows[index].windowY = action.payload.y
        },
        resizeWindow(state, action: PayloadAction<{appTitle: string, X: number, Y: number}>) {
            const index = state.Windows.findIndex((e) => e.appTitle == action.payload.appTitle)
            if (!state.Windows[index].maximized) {
                state.Windows[index].windowWidth = action.payload.X
                state.Windows[index].windowHeight = action.payload.Y
            }
        }
    }
})

export const { initializeWindow, toggleMinimized, closeWindow, toggleMaximized, toggleFocused, moveWindow, resetPosition, resizeWindow } = windowSlice.actions

// export default windowSlice.reducer
