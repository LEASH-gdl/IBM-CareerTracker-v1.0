import React from "react";
import { useContext } from 'react';
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom"

import {
	TextInput,
    Form,
    Button,
    PasswordInput,
    Link,
    InlineNotification
} from '@carbon/react';

import {
	Login16,
	ArrowLeft16
} from '@carbon/icons-react';

import * as apiRoutes from '../data/apiRoutes'
import '../css/login.css';

import { UserContext } from '../contexts/UserContext.js';

export default function Login() {

	const userData = useContext(UserContext);
	const navigate = useNavigate();
	const [message, setMessage] = React.useState("");

	async function login(loginData) {
		const response = await fetch(apiRoutes.LOGIN, {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify(loginData)
		});
		
		//user type 2 is manager
		switch (response.status) {
			case 200:
				response.json().then((data) => {
					userData.user = data.user;
					userData.token = data.jwt;
					userData.authenticated = true;
					userData.expired = false;
					
					window.localStorage.setItem('localUserData', JSON.stringify(userData));
					
					if (userData.user.user_type === 1){
						navigate("/pages/employee");
					} else if (userData.user.user_type === 2){
						navigate("/pages/manager");
					}
				});
				break;
			case 400:
				setMessage("Incorrect credentials");
				break;
			default:
				setMessage("Error verifying credentials");
				break;
		}
	}

    const handleSubmit = (event) => {
    
    	event.preventDefault();
    
    	var loginData = {
    		email: event.target.inpEmail.value
    	}
    	
        let password = event.target.inpPassword.value
        
        bcrypt.hash(password, '$2a$10$CwTycUXWue0Thq9StjUM0u', function(err, hash) {
            //what to do once the hash is generated
            //the static value is the salt
            
            loginData.password = hash;
            //console.log(hash);
            
            login(loginData);
        });
    } 

    return(
        <div className="formContainer">
        	<div className="formWindow">
        	<Form onSubmit={handleSubmit}>
        		<h1>Log In with IBM</h1>
        		
        		<InlineNotification
        			style={{display: (message.length === 0) ? "None": "Block", alignSelf: "center"}}
        			kind="error"
        			hideCloseButton={true}
        			title={message}
        		/>
        		
        		<InlineNotification
        			style={{display: (userData.expired) ? "Block" : "None", alignSelf: "center"}}
        			kind="info"
        			hideCloseButton={true}
        			title="Your session has expired"
        			subtitle="Please login again"
        		/>
        		
        		<TextInput id="inpEmail" labelText="Email" helperText="Use your IBM account"></TextInput>
                <PasswordInput id="inpPassword" labelText="Password"></PasswordInput>
                <div className="separator">
		            <Link href="/"><ArrowLeft16 style={{marginRight:'0.5em'}}/>Go back</Link>
		            <Button id="btnSubmit" type="submit" renderIcon={Login16}>
		                Log In
		            </Button>
                </div>
        	</Form>
        	</div>
        </div> 
    );
}
