import React from "react";
import '../css/mainfooter.css'

export default function MainFooter(){
	const ibmLinks = [
		{ title: "Products & Solutions", content: [
			{name: "Top products & platforms", address: "https://www.ibm.com/products?lnk=fps"},
			{name: "Industries", address: "https://www.ibm.com/industries?lnk=fps"},
			{name: "Artificial intelligence", address: "https://www.ibm.com/cloud/ai?lnk=fps"},
			{name: "Blockchain", address: "https://www.ibm.com/blockchain?lnk=fps"},
			{name: "Business operations", address: "https://www.ibm.com/business-operations?lnk=fps"},
			{name: "Cloud computing", address: "https://www.ibm.com/cloud?lnk=fps"},
			{name: "Data & Analytics", address: "https://www.ibm.com/analytics?lnk=fps"},
			{name: "Hybrid cloud", address: "https://www.ibm.com/cloud/hybrid?lnk=fps"},
			{name: "IT infrastructure", address: "https://www.ibm.com/it-infrastructure?lnk=fps"},
			{name: "Security", address: "https://www.ibm.com/security?lnk=fps"},
			{name: "Supply chain", address: "https://www.ibm.com/supply-chain?lnk=fps"},
			{name: "Financing", address: "https://www.ibm.com/financing"}
		]},
		{title: "Learn about", content: [
			{name: "What is Hybrid Cloud?", address: "https://www.ibm.com/cloud/learn/hybrid-cloud?lnk=fle"},
			{name: "What is Artificial intelligence?", address: "https://www.ibm.com/cloud/learn/what-is-artificial-intelligence?lnk=fle"},
			{name: "What is Cloud Computing?", address: "https://www.ibm.com/cloud/learn/cloud-computing?lnk=fle"},
			{name: "What is Kubernetes?", address: "https://www.ibm.com/cloud/learn/kubernetes?lnk=fle"},
			{name: "What are Containers?", address: "https://www.ibm.com/cloud/learn/containers?lnk=fle"},
			{name: "What is DevOps?", address: "https://www.ibm.com/cloud/learn/devops-a-complete-guide?lnk=fle"},
			{name: "What is Machine Learning?", address: "https://www.ibm.com/cloud/learn/machine-learning?lnk=fle"},
		]},
		{title: "Popular links", content: [
			{name: "IBM Consulting", address: "https://www.ibm.com/consulting/?lnk=fco"},
			{name: "Communities", address: "https://community.ibm.com/community/user/home?lnk=fpo"},
			{name: "Developer education", address: "https://developer.ibm.com/?lnk=fpo"},
			{name: "Support - Download fixes, updates & drivers", address: "https://www.ibm.com/support/fixcentral/?lnk=fpo"},
			{name: "IBM Research", address: "https://research.ibm.com/?lnk=fpo"},
			{name: "Partner with us - Partner Plus", address: "https://www.ibm.com/partnerplus/?lnk=fpo"},
			{name: "Training - Courses", address: "https://www.ibm.com/training/search?q=course&lnk=fpo"},
			{name: "Upcoming events & webinars", address: "https://www.ibm.com/events/?lnk=fpo"}
		]},
		{title: "About IBM", content: [
			{name: "Annual report", address: "https://www.ibm.com/annualreport/?lnk=fab"},
			{name: "Career opportunities", address: "https://www.ibm.com/employment/?lnk=fab"},
			{name: "Corporate social responsibility", address: "https://www.ibm.org/?lnk=fab"},
			{name: "Diversity & inclusion", address: "https://www.ibm.com/impact/be-equal/?lnk=fab"},
			{name: "Industry analyst reports", address: "https://www.ibm.com/reports/analyst/?lnk=fab"},
			{name: "Investor relations", address: "https://www.ibm.com/investor/?lnk=fab"},
			{name: "News & announcements", address: "https://newsroom.ibm.com/?lnk=fab"},
			{name: "Thought leadership", address: "https://www.ibm.com/thought-leadership/?lnk=fab"},
			{name: "Security, privacy & trust", address: "https://www.ibm.com/trust?lnk=fab"},
			{name: "About IBM", address: "https://www.ibm.com/about?lnk=fab"}
		]},
		{title: "Follow IBM", content: [
			{name: "LinkedIn", address: "https://www.linkedin.com/company/ibm"},
			{name: "Twitter", address: "https://www.twitter.com/ibm"},
			{name: "Instagram", address: "https://www.instagram.com/ibm"},
			{name: "Subscription Center", address: "https://www.ibm.com/subscribe/"}
		]}
	];

    return(
        <footer>
        	<div style={{display: "flex", justifyContent: "Left"}}>
        		<a href="https://www.ibm.com">
        			<img src="assets/Logo/IBM Logo/IBM_logo_White.png" alt="IBM Logo" height="110px"/>
        		</a>
        	</div>
        	<hr/>
            <div className="footerLinks">
            	{ibmLinks.map((section) => (
            		<section key={section.title}>
            			<h6>{section.title}</h6>
            			<ul>
            			{section.content.map((link) => (
            				<li className="linkContainer" key={link.name}><a className="footerLink" href={link.address}>{link.name}</a></li>
            			))}
            			</ul>
            		</section>
            	))}
            </div>
            <hr/>
            <div style={{display: "flex", justifyContent: "Left", padding: "1em"}}>
    			<a className="footerLink"href="https://www.ibm.com/contact/us/en/?lnk=flg-cont-usen" style={{marginRight: "30px"}}>
    				Contact IBM
    			</a>
    			<a className="footerLink"href="https://www.ibm.com/privacy?lnk=flg-priv-usen" style={{marginRight: "30px"}}>
    				Privacy
    			</a>
    			<a className="footerLink"href="https://www.ibm.com/legal?lnk=flg-tous-usen" style={{marginRight: "30px"}}>
    				Terms of use
    			</a>
    			<a className="footerLink"href="https://www.ibm.com/able/?lnk=flg-acce-usen" style={{marginRight: "30px"}}>
    				Accessibility
    			</a>
            </div>
        </footer>
    );
}