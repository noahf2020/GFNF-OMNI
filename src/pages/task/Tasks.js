import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import TaskCreate from '../../compenents/TaskCreate/TaskCreate'
import axios from 'axios'
import Tasklist from './Tasklist'
import Tasknavbar from '../../compenents/Tasknavbar/Tasknavbar'
import searchIMG from './images/search.svg'
import {useForm} from 'react-hook-form'
import TaskStatCount from '../../compenents/TaskStatCount/TaskStatCount'


export default function Tasks({taskData}) {

const [taskCreateWindow, setTaskCreateWindow] = useState(false)
const [tasks, setTasks] = useState([])
const [searchTerm, setSearchTerm] = useState("")
const { register, handleSubmit,  reset  } = useForm({});


useEffect(()=> {
    taskData.then(function(result) {
        setTasks(result)
  });
    },[])

const manageCreaterClick = () =>{
    setTaskCreateWindow(!taskCreateWindow)
}
const deleteAll = () =>{
axios.get('http://localhost:3085/api/task/removeall')
    .then(function (response) {
        Updatetask()
    })
}

const startAll = () =>{
    tasks.forEach(task =>{
        window.electron.send("startTask",task);
    })

}


const onSubmit = (data, e) => setSearchTerm(data.term);
const onError = (errors, e) => console.log(errors, e);




function Updatetask(){
        axios.get('http://localhost:3085/api/task/get')
           .then(function (response) {
            setTasks(response.data)
           })
           .catch(function (error) {
               console.log(error);
           });
       }
const profData = axios.get("http://localhost:3085/api/profile/get")
.then(function (response) {
    return response.data;
})

const proxData = axios.get("http://localhost:3085/api/proxy/get")
.then(function (response) {
    return response.data;
})




    return (
        <>
   <TaskStatCount totalTaskss={tasks.length}/>
 <Tasknavbar />
            <Mainbackground>
{tasks.length === 0 &&(
      <Notasks>
      No Tasks; Create some :)
      </Notasks>
)}
{tasks.length > 0 &&(
    <>
        <TASKDIV>
          <Tasklist tasks={tasks} searchTerm={searchTerm}updateTaskfunc={Updatetask}/>
        </TASKDIV>
    </>
)}     
{taskCreateWindow && (
    <>
        <TaskCreate CloseFunction={manageCreaterClick} profile={profData} proxy={proxData} updateTasks={Updatetask}/>
    </>
)

}

            </Mainbackground>

            <MainButtonTray>
                    <StartAllButton onClick={startAll}>Start All</StartAllButton>
                    <StopAllButton>Stop All</StopAllButton>
                    <DeleteAllButton onClick={deleteAll}>Delete All</DeleteAllButton>
                    <Searchbox>
                    <form onChange={handleSubmit(onSubmit, onError)}>
                    <MainBox type="text" {...register("term")} style={{textOverflow: "ellipsis"}} placeholder="Search Tasks, Profiles, Etc.."></MainBox>
                    </form>

                        <img src={searchIMG} />
                    </Searchbox>
                    <CreateTask onClick={manageCreaterClick} >Create Tasks</CreateTask>
            </MainButtonTray>
        </>
    )
}



const MainBox = styled.input`
width:50px;
height:30px;
border-radius:4px;
border:none;
font-family: 'Inter', sans-serif;
outline:none;
background-color:rgb(55, 53, 69);
color:white;
padding-left:30px;
:focus{
    width:170px;
    transition: all 500ms ease;
}
:hover{
    width:100px;
    transition: all 800ms ease;
}
`
const Searchbox = styled.div`
width:175px;
transition: all 500ms ease;
margin-left:70px;
font-family: 'Inter', sans-serif;

position:relative;
img{
    position:absolute;
    bottom:10px;
    left:10px;
    width:15px;
    height:15px;
}
`

const TASKDIV = styled.div`


overflow:scroll;

`
const Notasks = styled.div`
text-align: center;
display: flex;
justify-content: center;
margin-left:350px;
font-weight:bold;
align-items: center;
font-family: 'Inter', sans-serif;

`
const CreateTask = styled.button`
background-color: #2b67b5;
color:white;
border:none;
outline: none;
cursor: pointer;
width:160px; 
height:30px;
border-radius: 4px;
margin-left:60px;
font-family: 'Inter', sans-serif;
font-weight:bold;

`

const DeleteAllButton = styled.button`
background-color: #595661;
color:#2d293b;
border:none;
outline: none;
cursor: pointer;
width:120px; 
height:30px;
border-radius: 4px;
font-family: 'Inter', sans-serif;
font-weight:bold;
margin-left:25px;

`
const StopAllButton = styled.button`
background-color: #a84032;
color:#d47f31;
border:none;
outline: none;
cursor: pointer;
width:140px; 
height:30px;
border-radius: 4px;
font-family: 'Inter', sans-serif;
font-weight:bold;
margin-left:10px;
`

const StartAllButton = styled.button`
background-color: #0f6951;
color:#25c298;
border:none;
outline: none;
cursor: pointer;
width:140px; 
height:30px;
border-radius: 4px;
font-family: 'Inter', sans-serif;
font-weight:bold;


`

const MainButtonTray = styled.div`
display:flex;
padding-top:15px;
margin-left:140px;
`


const Mainbackground = styled.div`
overflow: scroll;
        display:flex;
        height: 490px;
        width: 900px;
        margin-left: 140px;
        background: rgb(30, 29, 41);
        border-radius: 5px;
        flex-wrap:  wrap ;
        font-family: 'Inter', sans-serif;



`