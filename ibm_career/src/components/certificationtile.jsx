import {Tile, Button, ButtonSet} from '@carbon/react'
import {Calendar16, TrashCan16, Edit16} from '@carbon/icons-react'
import '../css/EmployeeCertifications.css'

export default function CertificationTile(props) {
	
	return(
		<Tile className="certificationTile">
			<h4>{props.certification.cert_name}</h4>
			<p>{props.certification.cert_type}</p>
			<div className="dateContainer">
				<Calendar16/>
				<p>{props.certification.issue_date}</p>
			</div>
			<ButtonSet className="certButtons">
				<Button
					hasIconOnly
					label="Delete Certification"
					kind="danger--ghost"
					renderIcon={TrashCan16}
					iconDescription="delete"
					onClick={() => {
						props.setDeletionStatus(true);
						props.setEditedCert(props.certification);
					}}
				/>
				<Button
					hasIconOnly
					label="Edit Certification"
					kind="secondary"
					aria-label="Edit"
					renderIcon={Edit16}
					iconDescription="edit"
					onClick={() => {
						props.setEditionStatus(true);
						props.setEditedCert(props.certification);
					}}
				/>
			</ButtonSet>
		</Tile>
	);
}