import React,{useState, useEffect} from 'react'

export default function Captcha() {
        const [isLoggedIn, setIsLoggedIn] = useState(false)

const manageLogin = () =>{
    setIsLoggedIn(!isLoggedIn)
}


if(isLoggedIn == false){
    window.electron.send("openGoogleCapWindow");

}else{
    return (
        <>

        </>
    )
}
 
}
