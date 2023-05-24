import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import './Proxy.css'
import ProxygroupCreater from '../../compenents/ProxygroupCreater/ProxygroupCreater'
import Proxylist from './Proxylist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export default function Proxy({proxyGroups}) {
    const [isProxyCreateOpen, setIsProxyCreateOpen] = useState(false);

    const [displayProxyGroups, setdisplayProxyGroups] = useState([])
    const [proxyGroupsPulledFromBackend, setproxyGroupsPulledFromBackend]  = useState([])
    const [searchTerm, setsearchTerm] = useState("")
    const [editProxyData, setEditProxyData] = useState()



function UpdateProxyGroups(){
axios.get('http://localhost:3085/api/proxy/get')
    .then(function (response) {
      setproxyGroupsPulledFromBackend(response.data)
      setdisplayProxyGroups(response.data)
      setsearchTerm("")
     
    })
    .catch(function (error) {
        console.log(error);
    });
}


useEffect(()=> {
    proxyGroups.then(function(result) {
        setproxyGroupsPulledFromBackend(result)
        setdisplayProxyGroups(result)

  });
    },[])

    const toggleProxyMakerPopup = () => {
        setIsProxyCreateOpen(!isProxyCreateOpen);
        setEditProxyData()
      }

  
function removeAllProxies(){
///api/proxy/removeall
axios.get('http://localhost:3085/api/proxy/removeall')
    .then(function (response) {
      UpdateProxyGroups()
    })
}

    return (

<>
            <div className="ProfileBTNDiv">
            <input type="text" onChange={(event) => { setsearchTerm(event.target.value);}} placeholder="Search Proxy Groups"className="Search"></input>
                        <button className="ProfileAdd" onClick={toggleProxyMakerPopup}>Create A Proxy Group</button>
                        <button className="ProfileRemove" onClick={removeAllProxies}>Delete All Proxies</button>
                        
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/> {/* Same as */}
            <ToastContainer />


        <Mainbackground>
{displayProxyGroups.length === 0 &&(
  <div className="NoProfilesLeft">
  No Proxy Groups
  </div>
    )
}


{isProxyCreateOpen &&  
                                <>
                                <ProxygroupCreater CloseFunction={toggleProxyMakerPopup}  toast={toast} proxyGroupUpdater={UpdateProxyGroups} editData={editProxyData} setEditData={setEditProxyData}/>
                                </>
}
{displayProxyGroups.length > 0 &&(
<div className="ProfileGroupDiv">
<Proxylist proxyGroups={proxyGroupsPulledFromBackend} UpdateProxyGroupsfunction={UpdateProxyGroups} filterKeyword={searchTerm} setEditTab={toggleProxyMakerPopup} setEditData={setEditProxyData}/>
</div>
       
)
}

        </Mainbackground>

</>

    )
}



const Mainbackground = styled.div`
        overflow: scroll;
        display:flex;
        margin-top: 20px;
        height: 500px;
        width: 900px;
        margin-left: 140px;
        background: rgb(30, 29, 41);
        border-radius: 5px;
        flex-wrap:  wrap ;
        font-family: 'Inter', sans-serif;
`