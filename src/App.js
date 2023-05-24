import React, {useState} from 'react'
import './index.css'
import Sidebar from './compenents/Sidebar/Sidebar'
import Tray from './compenents/Tray/Tray'
import Profiles from './pages/profiles/Profiles'
import Tasks from './pages/task/Tasks'
import Settings from './pages/settings/Settings.js'
import Proxy from './pages/proxies/Proxies'
import axios from 'axios'
import Captcha from './pages/captcha/Captcha'
import SettingsPopout from './pages/settingsPopout/SettingsPopout'
import { ToastContainer, toast } from 'react-toastify';
import Login from './pages/login/Login'

import Dashboard from './pages/dashboard/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";


 function AppMain() {

const profData = axios.get("http://localhost:3085/api/profile/get")
.then(function (response) {

    return response.data;
})
.catch(function (error) {
    console.log(error);
});

const proxData = axios.get("http://localhost:3085/api/proxy/get")
.then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.log(error);
});

const taskData = axios.get("http://localhost:3085/api/task/get")
.then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.log(error);
});


const settingData = axios.get("http://localhost:3085/api/settings/get")
.then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.log(error);
});

const userData = axios.get('http://localhost:3085/api/settings/get/userData')
.then(function (response) {
    return response.data;
})
.catch(function (error) {
    console.log(error);
});



    return (
        <>
        <div className="App">

   <Router>
    

      <Switch>
      <Route path="/login" >
      < Login settingData={settingData}/>
       </Route>
      <Route path="/smallsettings" >
            <SettingsPopout />
    </Route>
    <Route path="/captcha" >
            <Captcha />
    </Route>
          <Route path="/profile" >
             <Sidebar page="profile"/>
               <Tray/>
             <Profiles profiles={profData}/>
          </Route>
          <Route path="/proxy" >
          <Sidebar page="proxy"/>
               <Tray/>
             <Proxy proxyGroups={proxData}/>
          </Route>
          <Route path="/dashboard" >
          <Sidebar page="dashboard"/>
               <Tray/>
               <Dashboard />
          </Route>
  

          <Route path="/setting">
          <Sidebar page="setting"/>
               <Tray/>
               <Settings settingData={settingData} userDataImport={userData} />
          </Route>
          <Route path="/task">
          <Sidebar page="task"/>
               <Tray/>
             <Tasks  taskData={taskData}/>
          </Route>
    
      </Switch>
   </Router>

        </div>


        </>

    )
}

export default AppMain
