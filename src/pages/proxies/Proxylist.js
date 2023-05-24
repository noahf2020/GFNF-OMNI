import React from 'react'
import Proxygroup from './Proxygroup'
export default function Proxylist({proxyGroups, UpdateProxyGroupsfunction, filterKeyword,setEditTab,setEditData}) {
    return (
        proxyGroups.filter((val) => {
            if(filterKeyword === ""){
                return val
            }else if(val.toLowerCase().includes(filterKeyword.toLowerCase())){
            return val
            }
        }).map(proxyGroup => {
         
            return <Proxygroup  key={proxyGroup.id} proxyGroup={proxyGroup} UpdateProxyGroupsfunction={UpdateProxyGroupsfunction} setEditTab={setEditTab} setEditData={setEditData}/>
        })
    )
}
