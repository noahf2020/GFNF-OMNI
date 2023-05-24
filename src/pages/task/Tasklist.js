import React from 'react'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'
export default function Tasklist({tasks,searchTerm,updateTaskfunc}) {
    return (
       tasks.filter((val) => {
           console.log(val)
        if(searchTerm === ""){
            return val
        }else if(val.toLowerCase().includes(searchTerm.toLowerCase())){
        return val
        }
    }).map(task =>{
           return <Task task={task} key={uuidv4()} updateTaskfunc={updateTaskfunc}/>
       })
    )
}
