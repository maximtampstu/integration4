import '../reset.css';
import { Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import TouchCountDown from "../components/TouchCountDown/TouchCountDown";
import StartScreen from "../components/StartScreen/StartScreen";

const BaseLayout = () => {
    const navigate = useNavigate();
    const [unlocked, setUnlocked] = useState(false);
    const [secondsIdle, setSecondsIdle] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [touchCountDownSeconds, setTouchCountDownSeconds] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            if (unlocked) {
                if(showAlert){
                    setTouchCountDownSeconds(prev => prev - 1);
                    if (touchCountDownSeconds <= 1) {
                        setTouchCountDownSeconds(10);
                        setShowAlert(false);
                        setUnlocked(false);
                        navigate("/");
                    }
                } else {
                    setSecondsIdle(prev => prev + 1);
                    if (secondsIdle === 90) {
                        setShowAlert(true);
                        setSecondsIdle(0);
                        setTouchCountDownSeconds(10);
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [secondsIdle, showAlert, touchCountDownSeconds, unlocked]);

    const handleTouchScreen = () => {
        setSecondsIdle(0);
        setShowAlert(false);
    }

    const handleUnlock = () => {
        setUnlocked(true);
        setSecondsIdle(0);
        setShowAlert(false);
    };

    return (
        <div onTouchStart={handleTouchScreen} onClick={handleTouchScreen} style={{ height: "100vh"}}>
            <NavBar />
            <Outlet />
            {showAlert && <TouchCountDown secondsLeft={touchCountDownSeconds} shown={showAlert} />}
            {!unlocked && <StartScreen handleUnlock={handleUnlock} />}
        </div>
    );
};

export default BaseLayout;