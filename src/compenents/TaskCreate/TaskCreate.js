import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import axios from 'axios'


export default function TaskCreate({CloseFunction, profile, proxy,updateTasks}) {
  const [sites, setSites] = useState([{label:"Amazon", value:"Amazon"} ])
  const [profiles, setProfiles] = useState([])
  const [modes, setModes] = useState([{label:"Safe", value:"Safe"},{label:"Turbo", value:"Turbo"},{label:"Monitor", value:"Monitor"}])
  const [proxys, setProxygroups] = useState([])
  const [selectedMode, setselectedMode] = useState("")

  
  const { register, handleSubmit,  reset ,getValues } = useForm({});

  useEffect(()=>{
    console.log(setProxygroups)
  profile.then(function(result) {
          result.forEach(profile =>{ 
              setProfiles((prevState) =>([
                ...prevState, {label: profile.split(".json")[0], value: profile}
              ]))
            })
        })
      proxy.then(function(result) {
  
        setProxygroups((prevState) =>([
          ...prevState, {label: "localhost", value: "localhost"}
        ]))
          result.forEach(prox =>{ 
            setProxygroups((prevState) =>([
                ...prevState, {label: prox.split(".txt")[0], value: prox}
              ]))
            })
        })

  },[])


const manageCreateTask = (data) =>{

if(data.sku && data.size && data.taskqnty){
  axios.post('http://localhost:3085/api/task/create', [{
    data:data
},]).then(response=>{
if(response.status == 200){
  CloseFunction()
  updateTasks()

}
})
}else{
  alert("Task Field Not Complete")
}


}


  const onSubmit = (data, e) => manageCreateTask(data);
  const onError = (errors, e) => console.log(errors, e);


  useEffect(()=>{
   
    setInterval(() => {
      const singleValue2= getValues("mode");
      console.log(singleValue2)
      setselectedMode(singleValue2)
      }, 1000)
  },[])
  
  

  return (
    <>
      <MainBackGroundPopup>
           <MainXBTN onClick={CloseFunction}>x</MainXBTN>
           <Title><h3>Create Tasks</h3></Title>
               <form onSubmit={handleSubmit(onSubmit, onError)}>
                 <SelectSite   {...register("site")} >
                        <option value="null">Select A Site</option>
                        {sites.map(site => (
                              <option key={site.value} value={site.value}>{site.label} </option>
                            ))}
                 </SelectSite>
                        <Pidandsize>
                        <ProfileSelect   {...register("profile")} >
                               <option value="null">Select A Profile</option>
                               {profiles.map(profile => (
                                   <option key={profile.value} value={profile.value}>{profile.label} </option>
                                  ))}
                        </ProfileSelect>
                        <ProfileSelect  {...register("mode")} >
                              <option value="null"    >Select A Mode</option>
                              {modes.map(mode => (
                                   <option key={mode.value} value={mode.value}>{mode.label} </option>
                                  ))}
                        </ProfileSelect>
                        </Pidandsize>
                        <Pidandsize>
                              <Skuinput {...register("sku")}  placeholder="ASIN" />
                              <Skuinput  {...register("offerid")}  placeholder="Offer ID" />

                              <Skuinput {...register("size")} placeholder="Size" />
                        </Pidandsize>
                        <Pidandsize>
                                  <ProxySelect   {...register("proxygroup")} >
                                    <option value="null">Select A Proxy Group</option>
                                        {proxys.map(proxy => (
                                      <option key={proxy.value} value={proxy.value}>{proxy.label} </option>
                                      ))}
                                  </ProxySelect>
                                  <TaskQNTY   {...register("taskqnty")} placeholder="Task Quantity" />
                                  <TaskQNTY   {...register("account")} placeholder="Account:pass" />
                                     
                        </Pidandsize>
                        {
                                           selectedMode == "Monitor" && (
                                             <Delay>
                                               <DelayInput   {...register("delay")} placeholder="Monitor Delay" />
                                               <LABEL for="name">Community Monitor</LABEL>
                                               <Comminity  {...register("communityMonitor")}  type="checkbox"></Comminity>
                                             </Delay>
                             
                                           
                                           )
                                         }
              <br />
              <br />
           

        <CreateTasksBTN type="submit">Create Task</CreateTasksBTN>               
                </form>
     
       
      </MainBackGroundPopup>
    </>
  )
}

const LABEL = styled.label`
font-size:13px;
margin-top:18px;
`
const Comminity = styled.input`
margin-top:20px;
`
const DelayInput = styled.input`
height:30px;
width:200px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:10px;
margin-top: 10px;;
align-items:center;
`

const CreateTasksBTN = styled.button`
background-color: #2b67b5;
color:#25c298;
margin-left:250px;
color:white;
border:none;
outline: none;
cursor: pointer;
width:160px; 
height:30px;
border-radius: 4px;
font-family: 'Inter', sans-serif;


`

const TaskQNTY = styled.input`
height:30px;
width:100px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:10px;
margin-top: 10px;
align-items:center;
`
const ProxySelect = styled.select`
height:30px;
width:200px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:10px;
margin-top: 10px;
align-items:center;
`

const ProfileSelect = styled.select`
height:30px;
width:200px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:10px;
margin-top:20px;;
align-items:center;

`
const Delay = styled.div`
flex-direction: row;
align-items:left;
justify-content: space-between;
display:flex;
margin-left:5px;

`

const Pidandsize = styled.div`
flex-direction: row;
align-items:left;
justify-content: space-between;
display:flex;
margin-left:5px;

`


const Skuinput = styled.input`
height:30px;
width:100px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:10px;
margin-top: 10px;;
align-items:center;

`

const SelectSite = styled.select`
height:30px;
width:270px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;
margin-left:90px;
align-items:center;

`

const Title = styled.div`
height:70px;
width:200px;
margin-left:10px;
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
border-radius: 4px;
width:440px; 
height:390px;
display:flex;
flex-direction: column;
overflow-x:scroll;
overflow-y: scroll;
position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border: 1px solid white;

font-family: 'Inter', sans-serif;
  
`