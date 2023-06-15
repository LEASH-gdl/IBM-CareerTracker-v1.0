import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom"

import { UserContext } from '../contexts/UserContext.js';
import { USER_INFO } from '../data/apiRoutes'

/*
 * Here, a pending state is used due to token verification being asynchronous
 * When a token is retrieved from local storage, it must be verified with a simple
 * call to the app's backend. If the token is rejected by the backend, it means
 * that it has already expired and the user must login again.
 *
 * Since this call to the backend isn't instantaneous, we use the pending state
 * as a flag if we're waiting for something in the session retrieval process.
 *
 * The if-return statement below guarantees that nothing is rendered until we know
 * that a) There isn't any session information stored, b) The stored session has
 * expired, or c) The stored session is valid
 */

export default function SessionManager(props) {

	const userData = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const [pending, setPending] = useState(true);

	useEffect(() => {
		async function retrieveSession(storedSession){
		
			const response = await fetch(USER_INFO + storedSession.user.user_id, {
				method: "GET",
				headers: {
					"Authorization": storedSession.token
				}
			});
			
			if(response.status !== 401){
				//use the stored userData as the current userData
				userData.user = storedSession.user;
				userData.token = storedSession.token;
				userData.authenticated = true;
				
			} else {
				userData.expired = true;
				window.localStorage.removeItem("localUserData")
			}
			
			//Redirection, according to user type and session status
			
			//if current route is protected
			if (location.startsWith("/pages")){

				//and there's no active session, send to login page
				if(userData.authenticated === false){
					navigate("/login");
				} else
				
				//and the user doesn't have access to it, send them to their homepage
				if(location === "/pages/manager" && userData.user.user_type === 1){
					navigate("/pages/employee");
				}
			}
			
			setPending(false);
		}
		
		//Retrieve session stored locally
		let storedSession = JSON.parse(window.localStorage.getItem("localUserData"));
		
		if(storedSession !== null){
			retrieveSession(storedSession);
		} else {
		
			if (location.startsWith("/pages")){
				navigate("/login")
			}
			setPending(false);
		}
		
	},[userData, navigate, location]);
	
	if(!pending){
		return(
			<>
			{props.children}
			</>
		);
	} else {
		return (<></>);
	}
}
