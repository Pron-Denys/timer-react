import React, {useState, useImperativeHandle, forwardRef} from "react"

type SecondsFieldHandle = {
    value: string;
    reset: () => void;
};

type SecondsFieldState = {
    value: string;
};

const SecondsField = forwardRef<SecondsFieldHandle, SecondsFieldState>(({value}: SecondsFieldState, ref) => {
    const [seconds, setSeconds] = useState<SecondsFieldState>({ value: value});

    const changeCountdown = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeconds({value: e.target.value});
    };

    const resetSeconds = () => {
        setSeconds({value: ""});
    };

    useImperativeHandle(ref, () => ({
        value: seconds.value,
        reset: resetSeconds
    }));

    return (
        <div>
            <input type="number" value={seconds.value} onChange={changeCountdown} />
        </div>
    )
});

export default SecondsField;