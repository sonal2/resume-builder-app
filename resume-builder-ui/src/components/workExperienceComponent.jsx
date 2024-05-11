import './workExperienceCSS.css'
import { WorkExperienceModel } from '../model/workExperience';
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import './form.css'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";
function WorkExperience() {


    const [workExperienceFormGroup, setWorkExperienceFormGroup] = useState([{}]);

    function addWorkExperience() {

        setWorkExperiences([...workExperiences, {
            "title": "",
            "company": "",
            "startDateMonth": "",
            "startDateYear": "",
            "endDateMonth": "",
            "endDateYear": "",
            "currentlyWorkHere": "",
            "locationCityState": "",
            "workResponsibilities": "",
            "new": true,
            "id": uuidv4()
        }])
        console.log('add work experience plus clicked')
    }


    const [workExperiences, setWorkExperiences] = useState([])
    const getWorkExperiences = async() => {
        console.log('in workExperience function')
        let workExperienceModel = new WorkExperienceModel()

        try {
            let workExperiences = await workExperienceModel.getWorkExperiences()
            console.log('here')
            console.log(`workExperiences ${workExperiences}`)
            setWorkExperiences(workExperiences)
        }
        catch (error) {
            console.log('here2');
            setWorkExperiences([])
        }
    }

    useEffect(() => {
        console.log('in use effect')
          
            getWorkExperiences();


    }, [])

    function handleCheckboxChange(id, checked) {
        console.log(`checked ${checked}`)
     
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < workExperiences.length; i++) {
            if(workExperiences[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newWorkExperience = workExperiences[index]
        console.log(newWorkExperience)
        if(checked) {
            newWorkExperience.currentlyWorkHere = true
        }
        else {
            newWorkExperience.currentlyWorkHere = false
        }

        setWorkExperiences(prevWorkExperiences => [
            ...prevWorkExperiences.slice(0,index),
            newWorkExperience,
            ...prevWorkExperiences.slice(index+1, prevWorkExperiences.length)
        ])

        
    }


    function handleTextChange(e, id, field) {
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < workExperiences.length; i++) {
            if(workExperiences[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newWorkExperience = workExperiences[index]

        if(field == 'title') {
            newWorkExperience.title = e.target.value
        }
        else if(field == 'company') {
            newWorkExperience.company = e.target.value
        }
        else if (field == 'startDateYear') {
            if(e.target.value.length <= 4) {
                newWorkExperience.startDateYear = e.target.value.replace(/\D/g, '')
            }        
        }
        else if(field == 'endDateYear') {
            if(e.target.value.length <= 4) {
                newWorkExperience.endDateYear = e.target.value.replace(/\D/g, '')
            }
        }
        else if(field == 'locationCityState') {
            newWorkExperience.locationCityState = e.target.value
        }
        else if(field == 'workResponsibilities') {
            newWorkExperience.workResponsibilities = e.target.value
        }


        setWorkExperiences(prevWorkExperiences => [
            ...prevWorkExperiences.slice(0,index),
            newWorkExperience,
            ...prevWorkExperiences.slice(index+1, prevWorkExperiences.length)
        ])
    }

    const [workExperiencesSaved, setSavedWorkExperience] = useState(false)
    async function saveWorkExperiences() {
        console.log(`inside save work experiences`)

        for(let i = 0; i < workExperiences.length; i++) {
            console.log(workExperiences[i])
        }

        let workExperiencesModel = new WorkExperienceModel()
        await workExperiencesModel.saveWorkExperiences(workExperiences)
        await getWorkExperiences()
        setSavedWorkExperience(true)
    }

    useEffect(() => {
        if (workExperiencesSaved) {
          const timeoutId = setTimeout(() => {
            setSavedWorkExperience(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [workExperiencesSaved]);


      function removeWorkExperiences(id) {

        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < workExperiences.length; i++) {
            if(workExperiences[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

  
        setWorkExperiences(prevWorkExperiences => [
            ...prevWorkExperiences.slice(0,index),
            ...prevWorkExperiences.slice(index+1, prevWorkExperiences.length)
        ])
 
       
    }

    return (
        <div class='container'>
        <form>
            <div class='workExperience-border'>
                <h1 class='workExperience'>Work Experience</h1>
                <hr></hr>

                {workExperiences != null ? workExperiences.map((workExperience) => (
                            <div class = 'workExperienceFormGroup'>

                                <p id="id" hidden>{workExperience.id}</p>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div class='form-group'>
                                        <label>Title</label>
                                        <input onChange={(e) => handleTextChange(e, workExperience.id, 'title')}  style = {{width: `${workExperience.title.length > 20 ? workExperience.title.length : 20}ch`}} type="text" placeholder={workExperiences == null ? 'Title' : null} value = {workExperiences != null ? workExperience.title : null}/>
                                    </div>

                                    <Icon style={{cursor: 'pointer'}} onClick={()=>removeWorkExperiences(workExperience.id)} as={MinusIcon} boxSize={4} color="blue.500"/>

                                </div>

                                <div class='form-group'>
                                    <label>Company</label>
                                    <input onChange={(e) => handleTextChange(e, workExperience.id, 'company')} style = {{width: `${workExperience.company.length > 20 ? workExperience.company.length + 1 : 20}ch`}} type="text" placeholder={workExperiences == null ? 'Company' : null} value = {workExperiences != null ? workExperience.company : null}/>
                                </div>

                                

                                <div class='form-group'>
                                <label>Start Date Month</label>
                                <select name="month">
                                    <option value="January" selected = {workExperience.startDateMonth == 'January' ? true :  false}>January</option> 
                                    <option value="Febuary" selected = {workExperience.startDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                    <option value="March" selected = {workExperience.startDateMonth == 'March' ? true :  false}>March</option>
                                    <option value="April" selected = {workExperience.startDateMonth == 'April' ? true :  false}>April</option>
                                    <option value="May" selected = {workExperience.startDateMonth == 'May' ? true :  false}>May</option>
                                    <option value="June" selected = {workExperience.startDateMonth == 'June' ? true :  false}>June</option>
                                    <option value="July" selected = {workExperience.startDateMonth == 'July' ? true :  false}>July</option>
                                    <option value="August" selected = {workExperience.startDateMonth == 'August' ? true :  false}>August</option>
                                    <option value="September" selected = {workExperience.startDateMonth == 'September' ? true :  false}>September</option>
                                    <option value="October" selected = {workExperience.startDateMonth == 'October' ? true :  false}>October</option>
                                    <option value="November" selected = {workExperience.startDateMonth == 'November' ? true :  false}>November</option>
                                    <option value="December" selected = {workExperience.startDateMonth == 'December' ? true :  false}>December</option>

                                </select>
                            </div>

                            <div class='form-group'>
                                    <label>Start Date Year</label>
                                    <input onChange={(e) => handleTextChange(e, workExperience.id, 'startDateYear')} style = {{width: `5ch`}} type="text" placeholder={workExperiences == null ? 'Year' : null} value = {workExperiences != null ? `${workExperience.startDateYear}` : null}/>
                            </div>

                    

                                {workExperience.currentlyWorkHere == 1 ? (
                                    <div>
                                        <div class='form-group'>
                                            <label>Currently Working Here</label>
                                            <input checked = {workExperience.currentlyWorkHere} type="checkbox" onChange={(e) => handleCheckboxChange(workExperience.id, e.target.checked)}/>
                                        </div>

                                        <div class='form-group'>
                                            <label>End Date Month</label>
                                            <select disabled name="month" style={{backgroundColor: 'lightgray', width: `7ch`}}>
                                               
                                            </select>
                                        </div>

                                        <div class='form-group'>
                                                <label>End Date Year</label>
                                                <input disabled style = {{border: 'none', backgroundColor: 'lightgrey', width: `5ch`}} type="text"/>
                                        </div>

                                    </div>
                                ) : (
                                    <div>
                                        <div class='form-group'>
                                            <label>Currently Working Here</label>
                                            <input checked = {workExperience.currentlyWorkHere} type="checkbox" onChange={(e) => handleCheckboxChange(workExperience.id, e.target.checked)}/>
                                        </div>

                                        <div class='form-group'>
                                            <label>End Date Month</label>
                                            <select name="month">
                                                <option value="January" selected = {workExperience.endDateMonth == 'January' ? true :  false}>January</option> 
                                                <option value="Febuary" selected = {workExperience.endDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                                <option value="March" selected = {workExperience.endDateMonth == 'March' ? true :  false}>March</option>
                                                <option value="April" selected = {workExperience.endDateMonth == 'April' ? true :  false}>April</option>
                                                <option value="May" selected = {workExperience.endDateMonth == 'May' ? true :  false}>May</option>
                                                <option value="June" selected = {workExperience.endDateMonth == 'June' ? true :  false}>June</option>
                                                <option value="July" selected = {workExperience.endDateMonth == 'July' ? true :  false}>July</option>
                                                <option value="August" selected = {workExperience.endDateMonth == 'August' ? true :  false}>August</option>
                                                <option value="September" selected = {workExperience.endDateMonth == 'September' ? true :  false}>September</option>
                                                <option value="October" selected = {workExperience.endDateMonth == 'October' ? true :  false}>October</option>
                                                <option value="November" selected = {workExperience.endDateMonth == 'November' ? true :  false}>November</option>
                                                <option value="December" selected = {workExperience.endDateMonth == 'December' ? true :  false}>December</option>

                                            </select>
                                        </div>

                                        <div class='form-group'>
                                                <label>End Date Year</label>
                                                <input onChange={(e) => handleTextChange(e, workExperience.id, 'endDateYear')} style = {{width: `5ch`}} type="text" placeholder={workExperiences == null ? 'Year' : null} value = {workExperiences != null ? `${workExperience.endDateYear}` : null}/>
                                        </div>
                                    </div>
                                )}
                                
                        
                                <div class='form-group'>
                                    <label>City, State</label>
                                    <input onChange={(e) => handleTextChange(e, workExperience.id, 'locationCityState')} style = {{width: `${workExperience.locationCityState.length > 20 ? workExperience.locationCityState.length : 20}ch`}} type="text" placeholder={workExperiences == null ? 'City, State' : null} value = {workExperiences != null ? workExperience.locationCityState : null}/>
                                </div>

                                <div class='form-group'>
                                    <label>Work Responsibilities</label>
                                    <textarea onChange={(e) => handleTextChange(e, workExperience.id, 'workResponsibilities')} style = {{height: `${workExperience.workResponsibilities.length > 0 ? /*personalProject.projectDescription.length*/30 : 30}vh`, width: `${workExperience.workResponsibilities.length > 100 ? workExperience.workResponsibilities.length : 100}ch`}} placeholder={workExperiences == null ? 'Work Responsibilities' : null} value = {workExperiences != null ? workExperience.workResponsibilities : null}/>
                                </div>

                                {workExperienceFormGroup.length > 1 || workExperiences.length > 1 ? (<hr class='workExperienceDivider'></hr>) : (null)}

                            </div>
                )) : null}

                <Icon style={{cursor: 'pointer'}} onClick={()=>addWorkExperience()} as={AddIcon} boxSize={4} color="blue.500"/>


            </div>
        </form>
        <button onClick={() => saveWorkExperiences()}>Save Work Experiences</button>
        {workExperiencesSaved && (<p style={{marginLeft: '10.1%'}}>Work experiences saved!</p>)}

       
    </div>
    )
}

export default WorkExperience;