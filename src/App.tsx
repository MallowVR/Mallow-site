import "./App.css"
import { useAppDispatch } from "./app/hooks"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import Windows from "./features/window/Windows"
import { initializeWindow } from "./features/window/windowSlice"
import logo from "./logo.svg"

var i = 0

const App = () => {
  const dispatch = useAppDispatch()
  if (i == 0) {
    dispatch(initializeWindow({newWindow: {appTitle: 'clock', windowX: 100, windowY: 200, windowHeight: 300, windowWidth: 300, focus: 1000, minimized: false} }))
    dispatch(initializeWindow({newWindow: {appTitle: 'counter', windowX: 120, windowY: 220, windowHeight: 300, windowWidth: 300, focus: 1000, minimized: false} }))
    i++
  }

  return (
    <div className="App">
      <header className="App-header">
        <Windows />
      </header>
    </div>
  )
}

export default App
