import { useEffect, useState } from "react";
import { HeaderModel } from "../model/header";
import { EducationModel } from "../model/education";
import { WorkExperienceModel } from "../model/workExperience";
import PersonalProjectsModel from "../model/personalProjects";
import { PhoneIcon, SunIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import './homePage.css'
import {marked} from 'marked'


function HomePage() {

    const [hasHeader, setHasHeader] = useState(false)
    const [header, setHeaderState] = useState({})
    const [hasProfilePhoto, setHasProfilePhoto] = useState(false)
    const [hasEducations, setHasEducations] = useState(false)
    const [educations, setEducationsState] = useState({})
    const [hasWorkExperiences, setHasWorkExperiences] = useState(false)
    const [workExperiences, setWorkExperiencesState] = useState({})
    const [hasPersonalProjects, setHasPersonalProjects] = useState(false)
    const [personalProjects, setPersonalProjectsState] = useState({})


    const setHeader = async() => {
        let headerModel = new HeaderModel()
        try {
            let header = await headerModel.getHeader()
            setHeaderState(header[0])
            console.log(header[0])
            console.log(hasHeader)
            setHasHeader(true)
        }
        catch (err) {
            setHasHeader(false)
        }
    }

    const setProfilePhoto = async() => {
        const status = (await fetch('api/profilePhoto')).status

        if(status == 200) {
            setHasProfilePhoto(true)
        } 
    }

    const setEducations = async() => {
        let educationModel = new EducationModel()
        try {
            let educations = await educationModel.getEducation()
            setEducationsState(educations)
            setHasEducations(true)
        }
        catch (err) {
            setHasEducations(false)
        }
    }

    const setWorkExperiences = async() => {
        let workExperienceModel = new WorkExperienceModel()
        try {
          
            let workExperiences = await workExperienceModel.getWorkExperiences()
            workExperiences.forEach(workExperience => {
                workExperience.workResponsibilities = marked.parse(workExperience.workResponsibilities)
                
            })

            setWorkExperiencesState(workExperiences)
            setHasWorkExperiences(true)
        }
        catch (err) {
            setHasWorkExperiences(false)
        }
    }

    const setPersonalProjects = async() => {
        let personalProjectsModel = new PersonalProjectsModel()

      
        try {
            let personalProjects = await personalProjectsModel.getPersonalProjects()
            personalProjects.forEach(personalProject => {
                personalProject.projectDescription = marked.parse(personalProject.projectDescription)
                
            })

            setPersonalProjectsState(personalProjects)
            setHasPersonalProjects(true)
        }
        catch (err) {
            setHasPersonalProjects(false)
        }
    }

    useEffect(()=> {
       
        setHeader()
        setProfilePhoto()
        setEducations()
        setWorkExperiences()
        setPersonalProjects()
       

    }, [])

    return (
        <div>
            <div style={{display:'flex'}}>
                {hasProfilePhoto ? <ProfilePhotoForHomePage></ProfilePhotoForHomePage> : (<h1>{hasProfilePhoto.toString()}</h1>)}
                {hasHeader ? (<HeaderForHomePage></HeaderForHomePage>) : (<h1>{hasHeader.toString()}</h1>)}
            </div>

            {hasEducations ? (<EducationForHomePage></EducationForHomePage>) : <h1>hasEducation.toString()</h1>}
            {hasWorkExperiences ? (<WorkExperiencesForHomePage></WorkExperiencesForHomePage>) : <h1>hasWorkExperiences.toString()</h1>}
            {hasPersonalProjects ? (<PersonalProjectsForHomePage></PersonalProjectsForHomePage>) : <h1>hasPersonalProjects.toString()</h1>}
        </div>
    )

    function ProfilePhotoForHomePage() {
        return (
            <div style={{marginTop: '5%', marginLeft: '5%', marginRight: '10%'}}>
                {hasProfilePhoto ? <img src='api/profilePhoto' alt='Profile Photo' style={{ borderRadius: '50%', width: '500px', height: '500px', objectFit: "cover"}}/> : <p>no profile photo available</p>}    
            </div>    
        )
    }

    function HeaderForHomePage() {
        return (
            <div style={{marginTop: '5%'}}>
                <div style={{display:'inline-block'}}>
                    {header.firstName != "" && header.firstName != null ? <h2 style={{display:'inline', fontSize: '5em'}}>{header.firstName} </h2> : <a href="/edit?expandedItem=header">First Name</a>}
                    {header.lastName != "" && header.lastName != null ? <h2 style={{display:'inline', fontSize: '5em'}}>{header.lastName}</h2> : <a style={{display:"block"}} href="/edit?expandedItem=header">Last Name</a>}
                </div>
                {header.catchyHeadline != "" && header.catchyHeadline != null ? <h2 style={{fontSize:'2em', color:'#3182ce'}}>{header.catchyHeadline}</h2> : <a style={{display:"block"}} href="/edit?expandedItem=header">Catchy Headline</a>}
                
                <Icon style={{marginRight: '10px', display:'inline-block'}} as={SunIcon} boxSize={5} color="blue.500"/>
                {header.locationCityState != "" && header.locationCityState != null ? <h2 style={{display:'inline', marginRight: '30px'}}>{header.locationCityState}</h2> : <a style={{display:"block"}} href="/edit?expandedItem=header">City, State</a>}
                
                <Icon style={{marginRight: '10px', display:'inline-block'}} as={PhoneIcon} boxSize={4} color="blue.500"/>
                {header.phoneNumber != "" && header.phoneNumber != null ? <h2 style={{display:'inline'}}>{header.phoneNumber}</h2> : <a style={{display:"block"}} href="/edit?expandedItem=header">Phone Number</a>}
            </div>
        )
    }

    function EducationForHomePage() {
        return (
            <div style={{marginTop: '5%', marginLeft:'7%'}}>
                <h1 style={{fontSize: '3em', color:'#3182ce'}}>Education</h1>
                {educations.map((education) => (
                    <div style={{marginBottom: '25px', fontSize:'1.1em'}}>
                        <div style={{display: 'flex', position: 'relative'}}>
                            {education.universityName != "" && education.universityName != null ? <h2 style={{fontWeight:'bold'}}>{education.universityName}</h2> : <a href="/edit?expandedItem=education">University Name</a>}
                            {education.locationState != "" && education.locationState != null ? <h2 style={{position: 'absolute', left: '30%'}}>{education.locationState}</h2> : <a href="/edit?expandedItem=education">Location State</a>}
                        </div>
                        <div style={{display:'flex', position: 'relative'}}>
                            {education.degree != "" && education.degree != null ? <h2 style={{fontStyle:'oblique', fontWeight: 'bold'}}>{education.degree}</h2> : <a href="/edit?expandedItem=education">Degree</a>}
                            {education.currentlyStudyHere ? <h2 style={{position: 'absolute', left: '30%'}}>{education.startDateMonth} {education.startDateYear} - Present</h2> : <h2 style={{position: 'absolute', left: '30%'}}>{education.startDateMonth} {education.startDateYear} - {education.endDateMonth} {education.endDateYear}</h2>}
                        </div>
                    </div>
                )) }
            </div>
        )
    }

    function WorkExperiencesForHomePage() {
        return (
            <div style={{marginTop: '5%', marginLeft:'7%'}}>
                <h1 style={{fontSize: '3em', color:'#3182ce'}}>Work Experience</h1>
                {workExperiences.map((workExperience) => (
                    <div style={{marginBottom: '25px', fontSize:'1.1em'}}>
                        <div style={{display: 'flex', position: 'relative'}}>
                            {workExperience.title != "" && workExperience.title != null ? <h2 style={{fontWeight:'bold'}}>{workExperience.title}</h2> : <a href="/edit?expandedItem=workExperience">Title</a>}
                            {workExperience.locationCityState != "" && workExperience.locationCityState != null ? <h2 style={{position: 'absolute', left: '30%'}}>{workExperience.locationCityState}</h2> : <a href="/edit?expandedItem=workExperience">Location City State</a>}
                        </div>
                        <div style={{display:'flex', position: 'relative'}}>
                            {workExperience.company != "" && workExperience.company != null ? <h2 style={{fontStyle:'oblique', fontWeight: 'bold'}}>{workExperience.company}</h2> : <a href="/edit?expandedItem=workExperience">Company</a>}
                            {workExperience.currentlyWorkHere ? <h2 style={{position: 'absolute', left: '30%'}}>{workExperience.startDateMonth} {workExperience.startDateYear} - Present</h2> : <h2 style={{position: 'absolute', left: '30%'}}>{workExperience.startDateMonth} {workExperience.startDateYear} - {workExperience.endDateMonth} {workExperience.endDateYear}</h2>}
                        </div>
                     

                        <div style = {{marginRight: '25px'}}> 
                            {workExperience.workResponsibilities != "" && workExperience.workResponsibilities != null ? (
                                <div dangerouslySetInnerHTML={{ __html: workExperience.workResponsibilities }} />
                            ) : (
                                <a href="/edit?expandedItem=workExperience">Work Experience</a>
                            )}
                        </div>

                    </div>
                )) }
            </div>
        )
    }

    function PersonalProjectsForHomePage() {
        return (
            <div style={{marginTop: '5%', marginLeft:'7%'}}>
                <h1 style={{fontSize: '3em', color:'#3182ce'}}>Personal Projects</h1>
                {personalProjects.map((personalProject) => (
                    <div style={{marginBottom: '25px', fontSize:'1.1em'}}>
                        <div style={{display: 'flex', position: 'relative'}}>
                            {personalProject.title != "" && personalProject.title != null ? <h2 style={{fontWeight:'bold'}}>{personalProject.title}</h2> : <a href="/edit?expandedItem=personalProjects">Title</a>}
                            {personalProject.currentProject ? <h2 style={{position: 'absolute', left: '30%'}}>{personalProject.startDateMonth} {personalProject.startDateYear} - Present</h2> : <h2 style={{position: 'absolute', left: '30%'}}>{personalProject.startDateMonth} {personalProject.startDateYear} - {personalProject.endDateMonth} {personalProject.endDateYear}</h2>}

                        </div>
                        <div>
                            {personalProject.githubLink != "" && personalProject.githubLink != null ? <h2 style={{fontStyle:'oblique', fontWeight: 'bold'}}>{personalProject.githubLink}</h2> : <a href="/edit?expandedItem=personalProjects" style={{fontStyle:'oblique', fontWeight: 'bold'}}>Github Link</a>}
                        </div>
                       
                        <div style = {{marginRight: '25px'}}> 
                            {personalProject.projectDescription != "" && personalProject.projectDescription != null ? (
                                <div dangerouslySetInnerHTML={{ __html: personalProject.projectDescription }} />
                            ) : (
                                <a href="/edit?expandedItem=personalProjects">Project Description</a>
                            )}
                        </div>
                      
                    </div>
                )) }
            </div>
        )
    }
}




export default HomePage;