import React, {useState} from 'react'
import styled from 'styled-components'
import copyimg from './images/copy.svg'
import trashimg from './images/trash-2.svg'
import axios from 'axios'
import cardBDG from './images/card.webp'
export default function Profile({profile, updateprofilefunction, profileCard}) {
let newnamedProfile = profile.split(".json")

const [cardDigets, setcardDigets] = useState("")


axios.get(`http://localhost:3085/api/profile/getdigets?profile=${profile}`).then(function(response) {
   setcardDigets(response.data.slice(- 4))
})


function profileRemove(){

    axios.post(`http://localhost:3085/api/profile/remove?Profile=${profile}`).then(response =>{
        if(response.status === 200){
           updateprofilefunction()
        }else{
            alert("Error Removing Profile")
        }
    })

}

function profileCopy(){
    axios.post(`http://localhost:3085/api/profile/copy?Profile=${profile}`).then(response =>{
        if(response.status === 200){
           updateprofilefunction()   
        }else{
            alert("Error Copying Profile")
        }
    })

}

    return (
        <MainProfileCard>
               <ProfileIMGEditIcon src={copyimg} onClick={profileCopy}/>
               <ProfileIMGEditIcon src={trashimg} onClick={profileRemove}/>
               <MainProfileName>{newnamedProfile}</MainProfileName>
               <ProfileDig>**** **** **** {cardDigets}</ProfileDig>


             

        </MainProfileCard>
    )
}

const ProfileIMGEditIcon = styled.img`
width:15px;
height:15px;
padding-left:10px;
padding-top:10px;
cursor: pointer;
`

const ProfileDig = styled.p`
text-align:center;
font-size: 14px;
font-family: 'Inter', sans-serif;


`

const MainProfileName = styled.p`
text-align:center;
font-size: 15px;
font-family: 'Inter', sans-serif;
font-weight: bold;

`

const MainProfileCard = styled.div`
 font-family: 'Inter', sans-serif;
background-color:rgb(39, 37, 51);
height:160px;
width:260px;
margin-top:20px;
margin-left:30px;
border-radius:6px;
color:white;
overflow:hidden;
border: none;
//background-image: "https://img.freepik.com/free-vector/halloween-background-flat-design_52683-43845.jpg?size=626&ext=jpg";
background-image: linear-gradient(to bottom right, rgb(39, 37, 51),  rgb(52, 51, 61));

`