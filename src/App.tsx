import "./App.css"
import { useAppDispatch } from "./app/hooks"
import { Taskbar } from "./features/taskbar/Taskbar"
import Windows from "./features/window/Windows"
import { initializeWindow } from "./features/window/windowSlice"
import logo from "./logo.svg"

var i = 0

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Windows />
        <Taskbar />
      </header>
    </div>
  )
}

export default App
