import { React } from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js';
import News from '../components/news/News';

import ManagerGraphs from '../components/ManagerGraphs';

export default function ManDashboard(){

	const userData = useContext(UserContext);
	const navigate = useNavigate();
	
	if (userData.user.user_type !== 2){
		navigate("/pages/employee");
	}
	
    return(
        <>
        	<ManagerGraphs/>
        </> 
    );
}