import React, {useState, useEffect} from "react";
import ProfileCreatorPopup from '../../compenents/ProfileCreate/ProfileCreate'
import Profilelist from "./Profilelist";
import './Profiles.css'
import axios from 'axios'
import ProfileImport from "../../compenents/ProfileImport/ProfileImport";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function Profiles({profiles}) {

  const [isOpen, setIsOpen] = useState(false);
  const [isPIOpen,setIsPIOpen] = useState(false)
  const [displayP, setdisplayP] = useState([])
  const [profilesPulledFromBackend, setprofilesPulledFromBackend]  = useState([])
  const [searchTerm, setsearchTerm] = useState("")

function UpdateProfiles(){
 axios.get('http://localhost:3085/api/profile/get')
    .then(function (response) {
      setprofilesPulledFromBackend(response.data)
      setdisplayP(response.data)
      setsearchTerm("")
    })
    .catch(function (error) {
        console.log(error);
    });
}

  useEffect(()=> {
    profiles.then(function(result) {
      setprofilesPulledFromBackend(result)
      setdisplayP(result)
  });
    },[])
 
  
    const togglePopup = () => {
        setIsOpen(!isOpen);
      }
 
      const togglePIPopup = () => {
        setIsPIOpen(!isPIOpen);
      }

      function removeAllProfiles(){

      }
    return (
        <>

<div className="ProfileBTNDiv">
<input type="text" style={{paddingLeft: "15px"}} onChange={(event) => { setsearchTerm(event.target.value);}} placeholder="Search Profiles" className="Search"></input>

            <button className="ProfileAdd" onClick={togglePopup}>Create A Profile</button>
            <button className="ProfileRemove"onClick={removeAllProfiles}>Delete All Profiles</button>
            <button className="ProfileImport" onClick={togglePIPopup}>Import Profile</button>
</div>
<ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        />
                                        {/* Same as */}
                                        <ToastContainer />

<div className="MainBackGround">
{displayP.length === 0 &&(
  <div className="NoProfilesLeft">
  No Profiles
  </div>
    )
}


<Profilelist profiles={profilesPulledFromBackend} updateprofilefunction={UpdateProfiles} filterKeyword={searchTerm}/>

 <div className="ProfileCreator">
  
 {isOpen &&  
        <>
          <ProfileCreatorPopup CloseFunction={togglePopup} updateprofilefunction={UpdateProfiles} toast={toast}/>
        </>
 }

 {isPIOpen &&  
  <>
    <ProfileImport CloseFunction={togglePIPopup} Profiles={profilesPulledFromBackend} updateprofilefunction={UpdateProfiles}/>
  </>
}

 </div>


</div>

</>
    );

}


export default Profiles;