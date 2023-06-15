import './App.scss';

//import axios from 'axios';
//import Graph from './components/graph.jsx';

import MainPage from './pages/mainpage';
import Login from './pages/login';
import EmpDashboard from './pages/EmpDashboard';
import ManDashboard from './pages/ManDashboard';
import NotFound from './pages/notfound';
import MainLayout from './pages/mainlayout';
import SessionManager from './components/SessionManager';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from './contexts/UserContext.js';

function App() {

  return (
    <>
      <BrowserRouter>
      	<UserContext.Provider value={{user: {}, token: "", authenticated: false, expired: false}}>
      		<SessionManager>
		    	<Routes>
		    		<Route index element={<MainPage/>}/>
					<Route path="login" element={<Login/>}/>
					<Route path="pages" element={<MainLayout/>}>
						<Route path="employee" element={<EmpDashboard/>}/>
						<Route path="manager" element={<ManDashboard/>}/>
					</Route>
					<Route path="*" element={<NotFound/>}/>
		    	</Routes>
        	</SessionManager>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
