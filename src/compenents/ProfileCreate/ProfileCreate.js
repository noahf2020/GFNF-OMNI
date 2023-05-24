import React,  {useState, useRef} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


export default function ProfileCreate({CloseFunction,updateprofilefunction, toast }) {
    const [formStep, setFormStep] = useState(0)
    const [profileName, setProfileName] = useState()
    const [fullNameState, setFullname] = useState()
    const [emailState, setEmail] = useState()
    const [phonenumberState, setPhonenumber] = useState()
    const [addressLine1State, setAdressline1] = useState()
    const [adressLine2State, setAdressline2] = useState()
    const [cityState, setCity] = useState()
    const [zipcodeState, setZipcode] = useState()
    const [stateState, setState] = useState()
    const [countryState, setCountry] = useState()

  



    const profilename = useRef();
    const fullname = useRef();
    const email = useRef();
    const phonenumber = useRef();
    const addressline1 = useRef();
    const addressline2 = useRef();
    const city = useRef();
    const zipcode = useRef();
    const state = useRef();
    const country = useRef();
    const cardnumber = useRef();
    const cardcvv = useRef();
    const cardexpo = useRef();





const NextPageFunction = () =>{
    
 if(formStep === 0){
   if(profilename.current.value.length > 0 && fullname.current.value.length > 0 && phonenumber.current.value.length > 0 && email.current.value.length > 0){
    setProfileName(profilename.current.value)
    setFullname(fullname.current.value)
    setEmail(email.current.value)
    setPhonenumber(phonenumber.current.value)
    setFormStep(cur=> cur+1)
   }else{
    toast.error('Please Fill All Inputs!', {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });
   }
 
 }else if(formStep === 1){
   if(addressline1.current.value.length > 0 && city.current.value.length > 0 && zipcode.current.value.length > 0 && state.current.value.length > 0 && country.current.value.length > 0){
    setAdressline1(addressline1.current.value)
    setAdressline2(addressline2.current.value)
    setCity(city.current.value)
    setZipcode(zipcode.current.value)
    setState(state.current.value)
    setCountry(country.current.value)
    setFormStep(cur=> cur+1)

   }else{
    toast.error('Please Fill All Inputs (1)!', {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });
   }

 
 }
}

const CompleteProfileFunction = () =>{
 console.log(cardnumber.current.value.length)
 console.log(cardcvv.current.value.length)
 console.log(cardexpo.current.value.length)

if(cardnumber.current.value.length > 10 && cardcvv.current.value.length > 2 && cardexpo.current.value.length > 3){
  axios.post(
    `http://localhost:3085/api/profile/create?id=${uuidv4()}&Profile=${profileName}&Fullname=${fullNameState}&Email=${emailState}&Phonenumber=${phonenumberState}&Address1=${addressLine1State}&Address2=${adressLine2State}&City=${cityState}&Zipcode=${zipcodeState}&State=${stateState}&Country=${countryState}&Cardnum=${cardnumber.current.value}&Cvv=${cardcvv.current.value}&CardExpo=${cardexpo.current.value}
        `).then(response=>{
              console.log(response.status)
          })
      
        CloseFunction()
        updateprofilefunction()
}else{
  toast.error('Please Fill All Inputs (2)!', {
    position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    });
}


}


    return (
        <>
            <MainBackGroundPopup>
                      <MainXBTN onClick={CloseFunction}>x</MainXBTN>
                                        
                      <MainFormDiv>
          
                      {formStep === 0 && (
                          <>
                <ProfileNameInput  placeholder="Profile Name" ref={profilename} />

            <MainPageEmalandPhoneInput>
                <FullNameInput ref={fullname} placeholder="Full Name"/>
                <FullEmailIput ref={email} placeholder="Email"/>
                <FullPhonenumInput ref={phonenumber} placeholder="Phone Number"/>

            </MainPageEmalandPhoneInput>
            </>
            )}
            {formStep === 1 && (
                <>
            
            <MainPageAddressInput>
                    <AddressLine1Input ref={addressline1} placeholder="Address Line 1"/>
                    <AddressLine2Input ref={addressline2} placeholder="Address Line 2"/>
                    <City ref={city} placeholder="City"/>
            </MainPageAddressInput>

            <SecondAddressInputLine>
                <ZipCodeInput ref={zipcode} placeholder="Zipcode"/>
                    <StateSelector ref={state}  >
                    <option value="State" selected>Select A State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </StateSelector>
                    <CountrySelector ref={country} >
                    <option value="country" selected>Select A Country</option>
                    <option value="US">United States</option>
                    </CountrySelector>
            </SecondAddressInputLine>
            </>
            )}
               {formStep === 2 && (
                <>
                    <CreditCardInput>
                            <CreditCardNumberInput ref={cardnumber} placeholder="Credit Card Number"/>
                            <CreditCardExpoInput ref={cardexpo} placeholder="MM/YY"/>
                             <CreditCardCvvInput ref={cardcvv} placeholder="Credit Card Cvv"/>
                        

                    </CreditCardInput>
               </>

               )}

<Buttons>
{formStep < 2 && (
    <>
<NextPageButton onClick={NextPageFunction}>Next Step </NextPageButton>
</>
)}
{formStep === 2 && (
    <>
<NextPageButton onClick={CompleteProfileFunction}>Complete Profile</NextPageButton>
</>
)}

</Buttons>


  </MainFormDiv>
            </MainBackGroundPopup>
        </>
    )
}
const CreditCardExpoInput = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:100px;
border-radius:5px;
margin-right:20px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`
const CreditCardCvvInput = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:100px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}


`
const CreditCardNumberInput = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
border-radius:5px;

margin-right:20px;
:focus {
  background-color:  rgb(51, 48, 69);
}

`


const CreditCardInput = styled.div`
flex-direction: row;
align-items:left;
justify-content: center;
display:flex;
margin-top:30px;
margin-left:20px;
`

const NextPageButton = styled.button`
margin-top:90px;
margin-left:420px;
width:150px;
height:35px;
border-radius:5px;
outline:none;
border:none;
cursor: pointer;
color:white;
background:#2b67b5;
:hover{
    border: 1px solid rgb(17, 209, 74)
}
`
const Buttons = styled.div`
flex-direction: row;
justify-content: space-between;
display:flex;
`

const CountrySelector = styled.select`
height:30px;
width:170px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`

const ZipCodeInput = styled.input`

display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}
`

const StateSelector = styled.select`
height:30px;
width:130px;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}
`

const SecondAddressInputLine = styled.div`
flex-direction: row;
align-items:left;
justify-content: space-between;
display:flex;
margin-top:30px;
margin-left:20px;

`


const City = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`


const AddressLine2Input = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:130px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}
`

const AddressLine1Input = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`

const MainPageAddressInput = styled.div`
flex-direction: row;
align-items:left;
justify-content: space-between;
display:flex;
margin-top:20px;
margin-left:20px;
`


const FullPhonenumInput = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
margin-top:40px;
border-radius:5px;

margin-left: 10px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`

const FullEmailIput = styled.input`
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
margin-top:40px;
border-radius:5px;

margin-left: 10px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`



const FullNameInput = styled.input`
justify-content: end;
display:flex;
color:white;
background-color:rgb(68, 64, 87);
outline:none;
border:none;
text-align-last: center;
height:30px;
width:170px;
margin-top:40px;
border-radius:5px;

:focus {
  background-color:  rgb(51, 48, 69);
}

`

const MainPageEmalandPhoneInput = styled.div`
flex-direction: row;
align-items:left;
justify-content: space-between;
display:flex;
margin-left:20px;

`


const ProfileNameInput = styled.input`
color:white;
background-color:rgb(68, 64, 87);
height:30px;
width:300px;
border-radius:5px;
margin-left:140px;;
outline:none;
border:none;
text-align-last: center;
:focus {
  background-color:  rgb(51, 48, 69);
}
`

const MainFormDiv = styled.div`
margin-top: 50px;

`


const MainBackGroundPopup = styled.div`
background-color: rgb(38, 36, 53);
border-radius: 3px;
width:620px; 
height:430px;
display:flex;
overflow-x:scroll;
overflow-y: scroll;
position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border: 1px solid white
  
  

`

const MainXBTN = styled.button`
background-color: rgb(38, 36, 53);
color:white;
height:20px;
width:20px;
border:none;
outline:none;
cursor: pointer;
justify-content:end;


`