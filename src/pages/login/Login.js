import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import fetch from 'node-fetch'
import axios from 'axios'
import {useForm} from 'react-hook-form'

//GFNF-BGEO-XP8L-CGV3-QU1O
export default function Login({settingData,}) {
    const { register, handleSubmit,  reset  } = useForm({});
    const [btnText, setBtnText] = useState("Login")
    const [key, setKey] = useState("")
    useEffect(()=> {
        settingData.then(function(result) {
          try{
            if(result.key){
              checkKey(result.key)
          
             }else{
  
             }
          }catch(err){
            console.log(err)
          }
         

      });
        },[])

const checkKeyIF = (res) =>{
if(res.ok == true){
    console.log(res.json().then(res2 =>{
    axios.post(`http://localhost:3085/api/settings/updatekey?key=${res2.key}`)
    .then(function (response) {
       console.log(response.status)
    
  window.electron.send("closeLoginWin");
    })}))
   
}else if(res.ok == false){
    setBtnText("Invalid Key..")
 
}
}

const checkKey = (key) =>{
    setKey(key)
    console.log(key)
    setBtnText("Checking Key..")
  try {
    fetch(`https://api.hyper.co/v4/licenses/${key}`, {
      headers: {
        'Authorization': `Bearer pk_gj8MvXcFv5Q2Wbs6HNdYhQKeWlpbw9lD`
      }
    }).then(res => checkKeyIF(res));
  } catch {
  alert('License not found')
  }

}

const onSubmit = (data, e) => checkKey(data.key);
const onError = (errors, e) => console.log(errors, e);
    return (
        <MainDiv>
      
            <form onSubmit={handleSubmit(onSubmit, onError)}>
            <KEYBox  {...register("key")} placeholder="XXX-XXX-XXX-XXX" style={{placeholderColor:'green'}}></KEYBox>
            <KeyClickBTn type="submit" >{btnText}</KeyClickBTn>
            </form>
        </MainDiv>
    )
}


const IMG = styled.img`
height:100px;
width:100px;
display:flex;
align-items:center;
justify-content: center;
margin-left:200px;
border-radius:20px;
`

const KeyClickBTn = styled.button`
cursor: pointer;
position: absolute;
width: 130px;
height: 30px;
left: 195.5px;
top: 249.5px;
color:white;
font-weight:bold;
background: linear-gradient(181.39deg, #34D178 -22.77%, #34D178 98.81%);
box-shadow: 0px 20px 73px rgba(52, 209, 120, 0.3);
border-radius: 3.68224px;
border:none;
outline:none;
`

const KEYBox = styled.input`
position: absolute;
width: 278px;
height: 34.5px;
left: 122px;
top: 200px;
outline:none;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.19);
box-sizing: border-box;
backdrop-filter: blur(9px);
color: #626262;
text-align: center;
border-radius: 7px;
`



const MainDiv = styled.div`
background: url('https://media.discordapp.net/attachments/925450704854868019/926568844376547358/unknown.png?width=900&height=606');
width: 520px;
height: 550px;
background-size: 525px 350px;
margin:0px;

`