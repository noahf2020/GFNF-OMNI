import React from 'react'
import Updatelog from './Updatelog'

const updateLog = [
    {
        "Version":"0.1.0",
        "UpdateLogs":['Added Amazon', 'New UI', 'Bug Fixes'],
        "Date":"11/10/2021",
        "Notes": "Please Report Bugs",
      
    },
//  {
    //    "Version":"0.1.1",
    //   "UpdateLogs":[ 'Bug Fixes'],
    //   "Date":"8/17/2021",
    //    "Notes": "Changes"
       // }
 ]

export default function Updateloglist() {
    return (
       updateLog.map(update => {
        return <Updatelog key={update.Version} updateData={update} />

        })
    )
}
