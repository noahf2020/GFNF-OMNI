import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import styled from 'styled-components'
import taskimg from './images/airplay.svg'
import cardimg from './images/credit-card.svg'
import wifiimg from './images/wifi.svg'
import toolimg from './images/tool.svg'
import shopbag from './images/shopbag.svg'
import folderMinus from './images/folder-minus.svg'
import BARIMG from './images/bar-chart.svg'

import log from './images/log.jpg'
import { useLongPress } from 'use-long-press';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
  
export default function Sidebar({page}) {
  const bind = useLongPress(() => {
   console.log("HI")
  });
const [Page, setPage] = useState("")



useEffect(() => {
  setPage(page)

});

//<img src={avatar} />
    return (


<div class="sidenav">
  <Header {...bind} >
  <img   src={log} />

  </Header>
 
<Line />
  <Pages>
     <a href="/dashboard" style={{backgroundColor: page == "dashboard" ? "#2b5994" : "" }}>
      <img src={BARIMG} />
      <span></span>
      </a>

      <a href="/task" style={{backgroundColor: page == "task" ? "#2b5994" : ""}}>
      <img src={folderMinus} />
      <span></span>
      </a>
  
        <a href="/profile" style={{backgroundColor: page == "profile" ? "#2b5994" : ""}}>
      <img src={cardimg} />

        <span></span>
        </a>
        <a href="/proxy" style={{backgroundColor: page == "proxy" ? "#2b5994" : ""}}>
      <img src={wifiimg} />

        <span></span>
        </a>


        <a href="/setting " style={{ backgroundColor: page == "setting" ? "#2b5994" : ""}}>
           <img src={toolimg} />

        <span></span>
     
        </a>


  </Pages>
 <Bottom>
   
 

 </Bottom>
</div>


    )
}

const Line = styled.div`
background-color:grey;
height:1px;
width:30px;
margin-left:25px;
margin-bottom:50px

`
const Header = styled.button`
background-image: 'https://pbs.twimg.com/profile_images/1347337377124147201/1Psx6u9C_400x400.jpg';
display:flex;
padding-left: 10px;
font-size: 22.9px;
margin-bottom: 40px;
background-color:rgb(20, 20, 29);
text-align: center;
border:none;
margin-left:0px;
font-family: 'Cabin', sans-serif;
    color: white;
    -webkit-app-region: drag;
  img{
height:60px;
width:60px;
border-radius:10px;
  }
`

const Pages = styled.div `
font-family: 'Cabin', sans-serif;
color: white;



a{
  transform:  scale(1);
  transition: .30s;
  margin-top:5px;
display:flex;
font-size: 14px;
font-family: 'Cabin', sans-serif;
border-radius:10px;
:hover{
  background-color:#2b67b5;
  transition: all 400ms ease;

}
width:35px;
height:9px;
padding-top:15px;
padding-left:10px;
align-items: center;
justify-content: center;
padding-bottom: 20px;
    img{
        margin-right: 10px;
       
    }


}
`

const Bottom = styled.div `
font-size: 13px;
font-family: 'Cabin', sans-serif;
align-items: center;
text-align: center;
margin-top: 230px;
img{
  margin-top:15px;
  height:30px;
  border-radius:10px;
}
`