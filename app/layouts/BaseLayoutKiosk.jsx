import '../reset.css';
import { Outlet, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import TouchCountDown from "../components/TouchCountDown/TouchCountDown";
import StartScreen from "../components/StartScreen/StartScreen";
import { getCurrentEvent, getEndDate, getMonthAndDayString } from '../services/events';

export async function clientLoader() {
    const currentEvent = await getCurrentEvent();
    const endDate = await getMonthAndDayString(await getEndDate(currentEvent.startDate))

    return { endDate };
}

const BaseLayoutKiosk = ({loaderData}) => {
    const { endDate } = loaderData
    const location = useLocation();
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
                        navigate("/kiosk/home");
                    }
                } else {
                    setSecondsIdle(prev => prev + 1);
                    if (secondsIdle === 90000000) {
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
        <main className={location.pathname.slice(1).split('/')[1]} style={{width: "100vw", height:"100dvh", overflow: "hidden"}} onTouchStart={handleTouchScreen} onClick={handleTouchScreen}>
            <Outlet />
            {showAlert && <TouchCountDown secondsLeft={touchCountDownSeconds} shown={showAlert} />}
            {!unlocked && <StartScreen handleUnlock={handleUnlock} endDate={endDate} />}
        </main>
    );
};

export default BaseLayoutKiosk;