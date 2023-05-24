import React from 'react'
import Profile from './Profile'

export default function Profilelist({profiles, updateprofilefunction, filterKeyword}) {

    return (
    
        profiles.filter((val) =>{
            if(filterKeyword == ""){
                return val
            }else if(val.toLowerCase().includes(filterKeyword.toLowerCase())){
              //  return
            return val
            }
        }).map(profile => {
         
            return <Profile key={profile.id} profile={profile} updateprofilefunction={updateprofilefunction}/>
        })
)

}
