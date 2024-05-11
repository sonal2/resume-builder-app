import { EducationModel } from '../model/education';
import './educationComponentCSS.css'
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";

function Education() {


    const [educationFormGroup, setEducationFormGroup] = useState([{}]);

    function addEducation() {
        setEducations([...educations, {
            "universityName": "",
            "degree": "",
            "startDateMonth": "",
            "startDateYear": "",
            "endDateMonth": "",
            "endDateYear": "",
            "currentlyWorkHere": "",
            "locationState": "",
            "new": true,
            "id": uuidv4()
        }])
      
        console.log('add education plus clicked')
    }


    const [educations, setEducations] = useState([])

    const getEducations = async() => {
        console.log('in function')
        let educationModel = new EducationModel()
        console.log('testing educations')
        console.log(educations)

        try {
            let fetchedEducations = await educationModel.getEducation()
            console.log('here')
            console.log(`educations ${fetchedEducations[0].universityName}`)
            setEducations(fetchedEducations)
        }
        catch (error) {
            console.log('here2');
            setEducations([])
        }
    }


    useEffect(() => {
        console.log('in use effect')
          
            getEducations();
        

    }, [])


   

    function handleCheckboxChange(id, checked) {
        console.log(`checked ${checked}`)
       
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < educations.length; i++) {
            if(educations[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newEducation = educations[index]
        console.log(newEducation)
        if(checked) {
            newEducation.currentlyStudyHere = true
        }
        else {
            newEducation.currentlyStudyHere = false
        }

        setEducations(prevEducations => [
            ...prevEducations.slice(0,index),
            newEducation,
            ...prevEducations.slice(index+1, prevEducations.length)
        ])

        
    }

    function handleTextChange(e, id, field) {
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < educations.length; i++) {
            if(educations[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newEducation = educations[index]

        if(field == 'universityName') {
            newEducation.universityName = e.target.value
        }
        else if(field == 'degree') {
            newEducation.degree = e.target.value
        }
        else if (field == 'startDateYear') {
            if(e.target.value.length <= 4) {
                newEducation.startDateYear = e.target.value.replace(/\D/g, '')
            }        
        }
        else if(field == 'endDateYear') {
            if(e.target.value.length <= 4) {
                newEducation.endDateYear = e.target.value.replace(/\D/g, '')
            }
        }
        else if(field == 'locationState') {
            newEducation.locationState = e.target.value
        }


        setEducations(prevEducations => [
            ...prevEducations.slice(0,index),
            newEducation,
            ...prevEducations.slice(index+1, prevEducations.length)
        ])
    }

    const [educationSaved, setSavedEducation] = useState(false)
    async function saveEducations() {
        console.log(`inside save educations`)

        for(let i = 0; i < educations.length; i++) {
            console.log(educations[i])
        }

        let educationModel = new EducationModel()
        await educationModel.saveEducations(educations)
        await getEducations()
        setSavedEducation(true)
    }

    useEffect(() => {
        if (educationSaved) {
          const timeoutId = setTimeout(() => {
            setSavedEducation(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [educationSaved]);

    function removeEducation(id) {

        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < educations.length; i++) {
            if(educations[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

  
        setEducations(prevEducations => [
            ...prevEducations.slice(0,index),
            ...prevEducations.slice(index+1, prevEducations.length)
        ])
 
       
    }

    return (
        <div class='container'>
        <form>
            <div class='education-border'>
                <h1 class='education'>Education</h1>
                <hr></hr>

                {console.log(educations)}
                {educations != null ? educations.map((education, index) => (
                   
                        <div key={index} class='educationFormGroup'>
                           
                            <p id='id' hidden>{education.id}</p>

                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <div class='form-group'>
                                    <label>University Name</label>
                                    {console.log(`universityName ${education.universityName}`)}
                                    <input onChange={(e) => handleTextChange(e, education.id, 'universityName')} style = {{width: `${education.universityName.length > 40 ? education.universityName.length : 40}ch`}} type="text" placeholder={educations == null ? 'University Name' : null} value = {educations != null ? education.universityName : null}/>

                                </div>

                                <Icon style={{cursor: 'pointer'}}onClick={()=>removeEducation(education.id)} as={MinusIcon} boxSize={4} color="blue.500"/>

                            </div> 

                            <div class='form-group'>
                                <label>Degree</label>
                                <input onChange={(e) => handleTextChange(e, education.id, 'degree')} style = {{width: `${education.degree.length > 40 ? education.degree.length : 40}ch`}} type="text" placeholder={educations == null ? 'Degree' : null} value = {educations != null ? education.degree : null}/>
                            </div>

                            <div class='form-group'>
                                <label>Start Date Month</label>
                                <select name="month">
                                    <option value="January" selected = {education.startDateMonth == 'January' ? true :  false}>January</option> 
                                    <option value="Febuary" selected = {education.startDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                    <option value="March" selected = {education.startDateMonth == 'March' ? true :  false}>March</option>
                                    <option value="April" selected = {education.startDateMonth == 'April' ? true :  false}>April</option>
                                    <option value="May" selected = {education.startDateMonth == 'May' ? true :  false}>May</option>
                                    <option value="June" selected = {education.startDateMonth == 'June' ? true :  false}>June</option>
                                    <option value="July" selected = {education.startDateMonth == 'July' ? true :  false}>July</option>
                                    <option value="August" selected = {education.startDateMonth == 'August' ? true :  false}>August</option>
                                    <option value="September" selected = {education.startDateMonth == 'September' ? true :  false}>September</option>
                                    <option value="October" selected = {education.startDateMonth == 'October' ? true :  false}>October</option>
                                    <option value="November" selected = {education.startDateMonth == 'November' ? true :  false}>November</option>
                                    <option value="December" selected = {education.startDateMonth == 'December' ? true :  false}>December</option>

                                </select>
                            </div>

                             <div class='form-group'>
                                <label>Start Date Year</label>
                                <input onChange={(e) => handleTextChange(e, education.id, 'startDateYear')} style = {{width: `5ch`}} type="text" placeholder={educations == null ? 'Year' : null} value = {educations != null ? `${education.startDateYear}`: null}/>
                            </div>

                           
                            {education.currentlyStudyHere == 1 ? (
                                <div>
                                    <div class='form-group'>
                                        <label>Currently Studying Here</label>
                                        <input checked = {education.currentlyStudyHere} type="checkbox" onChange={(e) => handleCheckboxChange(education.id, e.target.checked)}/>
                                    </div>

                                    <div class='form-group'>
                                        <label>End Date Month</label>
                                        <select disabled name="month" style={{backgroundColor: 'lightgray', width: `7ch`}}>
                                           
                                        </select>
                                    </div>

                                    <div class='form-group'>
                                        <label>End Date Year</label>
                                        <input disabled style = {{border: 'none', backgroundColor: 'lightgrey', width: `5ch`}} type="text" />
                                    </div>
                                </div>
                            ) : (
                               
                                <div>
                                    <div class='form-group'>
                                        <label>Currently Study Here</label>
                                        <input checked = {education.currentlyStudyHere} type="checkbox" onChange={(e) => handleCheckboxChange(education.id, e.target.checked)}/>
                                    </div>

                                    <div class='form-group'>
                                        <label>End Date Month</label>
                                        <select name="month">
                                            <option value="January" selected = {education.endDateMonth == 'January' ? true :  false}>January</option> 
                                            <option value="Febuary" selected = {education.endDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                            <option value="March" selected = {education.endDateMonth == 'March' ? true :  false}>March</option>
                                            <option value="April" selected = {education.endDateMonth == 'April' ? true :  false}>April</option>
                                            <option value="May" selected = {education.endDateMonth == 'May' ? true :  false}>May</option>
                                            <option value="June" selected = {education.endDateMonth == 'June' ? true :  false}>June</option>
                                            <option value="July" selected = {education.endDateMonth == 'July' ? true :  false}>July</option>
                                            <option value="August" selected = {education.endDateMonth == 'August' ? true :  false}>August</option>
                                            <option value="September" selected = {education.endDateMonth == 'September' ? true :  false}>September</option>
                                            <option value="October" selected = {education.endDateMonth == 'October' ? true :  false}>October</option>
                                            <option value="November" selected = {education.endDateMonth == 'November' ? true :  false}>November</option>
                                            <option value="December" selected = {education.endDateMonth == 'December' ? true :  false}>December</option>

                                        </select>
                                    </div>

                                    <div class='form-group'>
                                        <label>End Date Year</label>
                                        <input onChange={(e) => handleTextChange(e, education.id, 'endDateYear')} style = {{width: `5ch`}} type="text" placeholder={educations == null ? 'Year' : null} value = {educations != null ? `${education.endDateYear}`: null}/>
                                    </div>
                                </div>
                            )}
                    
                            <div class='form-group'>
                                <label>City, State</label>
                                <input onChange={(e) => handleTextChange(e, education.id, 'locationState')} style = {{width: `${education.locationState.length > 20 ? education.locationState.length : 20}ch`}} type="text" placeholder={educations == null ? 'City, State' : null} value = {educations != null ? `${education.locationState}`: null}/>
                            </div>


                            {educations.length > 1 ? (<hr class='educationDivider'></hr>) : (null)}

                        </div>
                
                    
                )) : null}


                {console.log(educationFormGroup.length)}
                
                

                <Icon style={{cursor: 'pointer'}} onClick={()=>addEducation()} as={AddIcon} boxSize={4} color="blue.500"/>


            </div>
        </form>


        <button onClick={() => saveEducations()}>Save Educations</button>
        {educationSaved && (<p style={{marginLeft: '10.1%'}}>Education saved!</p>)}
       
    </div>
    )
}

export default Education;