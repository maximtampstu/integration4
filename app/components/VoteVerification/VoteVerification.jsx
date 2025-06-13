import { useState } from "react";
import { Link, Form, useFetcher } from "react-router";
import emailjs from 'emailjs-com';

const VoteVerification = ({ state, themeVotes, changeState, themeId, ClosePopup }) => {
    const addresses = ["@gmail.com", "@outlook.com", "@icloud.com", "@yahoo.com", "@hotmail.com", "@telenet.be", "@mail.com"]
    const fetcher = useFetcher();

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [code, setCode] = useState("")
    const [verifyCode, setVerifyCode] = useState("")

    const handleClickBack = (type) => {
        setEmail("")
        setError("")
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
        const hasVoted = themeVotes.some(vote => vote.userEmail === email);

        if(hasVoted){
            setError("You already have voted")
        } else {
            setError("")
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            setCode(generatedCode)
            changeState("code")
            console.log(generatedCode)
            sendVerificationEmail(email, generatedCode)
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

    const handleSubmitVerifyCode = (e) => {
        e.preventDefault()
        if(verifyCode === code){
            fetcher.submit({ email, themeId }, { method: "post" });
        } else {
            setError("wrong")
        }
    }

    return (
        <div style={{ padding: "1rem", background: "#eee", width: "max-content" }}>
            <button type="button" onClick={() => handleClickBack("close")} >X</button>
            {state === "email" ? (
                <form onSubmit={handleSubmitEmail}>
                    <label>email<input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@gmail.com" required /></label>
                    <br />
                    {error}
                    <br />
                    {addresses.map(addres => <button type="button" key={addres} onClick={() => setEmail(email + addres)} >{addres}</button>)}
                    <br />
                    <button type="button" onClick={() => setEmail("")} >Clear</button>
                    <br />
                    <button type="button" onClick={() => handleClickBack("close")} >Cancel</button>
                    <button type="submit">Send Code</button>
                </form>
            ) : (
                <form onSubmit={handleSubmitVerifyCode}>
                    <label>code<input type="text" inputMode="numeric" pattern="[0-9]*" name="verifyCode" minLength={6} maxLength={6} value={verifyCode} onChange={(e) => /^\d*$/.test(e.target.value) && setVerifyCode(e.target.value)} placeholder="######" required/></label>
                    <br />
                    <button type="button" onClick={() => sendVerificationEmail(email, generatedCode)} >Resent code</button>
                    {error}
                    <br />
                        <button type="button" onClick={() => handleClickBack("back")} >Change Email</button>
                    <button type="submit">Verify</button>
                </form>
            )}
        </div>
    );
};

export default VoteVerification;
