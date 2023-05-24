import React, {useState,useRef,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import saveimg from './images/save (1).svg'
import axios from 'axios'

export default function Settingsdata({webhookData, captchaData, updateSettingsfunc}) {


    const { register, handleSubmit,  reset  } = useForm({});

    useEffect(() => {
        axios.get("http://localhost:3085/api/settings/get").then((res) => {
          reset({
            webhook: res.data.discordWebhook,
            captcha:res.data.captcha
          });
        });
      }, [reset]);




    const onSubmit = (data, e) => updateSettingsfunc(data.webhook, data.captcha);
    const onError = (errors, e) => console.log(errors, e);
  
const openCaptcha = () => {
  window.electron.send("opencapwindow");

}


    return (
      <>
        <ExtraSettingsHeader>Extra Settings</ExtraSettingsHeader>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <WebhookSettingInput   {...register("webhook")}  placeholder="Discord Webhook" ></WebhookSettingInput>
            <CaptchaKey  {...register("captcha")}  placeholder="2 Captcha Key"></CaptchaKey>
            <OpenCaptchaHarvester type="enter" onClick={openCaptcha}>Open Captcha Harvester</OpenCaptchaHarvester>
            <SaveSettingBTN type="submit" onClick={()=>{
                
            }}>Save Settings<img src={saveimg}/></SaveSettingBTN>
        </form>
      </>

    )
}

const OpenCaptchaHarvester = styled.button`
border-radius:4px;
height:30px;
width:175px;
align-items:center;
text-align: center;
justify-content:center;
display:flex;
margin-left:43px;
outline:none;
border: 1.67px solid rgb(113, 110, 133);
background-color:rgb(55, 53, 69);
color:white;
margin-top:130px;
font-family: 'Inter', sans-serif;
cursor: pointer;
`
const SaveSettingBTN = styled.button`

height:35px;
width:195px;
background: #2b67b5;
color:white;
outline: none;
border: none;//1.67px solid white;
border-radius: 6px;
cursor:pointer;
margin-left:31px;
margin-top:40px;
font-size:16px;
font-family: 'Inter', sans-serif;
img{
    padding-left:15px;
}
:hover{
  border: 1px solid #EC6FAE;
}
`


const CaptchaKey =  styled.input`
border-radius:4px;
height:30px;
width:185px;
align-items:center;
text-align: center;
justify-content:center;
display:flex;
margin-left:34px;
outline:none;
border: 1.67px solid rgb(113, 110, 133);
background-color:rgb(55, 53, 69);
color:white;
margin-top:30px;
font-family: 'Inter', sans-serif;

`
const WebhookSettingInput = styled.input`
border-radius:4px;
height:30px;
width:185px;
align-items:center;
text-align: center;
justify-content:center;
display:flex;
margin-left:34px;
outline:none;
border: 1.67px solid rgb(113, 110, 133);
background-color:rgb(55, 53, 69);
color:white;
font-family: 'Inter', sans-serif;

`


const ExtraSettingsHeader = styled.p`
 font-family: 'Inter', sans-serif;
text-align: center;
font-size:18px;


`
