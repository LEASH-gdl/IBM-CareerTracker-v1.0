import {
	Modal,
	ComboBox,
	InlineLoading,
	Button
} from '@carbon/react';
import {Link} from 'react-router-dom';
import {  } from '@carbon/icons-react';
import { useState, useContext } from 'react';

import { categories } from '../data/categories';
import { CERTIFICATIONS, USER_INFO } from '../data/apiRoutes';
import { UserContext } from '../contexts/UserContext.js';
import {csvFields}  from '../data/csvFields';

export default function ExportModal(props){

	const userData = useContext(UserContext);
	const [categ, setCateg] = useState("");
	const [step, setStep] = useState(0);
	const [fileURI, setFileURI] = useState("");
	const exportCategories = [].concat('(All)', categories);
	const converter = require('json-2-csv');

	const close = () => {
		props.setExportingStatus(false);
		
		setStep(0);
	}
	
	async function exportData() {
		setStep(1);
		
		var response;
		
		response = await fetch(CERTIFICATIONS, {
			headers: {
				"Authorization": userData.token
			}
		})
		
		var certs = await response.json();
		
		response = await fetch(USER_INFO, {
			headers: {
				"Authorization": userData.token
			}
		})
		
		var employees = {};
		var data = await response.json();
		data.forEach(user => {
			employees[user.user_id] = user;
		});
		
		var certItem;
		
		for(var i = certs.length - 1; i >= 0; i--){
		
			if (categ !== '(All)' && certs[i].cert_categ !== categ){
				certs.splice(i,1);
				continue;
			}
			
			certItem = {};
			var userId = certs[i].user_id;
			
			csvFields.forEach(field => {
				certItem[field] = (certs[i][field] === undefined) ? employees[userId][field] : certs[i][field];
			});
			
			certs[i] = certItem;
		}
		
		const csvText = await converter.json2csv(certs, {
			unwindArrays: false
		})
		
		const file = new File([csvText], "exported_"+categ+"_certs_"+Date.now()+".csv", {
			type: "text/csv"
		});
		
		setFileURI(URL.createObjectURL(file));
		setStep(2);
	}
	
	return(
		<Modal
			open={props.exportingStatus}
			modalHeading="Export certifications"
			primaryButtonText="Export"
			primaryButtonDisabled={!exportCategories.includes(categ) || step !== 0}
			onRequestSubmit={exportData}
			secondaryButtonText="Cancel"
			onRequestClose={close}>
			
			{step === 0
			?
			<div style={{'display': 'flex', 'flexFlow': 'column','gap': '1.5em'}}>
				<ComboBox id="certCategExp"
					titleText="Certification Category"
					helperText="Type into the box to filter categories"
					items={exportCategories}
					invalid={!exportCategories.includes(categ)}
					invalidText="Please select a valid category"
					onChange={(event) => {setCateg(event.selectedItem)}}
					shouldFilterItem={(data) => {
						if(data.inputValue !== undefined && data.inputValue !== null) {
							return data.item.toLowerCase().includes(data.inputValue.toLowerCase());
						} else {
							return false;
						}
					}}
				/>
				
				<div className="info">
					<p>
						When you click on export, all certifications with the specified
						category will be exported to a CSV file, which follows
						the <Link to="/files/templateCertsFile.xlsx" target="_blank" download>default format</Link>
					</p>
				</div>
			</div>
			: <></> }
			
			{step === 1 ? 
			<div style={{'display': 'flex', 'justifyContent':'center', 'alignItems':'center'}}>
				<InlineLoading description="We're exporting the selected certifications to a CSV file..."/>
			</div>
			: <></>}
			
			{step === 2 ?
			<div style={{'display': 'flex', 'flexFlow': 'column', 'gap': '1em'}}>
				Your file has been generated succesfully
				<Button
					href={fileURI}>
					Download File
				</Button>
			</div>
			: <></> }
		</Modal>
	);
}