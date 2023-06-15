import {
	Modal
} from '@carbon/react';
import { useContext } from 'react';

import { UserContext } from '../contexts/UserContext.js';
import * as apiRoutes from '../data/apiRoutes'

export default function DeleteCertification(props){
	const userData = useContext(UserContext);
	
	const close = () => {
		props.setDeletionStatus(false);
	}
	
	async function deleteCertification(event) {
		await fetch(apiRoutes.CERTIFICATIONS + props.editedCert.id, {
			method: "DELETE",
			headers: {
				"Authorization": userData.token
			}
		});
		
		props.refreshCerts();
		close();
	}
	
	return(
		<>
		<style> {`
			.bold {
				font-weight: bold;
			}
		`} </style>
		
		<Modal
			danger={true}
			open={props.deletionStatus}
			onRequestClose={close}
			modalHeading="Delete Certification"
			primaryButtonText="Delete"
			onRequestSubmit={deleteCertification}
			secondaryButtonText="Cancel">
			
			Are you sure you want to delete the <span className="bold">{props.editedCert.cert_name}</span> certification?
			<br/>
			This action can't be undone
		</Modal>
		</>
	);
}