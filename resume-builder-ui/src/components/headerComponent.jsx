import { useEffect, useState } from 'react';
import { HeaderModel } from '../model/header';
import { Heading, Text, Input, InputGroup, InputLeftElement, FormControl, FormLabel, Box, Stack } from '@chakra-ui/react';
import { PhoneIcon } from "@chakra-ui/icons";
import './headerComponent.css'
function Header() {

    const [headerState, setHeaderState] = useState({})
    const [headerSaved, setSaveHeader] = useState(false)

    useEffect(() => {

        const getHeader = async() => {
          let headerModel = new HeaderModel()
          try {
            let header = await headerModel.getHeader()
            console.log(header[0])
            setHeaderState(header[0])
          }
          catch (error) {
            setHeaderState(null)
          }
         
        }
      
        getHeader()
      }, [])

    console.log(`headerState ${headerState}`)

    const handlePhoneNumberChange = (e) => {
        const formattedPhoneNumber = e.target.value.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1)-$2-$3');
        setHeaderState({...headerState, phoneNumber: formattedPhoneNumber});
        
    }

    async function saveHeader() {
        let header = document.querySelector('#header')
        let headerObj = {
            "firstName": null,
            "lastName": null,
            "catchyHeadline": null,
            "locationCityState": null,
            "phoneNumber": null
        }
      
        for (let i = 0; i < header.children.length; i++) {
            let value = header.children[i].children[1].value
            switch (i) {
                case 0: headerObj.firstName = value
                case 1: headerObj.lastName = value 
                case 2: headerObj.catchyHeadline = value
                case 3: headerObj.locationCityState = value 
                case 4: headerObj.phoneNumber = value 
            }
        }

        let headerModel = new HeaderModel() 
        console.log(headerObj)
        await headerModel.save(headerObj)
        setSaveHeader(true)
    }

    useEffect(() => {
        if (headerSaved) {
          const timeoutId = setTimeout(() => {
            setSaveHeader(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [headerSaved]);
    

    return (
        <div class='container'>
            <form>
                <div class='header-border'>
                   <h1 class='header'>Header</h1>
                   <hr></hr>
                    <div id='header'>
                        <div class='form-group'>
                            <label>First Name</label>
                            <input type="text" onChange={(e) => setHeaderState({...headerState, firstName: e.target.value})} placeholder={headerState == null ? 'First Name' : null} value = {headerState != null ? headerState.firstName : null}/>
                        </div>

                        <div class='form-group'>
                            <label>Last Name</label>
                            <input type="text" onChange={(e) => setHeaderState({...headerState, lastName: e.target.value})} placeholder={headerState == null ? 'Last Name' : null} value = {headerState != null ? headerState.lastName : null}/>
                        </div>

                        <div class='form-group'>
                            <label>Catchy Headline</label>
                            <input type="text" onChange={(e) => setHeaderState({...headerState, catchyHeadline: e.target.value})} placeholder={headerState == null ? 'Catchy Headline' : null} value = {headerState != null ? headerState.catchyHeadline : null}/>
                        </div>
                    
                        <div class='form-group'>
                            <label>City, State</label>
                            <input type="text" onChange={(e) => setHeaderState({...headerState, locationCityState: e.target.value})} placeholder={headerState == null ? 'City, State' : null} value = {headerState != null ? headerState.locationCityState : null}/>
                        </div>
                        
                        <div class='form-group'>
                            <label>Phone Number</label>
                            <input type="tel" onChange={handlePhoneNumberChange} placeholder={headerState == null ? 'Phone Number' : null} value = {headerState != null ? headerState.phoneNumber : null}/>
                        </div>
                    </div>
                </div>
            </form>

            <button onClick={() => saveHeader()}>Save Header</button>
            {headerSaved && (<p style={{marginLeft: '10.1%'}}>Header saved!</p>)}

           
        </div>
    )
}

export default Header;