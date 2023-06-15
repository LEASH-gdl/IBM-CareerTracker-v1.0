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
import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/UserContext.js';
import '../css/certificationmodal.css'
import * as apiRoutes from '../data/apiRoutes'
import { categories } from '../data/categories'
import { isValidDate } from '../JS/globalFunctions'

export default function EditCertification(props) {

	const userData = useContext(UserContext);
	const  [certName, setCertName] =  useState('');
	const  [certDate, setCertDate] =  useState(new Date());
	const  [certCateg, setCertCateg] =  useState('');
	const  [certType, setCertType] =  useState('');
	
	async function editCertification(event){
		event.preventDefault();
		
		var data = {};
		data.id = props.editedCert.id;
		data.user_id = userData.user.user_id;
		data.cert_name = certName;
		data.issue_date = certDate;
		data.cert_categ = certCateg;
		data.cert_type = certType;
		
		await fetch(apiRoutes.CERTIFICATIONS + data.id, {
			method: "PATCH",
			headers: {
				"Authorization": userData.token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		
		props.refreshCerts();
		close();
	}
	
	//When a new certification is selected to be edited, update the states
	useEffect(() => {		
		
		setCertType(props.editedCert.cert_type);
		setCertName(props.editedCert.cert_name);
		setCertDate(props.editedCert.issue_date);
		setCertCateg(props.editedCert.cert_categ);
		
	},[props.editedCert]);
	
	useEffect(() => {
		document.getElementById("certNameEdit").value = certName;
		document.getElementById("certDateEdit").value = certDate;
		document.getElementById("certCategEdit").value = certCateg;
	
		if(certType === "external certification"){
			document.getElementById("externalRadio").checked = true;
		} else {
			document.getElementById("badgeRadio").checked = true;
		}
	}, [certName, certDate, certCateg, certType])
	
	useEffect(() => {
		document.getElementById("certNameEdit").value = certName;
	
		document.getElementById("certDateEdit").value = certDate;
	
		document.getElementById("certCategEdit").value = certCateg;
	
		if(certType === "external certification"){
			document.getElementById("externalRadio").checked = true;
		} else {
			document.getElementById("badgeRadio").checked = true;
		}
	}, [props.editionStatus])
	
	const close = () => {
		props.setEditionStatus(false);
	}

	return(
		<Modal
			open={props.editionStatus}
			onRequestClose={close}
			modalHeading="Edit Certification"
			primaryButtonText="Edit"
			onRequestSubmit={editCertification}
			primaryButtonDisabled={certName.length === 0 || !isValidDate(certDate) || !categories.includes(certCateg)}
			secondaryButtonText="Cancel">
			
			<Layer>
				<Form>
					<TextInput id="certNameEdit"
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
							
							<DatePickerInput id="certDateEdit"
								labelText="Issue Date"
								onChange={(event) => setCertDate(event.target.value)}
								invalid={!isValidDate(certDate)}
								invalidText="Please enter a valid date"
								placeholder="YYYY-MM-DD"
							/>
						</DatePicker>
						<ComboBox id="certCategEdit"
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
					
					<RadioButtonGroup id="certTypeEdit"
						name="certType"
						legendText={<>Certification Type </>}
						onChange={(value) => setCertType(value)}>
						
						<RadioButton id="badgeRadio" value="badge" labelText="Badge" />
						<RadioButton id="externalRadio" value="external certification" labelText="External Certification"/>
					</RadioButtonGroup>
				</Form>
			</Layer>
		</Modal>
	);
}