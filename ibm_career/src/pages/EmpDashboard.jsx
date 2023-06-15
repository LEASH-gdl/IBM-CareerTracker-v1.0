import { React } from "react";
import { useContext, useEffect, useState, useCallback  } from 'react';

import EmployeeCertifications from '../components/EmployeeCertifications';
import EmployeeGraphs from '../components/EmployeeGraphs';
import News from '../components/news/News'
import { UserContext } from '../contexts/UserContext.js';
import {CERTIFICATIONS} from '../data/apiRoutes.js';

export default function EmpDashboard(){

	const [certifications, setCertifications] = useState({});
	const userData = useContext(UserContext);

	const getCertifications = useCallback( async() => {
		const response = await fetch(CERTIFICATIONS + userData.user.user_id, {
			method: "GET",
			headers: {
				"Authorization": userData.token
			}
		});
		
		if (response.status === 200){
			response.json().then((data) => {
				var categorizedCertifications = {};
				
				data.forEach((cert) => {					
					if(categorizedCertifications[cert.cert_categ] === undefined){
						categorizedCertifications[cert.cert_categ] = [cert];
					} else {
						categorizedCertifications[cert.cert_categ].push(cert);
					}
				}); 
				
				setCertifications(categorizedCertifications);
			});
		}
	}, [userData]);
	
	useEffect(() => {		
		getCertifications();
	}, [getCertifications]);
	
    return(
        <div style={{display: 'flex', gap: '4em', flexDirection: 'column'}}>
        	{Object.keys(certifications).length > 0 ?
        		<EmployeeGraphs certifications={certifications}/>
        	:
        		<></>
        	}
		    <EmployeeCertifications certifications={certifications} reloadCerts={getCertifications}/>
		    <News/>
        </div> 
    );
}