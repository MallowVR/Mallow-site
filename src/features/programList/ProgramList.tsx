import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleList } from "../programList/programListSlice";
import { initializeWindow, toggleFocused, toggleMinimized, Window } from "../window/windowSlice";
import './ProgramList.css'

export const ProgramList = () => {
    const dispatch = useAppDispatch();
    const programListOpen = useAppSelector((state) => state.programListSlice.open)
    const applist = ["clock", "counter"]

    return (
        <>
            {programListOpen ? (
                <div className="program-list-wrapper">
                    <div className="list-deco"></div>
                    <div className="program-list">
                        {applist.map((v, i) => (
                            <div className="list-item" onClick={() => dispatch(initializeWindow({newWindow: {appTitle: v, windowX: 100, windowY: 200, windowHeight: 300, windowWidth: 300, focus: 1000, minimized: false, maximized: false} }))}>
                                {v}
                            </div>
                        ))}
                    </div>
                </div>
            ) : ('')}
        </>
    )
}