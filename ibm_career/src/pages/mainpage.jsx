import { React } from "react";
import { Header, HeaderName, Theme, Button } from '@carbon/react';
import MainFooter from '../components/mainfooter.jsx';
import '../css/mainpage.css';
import {
	ArrowRight16
} from '@carbon/icons-react';
import { Presentation, Presenter, Bee, ChartMultiType, Badge, ExpandUser} from '@carbon/pictograms-react';

function MainPage(){
    return(
        <div>
            <Theme theme="g90">
		        <Header aria-label="IBM Platform Name" >
		            <HeaderName href="#" prefix = "">
		                <img src = "assets/Logo/IBM Logo/IBM_logo_White.png"  alt = "IBM Logo" height="190%"/>
		            </HeaderName>
		        </Header>
		        
			    <div id="welcome-container">
			    	<div id="welcome-contents">
						<h1><span style={{fontWeight: "lighter"}}>IBM</span> Career Tracker</h1>
						<div id="button-container">
							<Button href="/login" renderIcon={ArrowRight16}>Log In</Button>
							<Button href="#description-container" kind="tertiary" id="btn-sign-in">Learn More...</Button>
						</div>
			    	</div>
			    </div>
            </Theme>
			<div id="main-content">
				<div id="description-container">
					<h1 style={{textAlign:'left'}}>What is IBM Career Tracker?</h1>
					<p style={{textAlign:'left', marginTop:'35px',marginBottom:'15px'}}>
						Our mission is to be a catalyst that makes the world work better.
						IBM Career Tracker  is a tool that will helps us analyze the different
						disciplines and certificates of pur employees to create strategies and
						them grow in their careers.  IBM success depends on the quality and
						skills of our staff, because we believe that through the application
						of intelligence, reason and science, we can improve business, society
						and the human condition, for our clients and partners around the world.
					</p>
				</div> 
				<hr/>
				<div id="description-container">
					<h2 style={{textAlign:'left'}}> What is it used for? </h2>
					<p style={{textAlign:'left', marginTop:'35px',marginBottom:'15px'}}>
						This tool will permit managers and employees at IBM to track their career
						progress on:
					</p>
					<h3 style={{marginTop:'5%', fontWeight:'bold'}}> For Employees </h3>
					<div id="icons-grid">
						<div id="icons-card"> 
							<Bee/>
							<p> Ensure you are growing in your career at IBM. </p>
						</div>
						<div id="icons-card"> 
							<Presenter/>
							<p> Have a dashboard the will help you track your progress. </p> 
						</div>
						<div id="icons-card"> 
							<Badge/> 
							<p> Identify the different badges & certificates you have. </p>
						</div>
					</div>
					<h3 style={{ fontWeight:'bold'}}> For Managers </h3>
					<div id="icons-grid">
						<div id="icons-card"> 
							<ChartMultiType/>
							<p> Follow your employees career improvement with badges or certifications. </p> 
						</div>
						<div id="icons-card"> 
							<ExpandUser/>
							<p> Define estrategies to ensure product quality on clients projects.</p>
						</div>
						<div id="icons-card"> 
							<Presentation/> 
							<p> Encurage your employees to learn, develope ad apply new skills.</p>	
						</div>
					</div>
				</div> 
				<div id="about-container">
			    	<div>
						<h1 style={{fontWeight: "lighter", textAlign:"left", fontSize: 50, marginBottom: '25%'}}> About IBM </h1>
						<p style={{textAlign:"left", fontSize: 20}}> From careers <br/> to iconic moments in our history, <br/> see what's happening at IBM </p>
						<div id="button-container">
							<Button href = "https://www.ibm.com/mx-es/about?lnk=hpeslaai1" renderIcon={ArrowRight16}>Find out</Button>
						</div>
			    	</div>
			    </div>         
			</div>
            <MainFooter/>
        </div> 
    );
}

export default MainPage