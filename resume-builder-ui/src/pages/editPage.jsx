import React from "react";
import Header from "../components/headerComponent"
import Education from "../components/educationComponent";
import WorkExperience from "../components/workExperienceComponent";
import PersonalProjects from "../components/personalProjectsComponent";

import { HeaderModel } from "../model/header";

import './editPage.css'
import ProfilePhotoComponent from "../components/profilePhotoComponent";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Icon, theme } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'



function EditPage() {

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
    }

    function getEducationId(educationsIdInPElement) {

    }

    async function saveEducation() {
        let educations = document.querySelectorAll('.educationFormGroup')
        
        for (let i = 0; i < educations.length; i++) {
            for (let j = 0; j < educations[i].children.length; j++) {

                let educationsFormData = educations[i].children[j]
                console.log(educationsFormData)
            }

        }
    }

    function save() {
        console.log('save button clicked')

        saveHeader()

        let saveEducationButton = document.querySelector('#saveEducations')
        saveEducationButton.click()

        let savePersonalProjectsButton = document.querySelector('#savePersonalProjects')
        savePersonalProjectsButton.click()
        
        let saveWorkExperiencesButton = document.querySelector('#saveWorkExperiences')
        saveWorkExperiencesButton.click()
      
    }

    const handleFileUpload = async (uploadedFile) => {
        console.log('Uploaded file:', uploadedFile);
    
        const formData = new FormData()
        formData.append('photo', uploadedFile)

        try {
            const response = await fetch ('api/profilePhoto', {
                method: 'POST',
                body: formData
            })

            if(response.ok) {
                console.log(await response.text())
            }
            else {
                console.error('Failed to upload profile photo')
            }
        }
        catch (error) {
            console.error('Error uploading profile photo: ', error)
        }
    };

    console.log(theme)


    const location = useLocation();
    const navigate = useNavigate();


    const params = new URLSearchParams(location.search);
    const expandedItem = params.get('expandedItem');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const expandedItem = params.get('expandedItem');
        console.log('expanded item')
        console.log(expandedItem)
        if (expandedItem) {
         
            console.log('headerButton')
           
        }
    }, []);

    const handleAccordionButtonClick = (itemId) => {
        navigate(`?expandedItem=${itemId}`);
    };

    function handleViewClick() {
        // navigate('/')
        window.open('/','_blank')
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems:'center'}}>
                <h1 style={{marginLeft: '10%', fontSize: '2.5em', display: 'inline'}}>Edit</h1>
                <Icon style={{marginLeft: '25px', cursor: 'pointer'}} as={ViewIcon} boxSize={6} color="blue.500" _hover={{color: 'lightblue'}} onClick={()=>handleViewClick()}/>
            </div>
            <Accordion allowToggle defaultIndex={expandedItem=='header'?[0] : expandedItem=='profilePhoto'?[1] : expandedItem=='education'?[2] : expandedItem == 'workExperience'?[3] : expandedItem == 'personalProjects'?[4] : null}>
                <AccordionItem id="header">
                    <h2>
                    <AccordionButton onClick={() => handleAccordionButtonClick('header')}>
                        Header
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Header class="header"></Header>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton id="profilePhoto">
                        Profile Photo
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <ProfilePhotoComponent class='profilePhoto' onFileUpload={handleFileUpload} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton id="education">
                        Education
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <Education class="education" />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton id="workExperience">
                        Work Experience
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <WorkExperience class="workExperience" />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton id="personalProjects">
                        Personal Projects
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <PersonalProjects class="personalProjects" />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
      </div>
       
    )
}

export default EditPage;