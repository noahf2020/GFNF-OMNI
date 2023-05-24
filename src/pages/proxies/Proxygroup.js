import React from 'react'
import styled from 'styled-components'
import trashimg from './images/trash-2.svg'
import editimg from './images/edit.svg'

import axios from 'axios'


export default function Proxygroup({proxyGroup, UpdateProxyGroupsfunction,setEditTab,setEditData}) {
    

   let proxyGroupName = proxyGroup.split(".txt")


   function removeProxyGroup(){
    axios.post(`http://localhost:3085/api/proxy/remove?Proxygroup=${proxyGroup}`).then(response =>{
        if(response.status === 200){
            UpdateProxyGroupsfunction()
        }else{
            alert("Error Removing Profile")
        }
    })
   }


   function editProxyData(){

    axios.get(`http://localhost:3085/api/proxy/get/data?Proxygroup=${proxyGroup}`).then(response =>{
        if(response.status === 200){
           
            setEditData([{
                proxyGroupName:proxyGroupName,
                proxies:response.data
            }])
            setEditTab()
        }else{
            alert("Error Getting Proxy Data")
        }
    })


   
   }

    return (
        <MainProxygroupCard>
          
               <MainProfileName>{proxyGroupName}</MainProfileName>
               <ProfileIMGEditIcon src={editimg} onClick={editProxyData}/>
               <ProfileIMGEditIcon src={trashimg} onClick={removeProxyGroup}/>
               
              


        </MainProxygroupCard>
    )
}



const ProfileIMGEditIcon = styled.img`
width:15px;
height:15px;
padding-left:10px;
padding-top:5px;
cursor: pointer;
`

const MainProfileName = styled.p`
text-align:center;
font-size: 15px;
`

const MainProxygroupCard = styled.div`
 font-family: 'Inter', sans-serif;
background-color:rgb(39, 37, 51);
height:80px;
width:260px;
margin-top:20px;
margin-left:30px;
border-radius:6px;
color:white;
overflow:hidden;
border:none;
:hover{
   // border: .001px solid #EC6FAE;
    
}
//background-image: linear-gradient(to bottom right, rgb(39, 37, 51),  rgb(52, 51, 61));
background-image: url("http://www.simpleimageresizer.com/_uploads/photos/d0e786dc/hallow_260x80.jpg");
`