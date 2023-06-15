import {
	Modal,
	TextInput,
	Form,
	DatePicker,
	DatePickerInput,
	ComboBox,
	RadioButtonGroup,
	RadioButton,
	Layer
} from '@carbon/react';
import { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext.js';
import '../css/certificationmodal.css'
import * as apiRoutes from '../data/apiRoutes'
import { categories } from '../data/categories'
import { isValidDate } from '../JS/globalFunctions'

export default function AddCertification(props) {

	const userData = useContext(UserContext);
	const  [certName, setCertName] =  useState('');
	const  [certDate, setCertDate] =  useState('');
	const  [certCateg, setCertCateg] =  useState('');
	const  [certType, setCertType] =  useState('badge');
	
	async function addCertification(event){
		event.preventDefault();
		
		var data = {};
		data.user_id = userData.user.user_id;
		data.cert_name = certName
		data.issue_date = certDate
		data.cert_categ = certCateg
		data.cert_type = certType
		
		await fetch(apiRoutes.CERTIFICATIONS, {
			method: "POST",
			headers: {
				"Authorization": userData.token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		
		document.getElementById("certAddForm").reset();
		
		props.refreshCerts();
		close();
	}
	
	const close = () => {
		props.setCreationStatus(false);
	}

	return(
		<Modal
			open={props.creationStatus}
			onRequestClose={close}
			modalHeading="Add Certification"
			primaryButtonText="Add"
			onRequestSubmit={addCertification}
			primaryButtonDisabled={certName.length === 0 || !isValidDate(certDate) || !categories.includes(certCateg)}
			secondaryButtonText="Cancel">
			
			<Layer>			
				<Form id="certAddForm">
					<TextInput id="certNameAdd"
						onChange={(event) => {setCertName(event.target.value)}}
						invalid={certName.length === 0}
						invalidText="Please enter the certification name"
						labelText="Certification Name"
					/>
					
					<div className="stretchable">
						<DatePicker 
							id="certDateContainer"
							datePickerType="simple"
							dateFormat="Y-m-d">
							
							<DatePickerInput id="certDateAdd"
								labelText="Issue Date"
								onChange={(event) => setCertDate(event.target.value)}
								invalid={!isValidDate(certDate)}
								invalidText="Please enter a valid date"
								placeholder="YYYY-MM-DD"
							/>
						</DatePicker>
						<ComboBox id="certCategAdd"
							titleText="Certification Category"
							helperText="Type into the box to filter categories"
							items={categories}
							invalid={!categories.includes(certCateg)}
							invalidText="Please select a valid category"
							onChange={(event) => {setCertCateg(event.selectedItem)}}
							shouldFilterItem={(data) => {
								if(data.inputValue !== undefined && data.inputValue !== null) {
									return data.item.toLowerCase().includes(data.inputValue.toLowerCase());
								} else {
									return false;
								}
							}}
						/>
					</div>
					<RadioButtonGroup name="certType"
						legendText="Certification Type"
						defaultSelected="badge"
						onChange={(value) => setCertType(value)}>
						
						<RadioButton value="badge" labelText="Badge"/>
						<RadioButton value="external certification" labelText="External Certification"/>
					</RadioButtonGroup>
				</Form>
			</Layer>
		</Modal>
	);
}