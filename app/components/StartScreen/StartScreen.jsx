const StartScreen = ({ handleUnlock }) => {

    return (
        <div style={{ position: "absolute", top: "0", left: "0", textAlign: "center", width: "100%", height: "100%", backgroundColor: "white"}}>
            <h1>StartScreen</h1>
            <button onClick={handleUnlock}>Unlock</button>
        </div>
    );
};

export default StartScreen;