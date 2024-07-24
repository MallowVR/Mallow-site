import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import './Clock.css'

export const Clock = () => {
    const dispatch = useAppDispatch();
    const mins = Array(60).fill(0)
    const seconds = Array(60).fill(0)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 200)

        return () => {
            clearInterval(timer)
        }
    })

    return (
        <div className="clock-app" id="clock-app">
            <div className="clock-wrapper">
                {seconds.map((e, i) => (
                    <div key={`sec.$(i)`} id={`sec.$(i)`} className={`clock-dot second ${(i <= date.getSeconds()) ? 'active' : ''}`} style={{transform:`rotate(${i*6}deg) translate(0%, -1450%)`}} />
                ))}
                {mins.map((e, i) => (
                    <div key={`min.$(i)`} id={`min.$(i)`} className={`clock-dot minute ${(i%5 == 0 || i <= date.getMinutes()) ? 'active' : ''}`} style={{transform:`rotate(${i*6}deg) translate(0%, -1560%)`}} />
                ))}
                <div className="current-time">{date.toTimeString().substring(0, 8)}</div>
            </div>
        </div>
    )
}