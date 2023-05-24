import React,  {useState, useRef, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import axios from 'axios'



export default function ProfileImport({CloseFunction}) {
    const onDrop = useCallback(acceptedFiles => {
      // console.log(acceptedFiles[0].path)
      }, [])

  

    return (
        <>
            <MainBackGroundPopup>
                 <MainXBTN onClick={CloseFunction}>x</MainXBTN>
                            <DragandDropDiv>
                                       
                            </DragandDropDiv>
                  

            </MainBackGroundPopup>
        </>

    )
}

const DragandDropDiv = styled.div`
text-align:center;
justify-content:center;
background-color: rgb(51, 49, 64);
border-radius: 3px;
width:400px; 
height:200px;
display:flex;
overflow-x:scroll;
overflow-y: scroll;
position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border: 3px solid rgb(96, 95, 102)
  

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
width:600px; 
height:400px;
display:flex;
overflow-x:scroll;
overflow-y: scroll;
position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border: 1px solid white
  


`
