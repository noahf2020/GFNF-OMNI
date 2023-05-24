import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import SettingsData from "../../compenents/SettingsData/Settingsdata"
import UpdateSettings from "../../compenents/UpdateSettings/UpdateSettings"
import Usersettings from "../../compenents/UserSettings/Usersettings"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings({settingData, userDataImport}) {

const [webhookData, setwebhookData] = useState("")
const [captchaData, setcaptchaData] = useState("")




useEffect(()=> {   
    settingData.then(function(result) {
       
        setwebhookData(result.discordWebhook)
        setcaptchaData(result.discordWebhook)
    });



    })

   

            function UpdateSettings1(webhook,captcha){
                axios.post(`http://localhost:3085/api/settings/update?webhook=${webhook}&captcha=${captcha}`)
                .then(function (response) {
                   console.log(response.status)
            
                })
            }


    return (

<>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    
                                        />
                                   
                                   <NAME>GFNF</NAME>                        
        <Mainbackground>
     
                    <Divider><Usersettings data={userDataImport} toast={toast}/></Divider>

                    <Divider><UpdateSettings/></Divider>

                    <Divider><SettingsData webhookData={webhookData} captchaData={captchaData} updateSettingsfunc={UpdateSettings1}/></Divider>
                

        </Mainbackground>


 </>       
    )
}

const NAME = styled.p`

margin-left:150px;
`
const Divider = styled.div`
margin-top: 30px;
margin-left:35px;
justify-content: space-evenly;
background: rgb(30, 29, 41);
border: 1.67px solid rgb(113, 110, 133);
height:440px;
width:250px;
border-radius:5px;
overflow-y:auto;
`

const Mainbackground = styled.div`
         overflow: hidden;
        display:flex;
        margin-top: 5px;
        height: 500px;
        width: 900px;
        margin-left: 140px;
        background: rgb(30, 29, 41);
        border-radius: 5px;
        flex-wrap:  wrap ;
        font-family: 'Inter', sans-serif;



`