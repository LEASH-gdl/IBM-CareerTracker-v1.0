import { React } from "react";
import { Header, HeaderName, Theme } from '@carbon/react';
import MainFooter from '../components/mainfooter.jsx';

function NotFound(){
    return(
        <div>
            <Theme theme="g90">
		        <Header aria-label="IBM Platform Name" >
		            <HeaderName href="/" prefix = "">
		                <img src = "assets/Logo/IBM Logo/IBM_logo_White.png"  alt = "IBM Logo" height="190%"/>
		            </HeaderName>
		        </Header>
		    </Theme>
		    <div style={{marginTop: "5em", padding: "3em"}}>
		    	<h1>Page not found</h1>
		    </div>
            <MainFooter/>
        </div> 
    );
}

export default NotFound