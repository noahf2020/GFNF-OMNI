import React,{useState} from 'react'
import styled from 'styled-components'
export default function Quickstat() {
const [checkouts, setCheckouts] = useState("2300")
const [declines, setdeclines] = useState("5200")
const [spent, setSpent] = useState("10,200")



    return (
        <MAINDIV>
           <CheckOutBOX>
               <h3 style={{paddingLeft:'10px', color:'#b5f5c1'}}>Total Checkouts:</h3>
               <h2 style={{paddingLeft:'10px', textAlign:'center'}}>{checkouts}</h2>

           </CheckOutBOX>
            <DeclineBox>
                <h3 style={{paddingLeft:'10px', color:'#ff758a'}}>Total Declines:</h3>
                <h2 style={{paddingLeft:'10px', textAlign:'center'}}>{declines}</h2>
            </DeclineBox>
            <SpentBOX>
               <h3 style={{paddingLeft:'10px', color:'#b5f5c1'}}>Total Spent:</h3>
               <h2 style={{paddingLeft:'10px', textAlign:'center'}}>${spent}</h2>

           </SpentBOX>
        </MAINDIV>
    )
}
const SpentBOX = styled.div`
height:120px;
width:240px;
background-color:#5cacfb;
border-radius:5px;
:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
}
margin-right:20px;

`

const DeclineBox = styled.div`
height:120px;
width:200px;
background-color:#ed262d;
border-radius:5px;
:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
}
margin-right:20px;

`
const CheckOutBOX = styled.div`
height:120px;
width:200px;
background-color:#40e609;
border-radius:5px;
margin-right:20px;
cursor: pointer;
:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
}
`


const MAINDIV = styled.div`
//background-color: yellow;
height:150px;
width:700px;
margin-left:240px;
margin-top:20px;
display:flex;
align-items: center;

`