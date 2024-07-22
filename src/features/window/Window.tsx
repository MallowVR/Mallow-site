import { useState } from "react";
import { Window, moveWindow } from "./windowSlice";
import { useAppDispatch } from "../../app/hooks";
import { Counter } from "../counter/Counter";

var X = 0;
var Y = 0;


const WindowModule: React.FC<{ window: Window; }> = ({ window, }) => {
    const dispatch = useAppDispatch();

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
            const screenW = document.getElementById('screen')?.offsetWidth
            const screenH = document.getElementById('screen')?.offsetHeight
            dispatch(moveWindow({appTitle: window.appTitle, deltaX: (e.clientX - X), deltaY: (e.clientY - Y), maxX: screenW ? screenW : 0, maxY: screenH ? screenH : 0}))
            X = e.clientX
            Y = e.clientY
        }
         
    }

    return (
        <div className="window" style={{top:`${window.windowY}px`, left:`${window.windowX}px`, zIndex:`${window.focus}`, width:`${window.windowWidth - 8}px`, height:`${window.windowHeight - 8}px`}}>
            <div className="window-header" style={{backgroundColor:`${window.focus == 1000 ? 'blue' : 'grey'}`}} onMouseDown={(e) => WindowDrag(e)}>
                <p className="window-title">
                    {window.appTitle}
                </p>
                <div className="window-header-spacer"></div>
                <i className="fa-solid fa-window-minimize"></i>
                <i className="fa-solid fa-expand"></i>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="window-content">
                {window.appTitle == 'clock' && (
                    <>Clock Window</>
                )}
                {window.appTitle == 'counter' && (
                    <Counter />
                )}
            </div>
        </div>
    )
}

export default WindowModule
