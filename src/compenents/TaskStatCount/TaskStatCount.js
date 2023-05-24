import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import cartImg from './images/shopping-cart.svg'
import checkImg from './images/check-circle.svg'
import declineImg from './images/x-circle.svg'
export default function TaskStatCount({totalTaskss}) {
const [carted, setCarted] = useState(0)
const [checkedOut, setCheckedOut] = useState(0)
const [declined, setDeclined] = useState(0)
const [totalTasks, setTotalTasks] = useState(0)
const [runningTasks, setRunningTasks] = useState(0)

useEffect(() => {
    setTotalTasks(totalTaskss || 0)

})


    return (
        <Container>
            <CheckedOutContainer>
                <img src={checkImg} />
                {checkedOut}</CheckedOutContainer>
            <DeclineContainer> 
                     <img src={declineImg} />
            {declined}</DeclineContainer>
            <CartedContainer >
                <img src={cartImg} />
            {carted}</CartedContainer>
            <TotalTasks>{totalTasks} tasks</TotalTasks>
            <Divder>|</Divder>
            <TotalTasks>{runningTasks} tasks running</TotalTasks>

        </Container>
    )
}

//#34eb7c green img
//yellow img #E7ff00
//red img #ee0c41
const Divder = styled.div`
padding-left:10px;

`
const TotalTasks = styled.p`
font-size:12px;
padding-left:10px;
`

const CartedContainer = styled.div`
height:20px;
width:55px;
background-color:
#373843;
margin-left:10px;
border-radius:5px;
display:flex;
img{
    color:#E7ff00;
    padding-right:5px;
    padding-left:10px;
    height:15px;
    width:15px;
    padding-top:2px;
}
`
const DeclineContainer = styled.div`
height:20px;
width:55px;
background-color:
#373843;
margin-left:10px;
border-radius:5px;
display:flex;
img{
    color:#E7ff00;
    padding-right:5px;
    padding-left:5px;
    height:15px;
    width:15px;
    padding-top:2px;

}
`
const CheckedOutContainer = styled.div`
height:20px;
width:55px;
background-color:
#373843;
margin-left:10px;
border-radius:5px;
display:flex;
img{
    color:#E7ff00;
    padding-right:5px;
    padding-left:5px;
    height:15px;
    width:15px;
    padding-top:2px;
}
`
const Container = styled.div`
height:28px;
width:395px;
background-color:#272733;
margin-left:200px;
margin-top:-5px;
border-radius:8px;
display:flex;
align-items:center;

`