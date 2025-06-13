import { useRef, useEffect } from 'react';
import './TouchCountDown.css';

const TouchCountDown = ({ secondsLeft, shown }) => {
    //https://www.turing.com/kb/canvas-components-in-react
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const percent = secondsLeft / 10;
        const startAngle = 1.5 * Math.PI;
        const endAngle = startAngle + (2 * Math.PI * percent);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(28, 28, 20, startAngle, endAngle);
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#E8E0D3";
        ctx.stroke();
    }, [secondsLeft]);

    return (
        <div className={shown ? "touch-count-down" : "visually-hidden"} >
            <div className="touch-count-down__content">
                <div className='touch-count-down__counter'>
                    <canvas ref={canvasRef} width="56" height="56" className='touch-count-down__progress'></canvas>
                    <div className='touch-count-down__counter-hidder'></div>
                    <p className='touch-count-down__counter-value'>{secondsLeft}</p>
                </div>
                <div className='touch-count-down__text'>
                    <p className='touch-count-down__head'>Touch</p>
                    <p className='touch-count-down__subhead'>To keep discovering!</p>
                </div>
            </div>
        </div>
    );
};

export default TouchCountDown;