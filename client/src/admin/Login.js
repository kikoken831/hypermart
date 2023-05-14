import React, {useState, useRef} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import {useNavigate} from "react-router-dom";
import {Messages} from "primereact/messages";
import API_URL from "../common/APIurl";
import {useSignIn} from "react-auth-kit";

export const Login = () => {
    const [input, setInput] = useState({});
    let messages = useRef(null);
    const signIn = useSignIn();
    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value} = event.target;
        setInput((prevValue) => {
            return {...prevValue, [name]: value};
        });
    }

    function submit() {
        if (!input.email || !input.password) {
            messages.current.show({
                severity: "error",
                summary: "Please enter your email and password",
            });
            return;
        }
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: input.email, password: input.password}),
        };
        try {
            fetch(`${API_URL}/api/login`, requestOptions).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        signIn({
                            token: data.token,
                            expiresIn: data.expiresIn,
                            tokenType: data.tokenType,
                            authState: data.authState,
                        });
                        navigate("view");
                    });
                } else {
                    messages.current.show({
                        severity: "error",
                        summary: "Invalid Credentials",
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>

            <div className="surface-card surface-ground p-3 shadow-2 border-round w-full lg:w-3">
                <Messages className="p4" ref={messages}></Messages>
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">
                        MiniMart Admin Page
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">
                            Email
                        </label>
                        <InputText
                            type="text"
                            className="mb-3"
                            name="email"
                            onChange={handleChange}
                            maxLength={255}
                        />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">
                            Password
                        </label>
                        <Password
                            className="mb-3"
                            name="password"
                            onChange={handleChange}
                            maxLength={50}
                            toggleMask
                            feedback={false}
                        />
                        <Button
                            label="Sign In"
                            icon="pi pi-user"
                            className="w-full"
                            onClick={submit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};