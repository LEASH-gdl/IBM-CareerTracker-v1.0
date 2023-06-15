import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext.js';
import CSVModal from '../components/CSVModal';
import ExportModal from '../components/ExportModal';

import {
	Header,
	HeaderName,
	Theme,
	HeaderGlobalBar,
	HeaderGlobalAction,
	OverflowMenu,
	OverflowMenuItem,
	Tile
} from '@carbon/react';
import {Collaborate16, Switcher16, UserAvatar16} from '@carbon/icons-react';
import {UserProfile} from '@carbon/pictograms-react'

export default function MainLayout(){
	const userData = useContext(UserContext);
	const location = useLocation().pathname;
	const alternatePage = (location === "/pages/employee" ? "manager" : "employee");
	const navigate = useNavigate();
	const [uploadingStatus, setUploadingStatus] = useState(false);
	const [exportingStatus, setExportingStatus] = useState(false);
	
	const showUploadModal = () => {
		setUploadingStatus(true);
	}
	
	const showExportModal = () => {
		setExportingStatus(true);
	}
	
	const switchApps = () => {
		navigate("/pages/" + alternatePage);
	}
	
	const logout = () => {
		window.localStorage.removeItem("localUserData")
		navigate("/login");
	}

	return(
		<>
		
		<style> {`
			.Content {
			  margin-top: 3em;
			  padding: 2em;
			}
			.cds--overflow-menu__wrapper {
				display: flex;
			}
			
			.cds--overflow-menu__wrapper {
				display: flex;
			}
			
			.headerAction svg {
				fill: white !important;
			}
		`} </style>
		
		<Theme theme="g90">
			<Header aria-label="IBM Career Tracker">
				<HeaderName href="/" prefix="IBM">
					Career Tracker
				</HeaderName>
				<HeaderGlobalBar id="actionsBar">
					{
						(userData.user.user_type === 2)
					?
						<>
							<HeaderGlobalAction className="headerAction"
								aria-label={"Switch to " + alternatePage + " view"}
								onClick={switchApps}
								tooltipAlignment="end">
									<Collaborate16/>
							</HeaderGlobalAction>
							<OverflowMenu style={{height: "100%"}}
								renderIcon={Switcher16}
								flipped>
								
								<OverflowMenuItem
									itemText="Upload CSV file"
									onClick={showUploadModal}>
								</OverflowMenuItem>
								<OverflowMenuItem
									itemText="Export data as CSV"
									onClick={showExportModal}>
								</OverflowMenuItem>
							</OverflowMenu>
						</>
					:
						<></>
					}
					<>
					<OverflowMenu style={{height: "100%"}}
						renderIcon={UserAvatar16}
						flipped>
						
						<Tile style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
							<UserProfile/>
							<span style={{fontWeight: "bold"}}>
								{userData.user.name + " " + userData.user.lastName}
							</span>
							{userData.user.user_id}
						</Tile>
						
						<OverflowMenuItem
							hasDivider={true}
							isDelete={true}
							itemText="Log Out"
							onClick={logout}>
							
						</OverflowMenuItem>
					</OverflowMenu>
					</>
				</HeaderGlobalBar>
			</Header>
		</Theme>
		<div className="Content">
			<CSVModal uploadingStatus={uploadingStatus} setUploadingStatus={setUploadingStatus}/>
			<ExportModal exportingStatus={exportingStatus} setExportingStatus={setExportingStatus}/>
			<Outlet/>
		</div>
		</>
	);
}