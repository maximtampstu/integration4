import '../reset.css';
import { Outlet, useNavigate, useLocation, useNavigation } from "react-router";
import { useState, useEffect } from "react";
import TouchCountDown from "../components/TouchCountDown/TouchCountDown";
import StartScreen from "../components/StartScreen/StartScreen";
import { getCurrentEvent, getEndDate, getMonthAndDayString } from '../services/events';
import KioskTopBar from '../components/KioskTopBar/KioskTopBar';
import Shedule from '../components/Shedule/Shedule';

export async function clientLoader() {
    const currentEvent = await getCurrentEvent();
    const endDate = await getEndDate(currentEvent.startDate)
    const endDateString = await getMonthAndDayString(endDate)

    return { endDateString, currentEvent };
}

const BaseLayoutKiosk = ({ loaderData = {} }) => {
    const { endDateString, currentEvent } = loaderData;
    const location = useLocation();
    const navigate = useNavigate();
    let navigation = useNavigation();

    const [unlocked, setUnlocked] = useState(false);
    const [secondsIdle, setSecondsIdle] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [touchCountDownSeconds, setTouchCountDownSeconds] = useState(10);

    const [phaseCountDown, setPhaseCountDown] = useState(false);

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
        <>
            <main className={location.pathname.slice(1).split('/')[1]} style={{width: "100vw", height:"100dvh", overflow: "hidden"}} onTouchStart={handleTouchScreen} onClick={handleTouchScreen}>
                <KioskTopBar />
                <Outlet />
                <Shedule currentEvent={currentEvent} />
                {showAlert && <TouchCountDown secondsLeft={touchCountDownSeconds} shown={showAlert} />}
                {!unlocked && <StartScreen handleUnlock={handleUnlock} endDate={endDateString} />}
            </main>
            {navigation.state === "loading" &&
                <div style={{ position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.45)", top: 0, left: 0, zIndex:1000}}></div>
            }
        </>
    );
};

export default BaseLayoutKiosk;