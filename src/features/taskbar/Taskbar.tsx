import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { ProgramList } from "../programList/ProgramList";
import { toggleList } from "../programList/programListSlice";
import { toggleFocused, toggleMinimized, Window } from "../window/windowSlice";
import './Taskbar.css'

export const Taskbar = () => {
    const dispatch = useAppDispatch();
    const windows = useAppSelector((state) => state.windowSlice.Windows)
    const listOpen = useAppSelector((state) => state.programListSlice.open)

    const clickWindow = (w: Window) => {
        if(w.focus != 1000 || w.minimized) {
            dispatch(toggleFocused(w))
        } else {
            dispatch(toggleMinimized(w))
        }
    }

    return (
        <div className={`taskbar`} id='taskbar'>
            <ProgramList />
            <div className={`start-button ${listOpen ? 'focus' : ''}`} onClick={() => dispatch(toggleList())}>
                <i className="fa-solid fa-bolt"></i> Programs
            </div>
            {windows.map((w, index) => (
                <div className={`taskbar-button ${(w.focus == 1000 && !w.minimized) ? 'focus' : ''}`} onClick={(e) => {e.preventDefault; clickWindow(w)}}>
                    {w.appTitle}
                </div>
            ))}
        </div>
    )
}