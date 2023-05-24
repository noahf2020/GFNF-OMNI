import React,{useState, useEffect} from 'react'
import styled from 'styled-components'

export default function Usersettings({data,toast}) {
    const [Icon, setIcon] = useState("")
    const [discUser, setDiscUser] = useState("")
    const [plan, setplan] = useState("")
    const [key, setkey] = useState("")


    useEffect(() => {
        data.then(function(result) {
          //OMNI-5AWX-A3KE-S103-W38I if no result.user make sure this example key is saved in root dir on your device, 
          //for testing purposes no key does not cause an error.  MAKE SURE TO CHANGE BEFORE PRODUCTION
          if(result.user){
            setDiscUser(result.user.discord.username + "#" + result.user.discord.discriminator)
            setIcon(result.user.avatar);
            setplan(result.plan.name)
            setkey(result.key)
          }else{

          }
        
            
    })

});



const handleHover = () => {
    navigator.clipboard.writeText(key);
    toast.dark(`Copied Key to Clipboard!`, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });
  }

  const manageClick = () => {
    navigator.clipboard.writeText("https://galena-fnf.hyper.co/login");
    toast.dark(`Copied Dashlink to Clipboard!`, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });
  }
    return (
        <Box>
            <UserDataBox>
                    <UserICon src={Icon}></UserICon>
                    {
                      discUser ? <UseDisplayName>{discUser}</UseDisplayName> : <UseDisplayName>discord#1234</UseDisplayName>
                    }
                    
            </UserDataBox>
            <KeyDataBox>
              {
                key ?  <KeyBox  onClick={handleHover} >GFNF-XXX-XXX-XXX-{key.slice(- 4)}</KeyBox> :  <KeyBox  onClick={handleHover} >GFNF-XXX-XXX-XXX-XXX</KeyBox>
              }
                   
                    
                  {
                    plan ? <KeyType>Key Type: {plan}</KeyType>  : <KeyType>Key Type: NULL</KeyType>  
                  }
                    <ManageSubButton onClick={manageClick}>Manage Subscription</ManageSubButton>
            </KeyDataBox>
        </Box>
    )
}


const ManageSubButton = styled.button`
height:35px;
width:150px;
background: #2b67b5;
color:white;
outline: none;
border: none;//1.67px solid white;// rgb(113, 110, 133);
border-radius: 6px;
font-size: 12px;
margin-bottom:50px;
margin-top:20px;
text-align:center;
cursor:pointer;
font-family: 'Inter', sans-serif;


`

const KeyType = styled.p`
text-align: center;
align-items:center;
justify-content: center;
display:flex;
font-size:12px;
`

const KeyBox = styled.div`
font-size:13px;
width:200px;
height:30px;
border: 1.67px solid rgb(113, 110, 133);
border-radius:5px;
text-align:center;
margin-top:10px;
display:flex;
justify-content: center;
align-items: center;

:hover{
    border: 1px solid white;
 

}
`
const KeyDataBox = styled.div`
overflow:none;
width:220px;
height:160px;
border-radius:5px;
margin-left:13px;
margin-top:40px;
background-color:rgb(55, 53, 69);
border: 1.67px solid rgb(113, 110, 133);
display: flex;
  justify-content: center;


  flex-wrap:  wrap ;

`

const UseDisplayName = styled.p`
color:white;
margin-left:10px;
font-size:15px;
font-weight: 500;
font-family: 'Inter', sans-serif;
`

const UserICon = styled.img`
height:65px;
width:65px;
border-radius:20px;
margin-left:10px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`

const UserDataBox = styled.div`
overflow:none;
width:220px;
height:100px;
border-radius:5px;
margin-left:13px;
background-color:rgb(55, 53, 69);
border: 1.67px solid rgb(113, 110, 133);
margin-top:20px;
display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap:  wrap ;

`
const Box = styled.div`
align-items:center;
font-family: 'Inter', sans-serif;
justify-content:center;
`