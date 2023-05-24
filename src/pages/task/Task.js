import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import startIMG from './images/play-circle.svg'
import editIMG from './images/edit-2.svg'
import trashIMG from './images/trash.svg'
import Pause from './images/pause.svg'
export default function Task({task, updateTaskfunc}) {
console.log(task)
    const [productName, setProductName] = useState("") //set product name once found.
    const [statusColor, setStatusColor] = useState("") 
    const [isSelected, setIsSelected] = useState(false)
    //Working Color: #e3ca29
    //Error Color: #cf4740
    //Success Color: #55d477
    const [status, setStatus] = useState(localStorage.getItem("task-stats"+task) || "Idle")
    const [isRunning, setIsRunning] = useState(false)
    const [isListenerRunning, setIsListenerRunning] = useState(false)

const selectManage = () =>{
    setIsSelected(!isSelected)
}



useEffect(() => {
    if (status) {
        localStorage.setItem("task-stats"+ task, status)
    } else {
        setStatus("Idle");
    }
},[status])

useEffect(() => {
   const storedStatus = localStorage.getItem("task-stats" + task)
   setStatus(storedStatus)
   const storedStatusColor = localStorage.getItem("task-stats-color" + task)
   if (storedStatusColor) {
    setStatusColor(storedStatusColor)
   }
})



    useEffect(() => {

        window.electron.receive(task, (data) => {
             if(data.message.includes("Change Prod")){
           setStatusColor(data.color)
                 setStatus("Found Product..")
              setProductName(data.message.split("Change Prod")[1])
          
           }else{
                setStatusColor(data.color)
                  setStatus(data.message)
              }
            localStorage.setItem("task-stats-color"+ task, data.color)
      })
      
  
  },[isRunning])





const startTask = () =>{
    window.electron.send("startTask",task);
    setIsRunning(true)
}

const deleteTask =()=>{
    axios.post(`http://localhost:3085/api/task/remove?task=${task}`).then(response =>{
        if(response.status === 200){
            updateTaskfunc()
        }else{
            alert("Error Removing Task")
        }
    })
}
    return (
        <Back>

          <TaskBarMain onMouseEnter={selectManage} onMouseLeave={selectManage} style={{ backgroundColor: isSelected ? "#2a2a3b" : "rgb(20, 20, 29)"}}>
                <CheckBox type="checkbox" onClick={selectManage}/>
                <Site>{task.split("-")[0]}</Site>
                <Product>{productName ? productName : task.split("-")[1]}</Product>
                <Mode>{task.split("-")[5]}</Mode>
                <Proxygroup>{task.split("-")[4]}</Proxygroup>
                <Profile>{task.split("-")[2]}</Profile>
                <Status style={{color:statusColor ? statusColor : "white"}}>{status ? status : "Idle"}</Status>
                        <StartIcon>{isRunning ? < img src={Pause} />  : < img src={startIMG} onClick={startTask}/> }</StartIcon>
                        <EditIcon><img src={editIMG} /></EditIcon>
                        <TrashIcon><img src={trashIMG} onClick={deleteTask}/></TrashIcon>

              

          </TaskBarMain>
        </Back>
    )
}

const TrashIcon = styled.button`
height:25px;
width:30px;
border:none;
outline:none;
cursor: pointer;
background-color:inherit;
`

const EditIcon = styled.button`
height:25px;
width:30px;
background-color:inherit;
border:none;
outline:none;
cursor: pointer;

`
const StartIcon = styled.button`
height:25px;
width:30px;
border:none;
outline:none;
cursor: pointer;
background-color:inherit;
margin-left:35px;

`
const Status = styled.label`
width:160px; 
overflow:hidden;
margin-left:10px;

font-family: 'Inter', sans-serif;


`
const Profile = styled.label`
color:grey;
width:115px; 
margin-left:10px;
overflow:hidden;
font-family: 'Inter', sans-serif;

`

const Proxygroup = styled.label`
color:grey;
width:125px; 
margin-left:10px;

overflow:hidden;
font-family: 'Inter', sans-serif;

`
const Mode = styled.label`
color:grey;
width:103px; 
margin-left:10px;
overflow:hidden;
font-family: 'Inter', sans-serif;

`  

const Product = styled.label`
color:grey;
width:135px; 
font-family: 'Inter', sans-serif;
overflow:hidden;

`

const Site = styled.label`
color:grey;
width:103px; 
margin-left:10px;
overflow:hidden;
font-family: 'Inter', sans-serif;


`

const CheckBox = styled.input`
width:20px;
margin-left:10px;

:before{
border:none;
outline:none;
border-radius:90px;
background: #FFF;
}
:checked{
    background-color:#2a2a3b  
}

`
const TaskBarMain = styled.div`
position: relative;
height:39px;
text-align: center;
display:flex;
width:870px;
border-radius:3px;
margin-top:-10px;
overflow:clip;
align-items:center;
font-family: 'Inter', sans-serif;
transition: all 500ms ease;
font-size:14px;


`


const Back = styled.div`
justify-content:center;
display:flex;
margin-left:15px;
margin-top:15px;
font-family: 'Inter', sans-serif;

`