import React,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
export default function SettingsPopout() {

const text = [`Carts: 13`, `Checkouts: 10`, `Declines: 1`]


//'Start All Tasks','Stop Tasks', 'let tasks Load'

const closeWindow = () => {
   // window.electron.closeSetWindow("closeSetWindow");
   window.electron.send("closeSetWindow");
}

const opencapwindow = () => {
    window.electron.send("opencapwindow", "opencapwindow");

}

const testWebhook = () =>{
    axios.get("http://localhost:3085/api/settings/get")
        .then(function (response) {
    if(response.data.discordWebhook){
        if(response.data.discordWebhook.includes("https://discord")){
            fetch(response.data.discordWebhook, { method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({content: "",embeds: [{
                      title: `Webhook test :partying_face:`,
                      color: 2291034,
                      timestamp: new Date(),
                      footer: {text: `Omni AIO v1`,icon_url:"https://mpng.subpng.com/20190429/woy/kisspng-sneakers-scalable-vector-graphics-sports-shoes-sli-shoes-png-icons-and-graphics-png-repo-free-png-i-5cc7c0e9d84ca1.480349411556594921886.jpg"},
                      description:"Welcome to Omni AIO, Your Webhook is working!"
                    },
                  ],
                }),
              }).catch((err) => {
              alert(err)
              });
        }else{
            alert("Invalid Webhook")
        }
    }else{
        alert("No Webhook")
    }
})
.catch(function (error) {
    console.log(error);
});

}
    return (
        <Body>
            <TopDragBar>
         
                     <TEXT>Omni AIO Quick Settings</TEXT>
                  
                     
          
        
                <CloseButton onClick={closeWindow}>x</CloseButton>
               
            
                </TopDragBar>
            <Data>
                    <LeftDiv>
                                <StatData>
                                {
                                text.map(i => {
                                    return <li>{i}</li>})
                                }
                                </StatData>
                                    <div>
                                    <RefreshButton>Refresh</RefreshButton>
                                    <Clear>Clear</Clear>

                                    </div>
                        </LeftDiv>

                        <LeftDiv>
                                    <TestwebhookBTN onClick={testWebhook}>Test Webhook</TestwebhookBTN>
                                    <Starttasks>Start All Tasks</Starttasks>
                                    <StopTasks>Stop All Tasks</StopTasks>

                        </LeftDiv>

                        
                        <LeftDiv>
                             <OpenCapBTn onClick={opencapwindow}>Open Captcha</OpenCapBTn>
                             <CloseCapBTN>Close All Captchas</CloseCapBTN>

                            
                        </LeftDiv>
            </Data>
            
       
    
           
        </Body>
    )
}



const CloseCapBTN = styled.button`
margin-top:10px;
width:130px;
height:40px;
text-align:center;
margin-left:10px;
outline:none;
border:none;
border-radius:3px;
background-color: rgb(38, 36, 53);
color:white;
cursor: pointer;
font-family: 'Inter', sans-serif;

:hover{
    border:1px solid red;
}
`

const OpenCapBTn = styled.button`
margin-top:10px;
width:130px;
height:40px;
font-family: 'Inter', sans-serif;

text-align:center;
margin-left:10px;
outline:none;
border:none;
border-radius:3px;
background-color: rgb(38, 36, 53);
color:white;
cursor: pointer;
:hover{
    border:1px solid green;
}
`

const CloseButton = styled.button`
margin-left:203px;
background-color:#363645;
outline:none;
border:none;
color:white;
cursor:pointer;

`



const Clear = styled.button`
margin-top:10px;
width:100px;
height:25px;
text-align:center;
margin-left:25px;
outline:none;
border:none;
border-radius:3px;
background-color: rgb(38, 36, 53);
color:white;
cursor: pointer;
font-family: 'Inter', sans-serif;

`
const Starttasks = styled.button`
margin-top:20px;
margin-left:15px;
width:120px;
height:30px;
border-radius:2px;
text-align:center;
outline:none;
border:none;
background-color: #0f6951;
color:#25c298;
color:white;
cursor: pointer;
font-family: 'Inter', sans-serif;

`
const StopTasks = styled.button`
margin-top:20px;
margin-left:15px;
width:120px;
height:30px;
border-radius:2px;
text-align:center;
outline:none;
border:none;
background-color: #a84032;
color:#d47f31;
color:white;
cursor: pointer;
font-family: 'Inter', sans-serif;

`
const TestwebhookBTN = styled.button`
margin-top:20px;
margin-left:15px;
width:120px;
height:30px;
border-radius:2px;
text-align:center;
outline:none;
border:none;
background-color: rgb(38, 36, 53);
color:white;
cursor: pointer;
font-family: 'Inter', sans-serif;

`

const StatData = styled.div`
margin-left:10px;
margin-top:5px;

`
const Data = styled.div`
justify-content: space-evenly;
display: flex;

`

const RefreshButton = styled.button`
margin-top:30px;
width:100px;
height:25px;
text-align:center;
margin-left:25px;
outline:none;
border:none;
border-radius:3px;
background-color: rgb(38, 36, 53);
color:white;
cursor: pointer;
`

const LeftDiv = styled.div`
border: 1px solid white;
height:168px;
width:150px;
background: rgb(21, 21, 32);
margin-top:5px;
border-radius: 2px;

`
const TEXT = styled.div`
    -webkit-app-region: drag;
    margin-left:10px;
    margin-right:90px
`
const TopDragBar = styled.div`
text-align: center;
display:flex;
background-color:#363645;
height:20px;
width:500px;
text-align:center;
font-size:15px;
`

const Body = styled.div`
border-radius:10px;
font-family: 'Inter', sans-serif;

`