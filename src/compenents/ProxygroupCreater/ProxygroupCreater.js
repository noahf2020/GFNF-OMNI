import React from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import axios from 'axios'

export default function ProxygroupCreater({CloseFunction, toast, proxyGroupUpdater, editData, setEditData}) {
    const { register, handleSubmit,  reset  } = useForm({});
    if(editData){
        reset({
            proxyGroupName: editData[0].proxyGroupName[0],
            proxies:editData[0].proxies
          });
    }
  

    const onSubmit = (data, e) => CreateGroup(data)
    const onError = (errors, e) => console.log(errors, e);
  
    function CreateGroup(data){
        CloseFunction()  
        setEditData([])
        axios.post('http://localhost:3085/api/proxy/create', [{
            proxyGroupName:data.proxyGroupName,
            proxies:data.proxies
    
        },]).then(response=>{
if(response.status === 200){
    proxyGroupUpdater()
}else{
    alert("error")
}
        })
     
    }

    return (
        <>
            <MainBackGroundPopup>
                           <MainXBTN onClick={CloseFunction}>x</MainXBTN>

       <form onSubmit={handleSubmit(onSubmit, onError)}>
            <ProxyGroupNameInput {...register("proxyGroupName")} placeholder="Proxy Group Name"></ProxyGroupNameInput>
      <ProxyInputSection >
                <RealProxyInputSection {...register("proxies")} >Paste Proxies Here</RealProxyInputSection>
      </ProxyInputSection>
      <SaveSettingBTN type="submit" onClick={()=>{}}>Save Proxy Group</SaveSettingBTN>
        </form>

            </MainBackGroundPopup>
        </>
    )
}

//![AlienRecall's GitHub stats](https://github-readme-stats.vercel.app/api?username=AlienRecall&show_icons=true&theme=radical&include_all_commits=True&count_private=True)
//![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=AlienRecall&langs_count=5)
//![AlienRecall's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=AlienRecall)


const SaveSettingBTN = styled.button`
height:35px;
width:195px;
background: #2b67b5;
color:white;
outline: none;
border: none;
border-radius: 6px;
cursor:pointer;
margin-left:370px;
font-size:16px;
font-family: 'Atkinson Hyperlegible', sans-serif;
margin-top:10px;
:hover{
    border: 1px solid rgb(17, 209, 74)


}

`

const RealProxyInputSection = styled.textarea`

resize: none;
background: rgb(30, 29, 41);
outline:none;
border:none;
width:450px;
height:220px;
padding-left:10px;
padding-top:10px;
border-radius: 20px;
color:white;

text-align: left;

`

const ProxyInputSection = styled.div`
margin-top:35px;
background: rgb(30, 29, 41);
border: 2px solid rgb(113, 110, 133);
width:470px;
height:240px;
margin-left:50px;
border-radius: 20px;
color:white;
outline:none;
text-align: left;
`


const ProxyGroupNameInput = styled.input`
color:white;
background-color:rgb(68, 64, 87);
height:30px;
width:300px;
border-radius:5px;
margin-left:140px;;
outline:none;
border:none;
text-align-last: center;
margin-top:40px;
:focus {
  background-color:  rgb(51, 48, 69);
}
`

const MainXBTN = styled.button`
background-color: rgb(38, 36, 53);
color:white;
height:20px;
width:20px;
border:none;
outline:none;
cursor: pointer;
justify-content:end;


`

const MainBackGroundPopup = styled.div`
background-color: rgb(38, 36, 53);
border-radius: 3px;
width:620px; 
height:430px;
display:flex;
overflow-x:scroll;
overflow-y: scroll;
position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border: 1px solid white
  

`