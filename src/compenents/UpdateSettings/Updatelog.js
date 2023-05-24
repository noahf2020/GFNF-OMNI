import React from 'react'
import styled from 'styled-components'
export default function Updatelog({updateData}) {
    console.log(updateData.UpdateLogs)
    return (
        <Box>
           <UpdateLogBox>
                    <UpdateLogHeader>Update Changelog: {updateData.Version}</UpdateLogHeader>
                    <UpdateLogChanges>Changes: 
                        {
                        updateData.UpdateLogs.map(change =>{
                        return <Change>{change}</Change>
                                                                 }) 
                        }
                    <UpdatelogNotes>Notes: 
                        {
                           <Notes>{updateData.Notes}</Notes>
                        
                        }</UpdatelogNotes>
                    <UpdatelogDate>Date: {updateData.Date}</UpdatelogDate>
                    </UpdateLogChanges>
           </UpdateLogBox>
        </Box>
    )
}




const UpdatelogDate = styled.p`
font-size:10.5px;
margin-top:50px;
font-family: 'Inter', sans-serif;

`

const Notes = styled.li`
font-size:12.5px;
`
const UpdatelogNotes = styled.p`
font-size:15.5px;
margin-top:40px;
`

const Change = styled.li`
color:white;
font-size:12.5px;
padding-top:4px;
margin-left:15px;
`

const UpdateLogChanges = styled.p`
font-size:16px;
text-align:left;
padding-left:5px;
`

const UpdateLogHeader = styled.p`
font-size:16px;
font-family: 'Inter', sans-serif;

`

const UpdateLogBox = styled.div`
width:200px;
height:275px;
border-radius:5px;
background-color:rgb(55, 53, 69);
border: 1.67px solid rgb(113, 110, 133);
font-family: 'Inter', sans-serif;
`

const Box = styled.div`
align-items:center;
display:flex;
font-family: 'Inter', sans-serif;
justify-content:center;
margin-top:20px;
text-align:center;
`