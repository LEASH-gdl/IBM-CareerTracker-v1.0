import {
	Modal,
	ProgressIndicator,
	ProgressStep,
	Button,
	FileUploader,
	InlineLoading,
	InlineNotification,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableHeader
} from '@carbon/react';
import {useState, useEffect, useContext, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {Undo16, Information16} from '@carbon/icons-react';

import '../css/CSVModal.css';
import {csvFields, mandatoryFields}  from '../data/csvFields';
import {isValidDate} from '../JS/globalFunctions'
import {UPLOAD_CERTIFICATIONS} from '../data/apiRoutes';
import { UserContext } from '../contexts/UserContext.js';

export default function CSVModal(props){

	const userData = useContext(UserContext);
	const [step, setStep] = useState(0);
	const [csvFile, setCsvFile] = useState();
	const [data, setData] = useState();
	const [nCerts, setNCerts] = useState(0);
	const [fileErrors, setFileErrors] = useState([]);
	const [pendingUpload, setPendingUpload] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const csv = require('csvtojson');
	
	const close = () => {
		props.setUploadingStatus(false);
	}
	
	const nextStep = useCallback( () => {
		setStep(step + 1);
	}, [step, setStep]);
	
	const verifyFile = useCallback( async () => {
		if(csvFile.type !== "text/csv"){
			setFileErrors([{error: "The file is not a .csv", row: null}]);
			return;
		}
		
		const raw = await csvFile.text();
		
		const info = await csv().fromString(raw);
		
		if(info.length === 0){
			setFileErrors([{error: "The file doesn't contain any certification", row: null}]);
			return;
		}
		
		if(Object.keys(info[0]).toString() !== csvFields.toString()){
			setFileErrors([{error: "The fields on the file doesn't match the specification", row: null}]);
			return;
		}
		
		for(var i = 0; i < info.length; i++){
			for(let j = 0; j < mandatoryFields.length; j++){
				let field = mandatoryFields[j];
				
				if(info[i][field] === ""){
					fileErrors.push({error: "Mandatory Field '"+field+"' is empty", row: i + 2})
				}
			}
		
			if(info[i].issue_date !== "" && !isValidDate(info[i].issue_date, true)){
				fileErrors.push({error: "Issue Date is not in ISO8601 format", row: i + 2});
			}
		}
		
		setData(new File([JSON.stringify(info)], "data.json", {
  			type: "text/json"
		}));
		
		setNCerts(info.length);
		
		if(fileErrors.length === 0){
			nextStep();
		}
	}, [csv, csvFile, fileErrors, nextStep]);
	
	const fileUploaded = (event) => {
		setCsvFile(event.target.files[0]);
		nextStep();
	}
	
	async function importData() {
		setPendingUpload(true);
		
		const formData = new FormData();
  		formData.append('file', data);
  		
  		const response = await fetch(UPLOAD_CERTIFICATIONS, {
  			method: 'POST',
			headers: {
				"Authorization": userData.token
			},
			body: formData
		});
		
		setPendingUpload(false);
		
		if(response.status === 200){
			setUploadSuccess(true);
		} else {
			setUploadSuccess(false);
		}
	
		nextStep();
	}
	
	useEffect(() => {
		if(props.uploadingStatus === true) {
			setStep(0);
			setFileErrors([]);
		}
	}, [props.uploadingStatus]);
	
	useEffect(() => {
		if (step === 1){
			verifyFile();
		}
	}, [step, verifyFile]);
	
	return(		
		<Modal
			open={props.uploadingStatus}
			onRequestClose={close}
			modalHeading="Import certifications"
			primaryButtonText="Import"
			primaryButtonDisabled={step !== 2}
			onRequestSubmit={importData}
			secondaryButtonText="Cancel">
			
			<ProgressIndicator
				currentIndex={step}
				>
				
				<ProgressStep
					label="Upload"
				/>
				<ProgressStep
					invalid={fileErrors.length !== 0}
					label="Validation"
				/>
				<ProgressStep
					label="Import"
				/>
			</ProgressIndicator>
			
			{step === 0 ?
				<div className="stepContent">
					<p>
						You can import certifications in bulk using a csv file which follows the required format.
						<br/>
						Click <Link to="/files/templateCertsFile.xlsx" target="_blank" download>here</Link> to download a template.
					</p>
					<div className="info">
					<Information16/>
					<p>
						When using the template, remember to export the first sheet as a CSV file to import it
					</p>
					</div>

					<FileUploader
						accept={['.csv']}
						labelTitle="Upload a certifications file"
						labelDescription="Only CSV files are supported"
						buttonLabel="Select File"
						onChange={fileUploaded}
						iconDescription="Upload"
					/>
				</div>
			: <></>}
			
			{step === 1 ?
				<div className="stepContent">
					{fileErrors.length === 0 ?
						<InlineLoading description="We're verifying your file has all the neccesary info..."/>
					:
						<>
						The following formatting errors were found:
						<Table>
							<TableHead>
								<TableRow>
									<TableHeader>Error</TableHeader>
									<TableHeader>Row</TableHeader>
								</TableRow>
							</TableHead>
							{fileErrors.map((error, i) => 
								<TableRow key={i}>
									<TableCell key={"error"+i}>{error.error}</TableCell>
									<TableCell key={"row"+i}>{error.row}</TableCell>
								</TableRow>
							)}
						</Table>
						<Button
							kind="ghost"
							renderIcon={Undo16}
							onClick={() => {
								setFileErrors([]);
								setStep(0);
							}}>
							Upload another file
						</Button>
						</>
					}
				</div>
			: <></>}
			
			{step === 2 ?
				<div className="stepContent">
					{ pendingUpload === false ?
						<p>The file <span className="bold">{csvFile.name}</span> contains {nCerts} certifications.
						<br/>
						To import them, click on the <span className="bold">Import</span> button below</p>
					:
						<InlineLoading description="We're importing your certifications into the system..."/>
					}
				</div>
			: <></>}
			
			{step === 3 ?
				<div className="stepContent">
					{ uploadSuccess === true ?
					<>
					<InlineNotification
						kind="success"
						title="Success!"
					/>
					<p>The certifications of the file <span className="bold">{csvFile.name}</span> were imported succesfully!</p>
					</>
					:
					<InlineNotification
						kind="error"
						title="Error!"
						subtitle="An error ocurred while uploading the file's certifications"
					/>
					}
					
				</div>
			: <></>}
		</Modal>
	);
}