import './personalProjectsCSS.css'
import PersonalProjectsModel from '../model/personalProjects'
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import './bulletPoints.css'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";


function PersonalProjects() {

    const [personalProjects, setPersonalProjects] = useState([])

    function addPersonalProject() {
        setPersonalProjects([...personalProjects, {
            "title": "",
            "startDateMonth": "",
            "startDateYear": "",
            "endDateMonth": "",
            "endDateYear": "",
            "currentProject": "",
            "projectDescription": "",
            "githubLink": "",
            "new": true,
            "id": uuidv4()
        }])

        console.log("add personal projects plus clicked")
    }
    
    const getPersonalProjects = async() => {
        console.log('in function')
        let personalProjectsModel = new PersonalProjectsModel()

        try {
            let personalProjects = await personalProjectsModel.getPersonalProjects()
            console.log('here')
            console.log(`personalProjects ${personalProjects[0].title}`)
            setPersonalProjects(personalProjects)
        }
        catch (error) {
            console.log('here2');
            setPersonalProjects([])
        }
    }

    useEffect(() => {
        console.log('in use effect')
           
            getPersonalProjects();
        

    }, [])

    function handleCheckboxChange(id, checked) {
        console.log(`checked ${checked}`)
     
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < personalProjects.length; i++) {
            if(personalProjects[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newPersonalProject = personalProjects[index]
        console.log(newPersonalProject)
        if(checked) {
            newPersonalProject.currentProject = true
        }
        else {
            newPersonalProject.currentProject = false
        }

        setPersonalProjects(prevPersonalProjects => [
            ...prevPersonalProjects.slice(0,index),
            newPersonalProject,
            ...prevPersonalProjects.slice(index+1, prevPersonalProjects.length)
        ])

        
    }


    function handleTextChange(e, id, field) {
        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < personalProjects.length; i++) {
            if(personalProjects[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

        let newPersonalProject = personalProjects[index]

        if(field == 'title') {
            newPersonalProject.title = e.target.value
        }
        else if (field == 'startDateYear') {
            if(e.target.value.length <= 4) {
                newPersonalProject.startDateYear = e.target.value.replace(/\D/g, '')
            }        
        }
        else if(field == 'endDateYear') {
            if(e.target.value.length <= 4) {
                newPersonalProject.endDateYear = e.target.value.replace(/\D/g, '')
            }
        }
        else if(field == 'projectDescription') {
            newPersonalProject.projectDescription = e.target.value
        }
        else if(field == 'githubLink') {
            newPersonalProject.githubLink = e.target.value
        }


        setPersonalProjects(prevPersonalProjects => [
            ...prevPersonalProjects.slice(0,index),
            newPersonalProject,
            ...prevPersonalProjects.slice(index+1, prevPersonalProjects.length)
        ])
    }

    const [personalProjectsSaved, setSavedPersonalProjects] = useState(false)
    async function savePersonalProjects() {
        console.log(`inside save personal projects`)

        for(let i = 0; i < personalProjects.length; i++) {
            console.log(personalProjects[i])
        }

        let personalProjectsModel = new PersonalProjectsModel()
        await personalProjectsModel.savePersonalProjects(personalProjects)
        await getPersonalProjects()
        setSavedPersonalProjects(true)
    }

    useEffect(() => {
        if (personalProjectsSaved) {
          const timeoutId = setTimeout(() => {
            setSavedPersonalProjects(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [personalProjectsSaved]);

      function removePersonalProjects(id) {

        let index = null
        console.log(`id ${id}`)
        for(let i = 0; i < personalProjects.length; i++) {
            if(personalProjects[i].id == id) {
                console.log('found match')
                index = i
                break
            }
        }

  
        setPersonalProjects(prevPersonalProjects => [
            ...prevPersonalProjects.slice(0,index),
            ...prevPersonalProjects.slice(index+1, prevPersonalProjects.length)
        ])
 
       
    }

    return (
        <div class='container'>
        <form>
            <div class='personalProjects-border'>
                <h1 class='personalProjects'>Personal Projects</h1>
                <hr></hr>

                {personalProjects != null ? personalProjects.map((personalProject, index) => (

                    <div class = 'personalProjectsFormGroup'>

                        <p id='id' hidden>{personalProject.id}</p>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div class='form-group'>
                                <label>Title</label>
                                <input onChange={(e) => handleTextChange(e, personalProject.id, 'title')} style = {{width: `${personalProject.title.length > 40 ? personalProject.title.length : 40}ch`}} type="text" placeholder={personalProjects == null ? 'Title' : null} value = {personalProjects != null ? personalProject.title : null}/>
                            </div>
                            <Icon style={{cursor: 'pointer'}} onClick={()=>removePersonalProjects(personalProject.id)} as={MinusIcon} boxSize={4} color="blue.500"/>

                        </div>

                        <div class='form-group'>
                                <label>Start Date Month</label>
                                <select name="month">
                                    <option value="January" selected = {personalProject.startDateMonth == 'January' ? true :  false}>January</option> 
                                    <option value="Febuary" selected = {personalProject.startDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                    <option value="March" selected = {personalProject.startDateMonth == 'March' ? true :  false}>March</option>
                                    <option value="April" selected = {personalProject.startDateMonth == 'April' ? true :  false}>April</option>
                                    <option value="May" selected = {personalProject.startDateMonth == 'May' ? true :  false}>May</option>
                                    <option value="June" selected = {personalProject.startDateMonth == 'June' ? true :  false}>June</option>
                                    <option value="July" selected = {personalProject.startDateMonth == 'July' ? true :  false}>July</option>
                                    <option value="August" selected = {personalProject.startDateMonth == 'August' ? true :  false}>August</option>
                                    <option value="September" selected = {personalProject.startDateMonth == 'September' ? true :  false}>September</option>
                                    <option value="October" selected = {personalProject.startDateMonth == 'October' ? true :  false}>October</option>
                                    <option value="November" selected = {personalProject.startDateMonth == 'November' ? true :  false}>November</option>
                                    <option value="December" selected = {personalProject.startDateMonth == 'December' ? true :  false}>December</option>

                                </select>
                        </div>
                    
                        <div class='form-group'>
                            <label>Start Date Year</label>
                            <input onChange={(e) => handleTextChange(e, personalProject.id, 'startDateYear')} style = {{width: `5ch`}} type="text" placeholder={personalProjects == null ? 'Year' : null} value = {personalProjects != null ? `${personalProject.startDateYear}` : null}/>
                        </div>

                      

                        {personalProject.currentProject == 1 ? (
                            <div>
                                <div class='form-group'>
                                    <label>Current Project</label>
                                    <input checked = {personalProject.currentProject} type="checkbox" onChange={(e) => handleCheckboxChange(personalProject.id, e.target.checked)}/>
                                </div>

                                <div class='form-group'>
                                    <label>End Date Month</label>
                                    <select name="month" style={{backgroundColor: 'lightgray', width: `7ch`}}>
                                        <option value="January" selected = {personalProject.endDateMonth == 'January' ? true :  false}>January</option> 
                                        <option value="Febuary" selected = {personalProject.endDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                        <option value="March" selected = {personalProject.endDateMonth == 'March' ? true :  false}>March</option>
                                        <option value="April" selected = {personalProject.endDateMonth == 'April' ? true :  false}>April</option>
                                        <option value="May" selected = {personalProject.endDateMonth == 'May' ? true :  false}>May</option>
                                        <option value="June" selected = {personalProject.endDateMonth == 'June' ? true :  false}>June</option>
                                        <option value="July" selected = {personalProject.endDateMonth == 'July' ? true :  false}>July</option>
                                        <option value="August" selected = {personalProject.endDateMonth == 'August' ? true :  false}>August</option>
                                        <option value="September" selected = {personalProject.endDateMonth == 'September' ? true :  false}>September</option>
                                        <option value="October" selected = {personalProject.endDateMonth == 'October' ? true :  false}>October</option>
                                        <option value="November" selected = {personalProject.endDateMonth == 'November' ? true :  false}>November</option>
                                        <option value="December" selected = {personalProject.endDateMonth == 'December' ? true :  false}>December</option>

                                    </select>
                                </div>

                                <div class='form-group'>
                                    <label>End Date Year</label>
                                    <input disabled style = {{border: 'none', backgroundColor: 'lightgrey', width: `5ch`}} type="text" placeholder={personalProjects == null ? 'Year' : null} value = {personalProjects != null ? `${personalProject.endDateYear}` : null}/>
                                </div>
                            </div>
                        ) : (

                          
                            <div>

                                <div class='form-group'>
                                    <label>Current Project</label>
                                    <input checked = {personalProject.currentProject} type="checkbox" onChange={(e) => handleCheckboxChange(personalProject.id, e.target.checked)}/>
                                </div>

                                <div class='form-group'>
                                    <label>End Date Month</label>
                                    <select name="month">
                                        <option value="January" selected = {personalProject.endDateMonth == 'January' ? true :  false}>January</option> 
                                        <option value="Febuary" selected = {personalProject.endDateMonth == 'Febuary' ? true :  false}>Febuary</option>
                                        <option value="March" selected = {personalProject.endDateMonth == 'March' ? true :  false}>March</option>
                                        <option value="April" selected = {personalProject.endDateMonth == 'April' ? true :  false}>April</option>
                                        <option value="May" selected = {personalProject.endDateMonth == 'May' ? true :  false}>May</option>
                                        <option value="June" selected = {personalProject.endDateMonth == 'June' ? true :  false}>June</option>
                                        <option value="July" selected = {personalProject.endDateMonth == 'July' ? true :  false}>July</option>
                                        <option value="August" selected = {personalProject.endDateMonth == 'August' ? true :  false}>August</option>
                                        <option value="September" selected = {personalProject.endDateMonth == 'September' ? true :  false}>September</option>
                                        <option value="October" selected = {personalProject.endDateMonth == 'October' ? true :  false}>October</option>
                                        <option value="November" selected = {personalProject.endDateMonth == 'November' ? true :  false}>November</option>
                                        <option value="December" selected = {personalProject.endDateMonth == 'December' ? true :  false}>December</option>

                                    </select>
                                </div>

                                <div class='form-group'>
                                    <label>End Date Year</label>
                                    <input onChange={(e) => handleTextChange(e, personalProject.id, 'endDateYear')} style = {{width: `5ch`}} type="text" placeholder={personalProjects == null ? 'Year' : null} value = {personalProjects != null ? `${personalProject.endDateYear}` : null}/>
                                </div>
                            </div>
                        )}
                       

                         
                        
                        <div class='form-group'>
                            <label>Project Description</label>
                            <textarea onChange={(e) => handleTextChange(e, personalProject.id, 'projectDescription')} style = {{height: `${personalProject.projectDescription.length > 0 ? /*personalProject.projectDescription.length*/30 : 30}vh`, width: `${personalProject.projectDescription.length > 30 ? /*personalProject.projectDescription.length*/100 : 100}ch`}} placeholder={personalProjects == null ? 'Project Description' : null} value = {personalProjects != null ? personalProject.projectDescription : null}/>
                        </div>

                        <div class='form-group'>
                            <label>Github Link</label>
                            <input onChange={(e) => handleTextChange(e, personalProject.id, 'githubLink')} style = {{width: `${personalProject.githubLink.length > 40 ? personalProject.githubLink.length : 40}ch`}} type="text" placeholder={personalProjects == null ? 'Github Link' : null} value = {personalProjects != null ? personalProject.githubLink : null}/>
                        </div>

                        {personalProjects.length > 1 ? (<hr class='personalProjectsDivider'></hr>) : (null)}
                    </div>
                )): null}


                <Icon style={{cursor: 'pointer'}} onClick={()=>addPersonalProject()} as={AddIcon} boxSize={4} color="blue.500"/>



            </div>
        </form>
        <button onClick={() => savePersonalProjects()}>Save Personal Projects</button>
        {personalProjectsSaved && (<p style={{marginLeft: '10.1%'}}>Personal projects saved!</p>)}

       
    </div>
    )
}

export default PersonalProjects;