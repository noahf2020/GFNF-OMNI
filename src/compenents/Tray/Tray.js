import React,{useState} from 'react'
import styled from 'styled-components'
import bellIcon from './bell2.svg'



export default function Tray() {
const [isPopup, setPopup] = useState(false)
const close = () =>{
    window.electron.send("closeApp");
}

const settingWin = () =>{
  //  window.electron.smallSettings("createSettingsWindow");
    window.electron.send("createSettingsWindow");

}

let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

    return (
       <TRAY>
                <Time>{hours + ":" + minutes + ":" + seconds} </Time>
                 <Ddivider2>|</Ddivider2>
                 <BbellIcon  onClick={settingWin}><img src={bellIcon}/></BbellIcon>
                 <Ddivider >|</Ddivider>
                 <CloseBTn onClick={close}>x</CloseBTn>
                

      </TRAY>  
    )
}
const TRAY = styled.div`
height:20px;
margin-left:950px;
display:flex;
margin-top:10px;
`

const Time = styled.div`

`
const Ddivider2 = styled.div`
padding-left:5px;
`

const BbellIcon = styled.button`
margin-left:3px;
background-color:inherit;
border:none;
padding-left:10px;
padding-right:10px;
padding-top:3px;

cursor: pointer;
`

const Ddivider = styled.div`

`

const CloseBTn = styled.button`
margin-left:10px;
background-color:inherit;
color:white;
cursor: pointer;
border:none;
font-size:15px;
height:20px;

border-radius:10px;
`