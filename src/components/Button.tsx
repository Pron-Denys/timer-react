import React, { useState } from "react"

type ButtonProps = {
    title: string;
    clickEvent: (toggle?: boolean) => void;
};

type ButtonState = {
    title: string;
    toggle: boolean;
};

function Button(props: ButtonProps) {
    const [state, setState] = useState<ButtonState>({title: props.title, toggle: true });

    const start = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.toString();
        props.clickEvent(state.toggle);
        setState((s) => ({
            title: s.title,
            toggle: !s.toggle
        }));
    }

    return (
        <div>
            <button onClick={start}>{state.title}</button>
        </div>
    )
}

export default Button;