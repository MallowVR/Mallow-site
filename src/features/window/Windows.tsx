import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import WindowModule from "./Window"
import './Window.css'

const Windows = () => {
    const state = useAppSelector((state) => state.windowSlice)
    return (
        <div className="window-wrapper" id="screen">
            {state.Windows.map((w, index) => (
                <WindowModule window={w} key={w.appTitle} />
            ))}
        </div>
    )
}

export default Windows
