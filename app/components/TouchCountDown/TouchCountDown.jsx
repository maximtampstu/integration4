import { useRef, useEffect } from 'react';
import './TouchCountDown.css';

const TouchCountDown = ({ secondsLeft, shown }) => {
    //https://www.turing.com/kb/canvas-components-in-react
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const radius = 100;
        const centerX = 70;
        const centerY = 70;
        const percent = secondsLeft / 10;
        const startAngle = 1.25 * Math.PI;
        const endAngle = startAngle + 2 * Math.PI * percent;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 120;
        ctx.stroke();
    }, [secondsLeft]);

    return (
        <div className={shown ? "touch-count-down" : "visually-hidden"} >
            <div className="touch-count-down__content">
                <div className='touch-count-down__counter'>
                    <canvas ref={canvasRef} width="140" height="140" className='touch-count-down__progress'></canvas>
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