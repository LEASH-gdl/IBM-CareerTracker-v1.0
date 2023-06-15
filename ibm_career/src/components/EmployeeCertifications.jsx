import { React } from "react";
import { useState, useEffect } from 'react';
import { Tabs,
         TabList,
         Tab,
         TabPanels,
         TabPanel,
         InlineNotification,
         Button,
         Link
} from '@carbon/react'
import { Add16, ArrowRight16 } from '@carbon/icons-react'

import '../css/EmployeeCertifications.css'
import CertificationTile from '../components/certificationtile.jsx'
import EditCertification from '../components/EditCertification.jsx'
import AddCertification from '../components/AddCertification.jsx'
import DeleteCertification from '../components/DeleteCertification.jsx'

export default function EmployeeCertifications(props){
	
	const [editionStatus, setEditionStatus] = useState(false);
	const [editedCert, setEditedCert] = useState({cert_name: "", issue_date: "", cert_categ: "", cert_type: ""});
	const [creationStatus, setCreationStatus] = useState(false);
	const [deletionStatus, setDeletionStatus] = useState(false);
	
	const showAddCertification = () => {
		setCreationStatus(true);
	}
	
    return(
        <div>
        	<EditCertification
        		editionStatus={editionStatus}
        		setEditionStatus={setEditionStatus}
        		refreshCerts={props.reloadCerts}
        		editedCert={editedCert}
        	/>
        	
        	<AddCertification
        		creationStatus={creationStatus}
        		setCreationStatus={setCreationStatus}
        		refreshCerts={props.reloadCerts}
        	/>
        	
        	<DeleteCertification
        		deletionStatus={deletionStatus}
        		setDeletionStatus={setDeletionStatus}
        		refreshCerts={props.reloadCerts}
        		editedCert={editedCert}
        	/>
        	
        	<div className="distribute">
		    	<h1>My Certifications</h1>
		    	<Button renderIcon={Add16} id="addCertBtn" onClick={showAddCertification}>
					Add Certification
				</Button>
			</div>
        	
        	{(Object.keys(props.certifications).length > 0)
        	?
        	<Tabs>
				<TabList aria-label="certification categories">
					{Object.keys(props.certifications).map((i) =>
						<Tab key={i}>{i}</Tab>
					)}
				</TabList>
				<TabPanels>
					{Object.keys(props.certifications).map((categ) =>
						<TabPanel key={categ} className="tabPanel">
							<div className="certificationsPage">
							{props.certifications[categ].map((cert, categIndex) =>
								<CertificationTile key={cert.id}
									certification={cert}
									setEditionStatus={setEditionStatus}
									setDeletionStatus={setDeletionStatus}
									setEditedCert={setEditedCert}
								/>
							)}
							</div>
						</TabPanel>
					)}
				</TabPanels>
			</Tabs>
			:
			<InlineNotification kind="info" hideCloseButton={true} id="noCerts">
				You don't have any associated certifications
			</InlineNotification>
			}
			<Link href="https://www.ibm.com/training/learning-paths-and-collections" renderIcon={ArrowRight16}>Take a look at IBM's training oportunities</Link>
        </div>
    );
}