import React,{useState} from 'react'
import styled from 'styled-components'
import Updateloglist from './Updateloglist'

export default function UpdateSettings() {
//useState
const [btnTXT, setBTNTXT] = useState("Check For Updates")
const checkUpdate = () => {
  window.electron.send("checkUpdate");

}

    return (
    <>
        <Box>
            <UpdateDataBox>
                        <CurrentVersion>Current Version: 0.1.0</CurrentVersion>
                        <CheckForUpdatesBTN onClick={checkUpdate}>{btnTXT}</CheckForUpdatesBTN>
            </UpdateDataBox>
        </Box>

              <Updateloglist />
    </>
        
    )
}


const CheckForUpdatesBTN = styled.button`
height:35px;
width:150px;
background: #2b67b5;
color:white;
outline: none;
border: none;//1.67px solid white;// rgb(113, 110, 133);
border-radius: 6px;
font-size: 12px;
margin-left:23.5px;
cursor:pointer;
font-family: 'Inter', sans-serif;



`

const CurrentVersion = styled.p`
font-size:15px;
text-align:center;
font-family: 'Inter', sans-serif;
`


const UpdateDataBox = styled.div`
width:200px;
height:100px;
border-radius:5px;
background-color:rgb(55, 53, 69);
border: 1.67px solid rgb(113, 110, 133);
margin-top:20px;
font-family: 'Inter', sans-serif;
`

const Box = styled.div`
align-items:center;
display:flex;
font-family: 'Inter', sans-serif;
justify-content:center;

`