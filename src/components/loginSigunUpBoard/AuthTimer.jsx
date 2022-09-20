import React, { useEffect, useState, useRef } from 'react'

const AuthTimer = () => {
    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(0);
    const time = useRef(179);
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60 );
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current)
    })

    useEffect(() => {
        if(time.current <= 0){
            console.log("타임 아웃");
            clearInterval(timerId.current);
        }
    }, [sec])

    return(
        <div className="timer"
        style={{color: "#03C75A", fontSize: "14px", fontWeight: "600"}}
        >
            {min}분 {sec <= 10 ? `0` : sec}초
        </div>
    )
}

export default AuthTimer;