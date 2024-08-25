import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [isRunning, setIsRunnning] = useState(false);

    const handleStart = () => {
        setIsRunnning(true);
    }
    const handlePause = () => {
        setIsRunnning(false);
    }
    const Reset = () => {
        setIsRunnning(false);
        setMinutes(0);
        setSeconds(0);
    }

    useEffect(() => {
        let timer = null;

        if (isRunning) {
            timer = setInterval(function () {

                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        if (minutes === 0) {
                            handlePause();
                            return 0;
                        } else {
                            setMinutes(prevMinutes => prevMinutes - 1);
                            return 59;
                        }
                    }
                    return prevSeconds - 1;

                })

            }, 1000);

        }
        return () => {
            clearInterval(timer);
        }

    }, [isRunning]);


    return (
        <div>
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            <input type='number' value={seconds} onChange={(e) => setSeconds(e.target.value)} />
            <div>Minutes :{minutes} : seconds :{seconds}</div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Stop</button>
            <button onClick={Reset}>Reset</button>
        </div>

    )
}

export default Clock