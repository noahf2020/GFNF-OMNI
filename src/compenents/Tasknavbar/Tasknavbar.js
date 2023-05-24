import React from 'react'
import styled from 'styled-components'
export default function Tasknavbar() {
    return (
        <>
           <NavBar>
              
                      
                           <Select>Select</Select>
                           <Site>Site</Site>
                           <Product>ASAIN</Product>
                           <Mode>Mode</Mode>
                           <Proxygroup>Proxy Group</Proxygroup>
                           <Profile>Profile</Profile>
                           <Status>Status</Status>
                           <Actions>Actions</Actions>
                       
           
            </NavBar> 
        </>
    )
}
const Actions = styled.span`
margin-left:110px;

`
const Status = styled.span`
margin-left:85px;

`
const Profile = styled.span`
margin-left:45px;

`
const Proxygroup = styled.span`
margin-left:50px;

`
const Mode = styled.span`
margin-left:75px;


`
const Product = styled.span`
margin-left:65px;
`
const Site = styled.span`
margin-left:30px;
`
const Select = styled.span`
margin-left:10px;
`

const NavBar = styled.nav`
height:35px;
width:890px;
background-color:#282836;
border-radius:5px;
margin-left: 144px;
margin-bottom:5px;
margin-top:5px;
display: flex;
 align-items: center;
`