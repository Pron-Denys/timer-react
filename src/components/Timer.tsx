import "./Timer.css"
import { useState, useRef } from "react"
import Swal from "sweetalert2"
import SecondsField from "./SecondsField";
import Button from "./Button";

function Timer() {
    const [counter, setCounter] = useState("00:00:00");

    const countdown = useRef<any>(null);
    const hours = useRef<any>("00");
    const minutes = useRef<any>("00");
    const seconds = useRef<any>("00");

    const interval = useRef<any>(null);

    const start = () => {      
        const number = Number(countdown.current?.value);
        if (number >= 0)
            time(number);
    };

    const stop = (toggle?: boolean) => {
        if (toggle) {
            clear();
        } else {
            interval.current = setInterval(timer, 1000);
        }
    };

    const reset = () => {
        hours.current = "00";
        minutes.current = "00";
        seconds.current = "00";
        setCounter("00:00:00");
        clear();
        countdown.current?.reset();
    };

    const clear = () => {
        if (interval.current !== null) {
            clearInterval(interval.current);
        }
    };

    const timer = () => {
        if (Number(seconds.current) - 1 >= 0)
            seconds.current = String(Number(seconds.current) - 1).length <= 1 ? `0${Number(seconds.current) - 1}` : `${Number(seconds.current) - 1}`;
        if (Number(seconds.current) === 0 && Number(minutes.current) - 1 >= 0) {
            seconds.current = `60`;
            minutes.current = String(Number(minutes.current) - 1).length <= 1 ? `0${Number(minutes.current) - 1}` : `${Number(minutes.current) - 1}`;
        }
        if (Number(minutes.current) === 0 && Number(hours.current) - 1 >= 0) {
            minutes.current = `60`;
            seconds.current = `60`;
            hours.current = String(Number(hours.current) - 1).length <= 1 ? `0${Number(hours.current) - 1}` : `${Number(hours.current) - 1}`;
        }
        if (Number(seconds.current) === 0) {
            clear();
            Swal.fire({
                icon: "info",
                title: "Time's up!",
                text: "Your countdown finished!",
                confirmButtonText: "OK",
                confirmButtonColor: "blue"
            });
        }
        setCounter(`${hours.current}:${minutes.current}:${seconds.current}`);
    };

    const time = (tempSeconds: number) => {
        let tempHours = 0;
        let tempMinutes = 0;
        if (tempSeconds >= 3600) {
            while (true) {
                tempSeconds = tempSeconds - 3600;
                tempHours += 1;
                if (tempSeconds < 3600) {
                    break;
                }
            }
        }
        if (tempSeconds >= 60) {
            while (true) {
                tempSeconds = tempSeconds - 60;
                tempMinutes += 1;
                if (tempSeconds < 60) {
                    break;
                }
            }
        }
        hours.current = tempHours.toString().length <= 1 ? `0${tempHours}` : tempHours.toString();
        minutes.current = tempMinutes.toString().length <= 1 ? `0${tempMinutes}` : tempMinutes.toString();
        seconds.current = tempSeconds.toString().length <= 1 ? `0${tempSeconds}` : tempSeconds.toString();
        interval.current = setInterval(timer, 1000);
    };

    return (
        <div className="conteiner">
            <h1>Timer</h1>
            <SecondsField ref={countdown} value=""/>
            <div className="timer">
                <p>{counter}</p>
            </div>
            <div className="buttons">
                <Button title="Start" clickEvent={start} />
                <Button title="Stop" clickEvent={stop}/>
                <Button title="Reset" clickEvent={reset}/>
            </div>
        </div>
    )
}

export default Timer;