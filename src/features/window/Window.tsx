import { useState } from "react";
import { Window, closeWindow, moveWindow, resetPosition, resizeWindow, toggleFocused, toggleMaximized, toggleMinimized } from "./windowSlice";
import { useAppDispatch } from "../../app/hooks";
import { Counter } from "../counter/Counter";
import { Clock } from "../clock/Clock";

var X = 0;
var Y = 0;


const WindowModule: React.FC<{ window: Window; }> = ({ window, }) => {
    const dispatch = useAppDispatch();
    const screen = document.getElementById('screen')
    const screenW = document.getElementById('screen')?.offsetWidth
    const screenH = document.getElementById('screen')?.offsetHeight

    const WindowDrag = (e: React.MouseEvent) => {
        var released = false
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
        X = e.clientX
        Y = e.clientY
        e.preventDefault()

        document.onmousemove = (e) => {
            if(window.maximized != true) {
                dispatch(moveWindow({appTitle: window.appTitle, deltaX: (e.clientX - X), deltaY: (e.clientY - Y), maxX: screenW ? screenW : 0, maxY: screenH ? screenH : 0}))
                X = e.clientX
                Y = e.clientY
            }
        }
         
    }

    if(window.minimized) {
        return (<></>);
    }

    return (
        <div id={window.appTitle} className="window" style={window.maximized ? {top:`0px`, left:`0px`, zIndex:`${window.focus}`, width:`${(screenW || 0) - 8}px`, height:`${(screenH || 0) - 8}px`} : {top:`${window.windowY}px`, left:`${window.windowX}px`, zIndex:`${window.focus}`, width:`${window.windowWidth - 8}px`, height:`${window.windowHeight - 8}px`, fontSize:`${window.windowHeight > window.windowWidth ? window.windowWidth : window.windowHeight}px`}} 
            onMouseUp={(e) => {
                const win = document.getElementById(window.appTitle)
                if(win?.offsetWidth != window.windowWidth || win?.offsetHeight != window.windowHeight) {
                    dispatch(resizeWindow({appTitle: window.appTitle, X: win?.offsetWidth || 0, Y: win?.offsetHeight|| 0}))
                    // document.getElementById(window.appTitle)?.style.setProperty('font-size', `${(win?.offsetHeight || 0) > (win?.offsetWidth || 0) ? (win?.offsetWidth || 0) : (win?.offsetHeight || 0)}`)
                }
            }} 
            onMouseDownCapture={(e) => {
                dispatch(toggleFocused({appTitle: window.appTitle}))
            }}>
            <div className="window-header" style={{backgroundColor:`${window.focus == 1000 ? '#010081' : '#a1a1a1'}`}} onMouseDown={(e) => WindowDrag(e)}>
                <p className="window-title">
                    {window.appTitle}
                </p>
                <div className="window-header-spacer"></div>
                <i className="fa-solid fa-window-minimize" onClick={(e) => dispatch(toggleMinimized(window))} ></i>
                <i className="fa-solid fa-expand" onClick={(e) => dispatch(toggleMaximized(window))}></i>
                <i className="fa-solid fa-xmark" onClick={(e) => dispatch(closeWindow(window))}></i>
            </div>
            <div className="window-content">
                {window.appTitle == 'clock' && (
                    <Clock />
                )}
                {window.appTitle == 'counter' && (
                    <Counter />
                )}
            </div>
        </div>
    )
}

export default WindowModule
