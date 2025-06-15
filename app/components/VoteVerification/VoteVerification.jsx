import { useState, useRef } from "react";
import { Link, Form, useFetcher } from "react-router";
import emailjs from 'emailjs-com';
import "./VoteVerification.css"

const VoteVerification = ({ state, themeVotes, changeState, themeId, ClosePopup, votableThemes }) => {
    const addresses = ["@gmail.com", "@outlook.com", "@icloud.com", "@yahoo.com", "@hotmail.com", "@telenet.be", "@mail.com"]
    const fetcher = useFetcher();
    const inputRef = useRef(null);

    const [email, setEmail] = useState("")
    const [error, setError] = useState("/")
    const [code, setCode] = useState("")
    const [verifyCode, setVerifyCode] = useState("")

    const handleClickBack = (type) => {
        setEmail("")
        setError("/")
        setCode("")
        setVerifyCode("")
        if(type === "close"){
            ClosePopup()
        }
        if (type === "back") {
            changeState("email")
        }
    }

    const handleSubmitEmail = (e) => {
        e.preventDefault()

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setError("Email requierd")
            return;
        }
        
        const hasVoted = themeVotes.some(vote => vote.userEmail === email.toLowerCase());

        if(hasVoted){
            setError("You already have voted")
            setEmail("")
        } else {
            setError("/")
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            setCode(generatedCode)
            changeState("code")
            console.log(generatedCode)
            sendVerificationEmail(email.toLowerCase(), generatedCode)
        }
    }

    const sendVerificationEmail = (email, code) => {
        emailjs.send(
            'service_abby',
            'template_54sdf8u',
            {
                email: email,
                code: code,
            },
            'Satxo3KS8iiEr06Bj' // public key from EmailJS
        )
        //for sending the mail I used chatGPT becaus I could not find how I needed to send the mail via code
        .then((result) => {
            console.log("Email sent:", result.text);
        }, (error) => {
            console.log("Failed to send:", error.text);
        });
        
    };

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setVerifyCode(value);
    };

    const handleSubmitVerifyCode = (e) => {
        e.preventDefault()
        if (verifyCode === ""){
            setError("Pleas fill in your verification code")
        } else if (verifyCode.length !== 6){
            setError("This code contains 6 digits")
        } else if(verifyCode === code){
            fetcher.submit({ email: email.toLowerCase(), themeId }, { method: "post" });
        } else {
            setError("The code you entered is incorrect")
        }
    }

    return (
        <div onClick={() => handleClickBack("close")}  className="vote-verification">
            <div onClick={(e) => e.stopPropagation()} className="vote-verification__content">
                <button type="button" className="kiosk-button kiosk-button--sec kiosk-button--small" onClick={() => handleClickBack("close")} >X</button>
                {state === "email" ? (
                    <form className="vote-email" onSubmit={handleSubmitEmail}>
                        <div className="vote-email__head">
                            <div className="vote-email__choice">
                                <p>You picked</p>
                                <h3>{votableThemes.find(theme => theme.id === Number(themeId)).name}</h3>
                            </div>
                            <div className="vote-email__extra">
                                <p className="vote-email__info">Enter your email to confirm your vote</p>
                                <p className="vote-email__why">*We ask for your email to avoid spam and make sure every vote counts from a real person, like you!</p>
                            </div>
                        </div>
                        <div className="vote-email__content">
                            <label><div><span>Email</span><span style={{ color: error === "/" ? "transparent" : "var(--color-lau-yellow)"}} className="vote-email__error">{error}</span></div><input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value); setError("/")}} placeholder="john.doe@gmail.com" /></label>
                            <ul>
                                {addresses.map(addres => <li><button type="button" key={addres} onClick={() => setEmail(email + addres)} >{addres}</button></li>)}
                                <li><button className="vote-email__clear" type="button" onClick={() => setEmail("")} >Clear</button></li>
                            </ul>
                            <div className="vote-verification__buttons">
                                <button className="kiosk-button kiosk-button--sec" type="button" onClick={() => handleClickBack("close")} >Cancel</button>
                                <button className="kiosk-button"type="submit">Send Code</button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form className="vote-code" onSubmit={handleSubmitVerifyCode}>
                        <div className="vote-code__top">
                            <div className="vote-code__head">
                                <h3>Verify your email</h3>
                                <p>We sent a 6-digit code to <span>{email}</span> Enter it below to confirm your vote.</p>
                            </div>
                            <div className="vote-code__mid">
                                <div>
                                    <input type="text" ref={inputRef} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]*" name="verifyCode" maxLength={6} value={verifyCode} onChange={handleCodeChange} placeholder="######"/>
                                    <ul>
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <li key={i}>
                                                {verifyCode[i] || '_'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="button" onClick={() => sendVerificationEmail(email, code)} >Resent code</button>
                            </div>
                        </div>
                        <p style={{ color: error === "/" ? "transparent" : "var(--color-lau-yellow)" }} className="vote-code__error">{error}</p>
                        <div className="vote-verification__buttons">
                            <button className="kiosk-button kiosk-button--sec" type="button" onClick={() => handleClickBack("back")} >Change Email</button>
                            <button className="kiosk-button" type="submit">{fetcher.state === "loading" ? "Verifying..." : "Verify"}</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default VoteVerification;
