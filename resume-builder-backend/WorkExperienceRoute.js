import { Router } from "express";
import { WorkExperienceService } from "./WorkExperienceService.js";

const router = Router();

export var getWorkExperienceRoute = router.get('/', async (req, res) => {
    let workExperienceService = new WorkExperienceService()
    try {
        res.send(await workExperienceService.getWorkExperiences())
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

export var postWorkExperienceRoute = router.post('/', async (req, res) => {

    let title = req.body.title
    let company = req.body.company
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentlyWorkHere = req.body.currentlyWorkHere
    let locationCityState = req.body.locationCityState
    let workResponsibilities = req.body.workResponsibilities
    
    let workExperienceService = new WorkExperienceService()
    try {
        let workExperience = await workExperienceService.insertIntoWorkExperience(title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities)
        res.send(workExperience)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})

export var putWorkExperienceRoute = router.put('/', async (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let company = req.body.company
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentlyWorkHere = req.body.currentlyWorkHere
    let locationCityState = req.body.locationCityState
    let workResponsibilities = req.body.workResponsibilities
    
    let workExperienceService = new WorkExperienceService()
    try {
        let workExperience = await workExperienceService.updateWorkExperience(id, title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities)
        res.send(workExperience)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})


export var deleteWorkExperienceRoute = router.delete('/:id', async (req, res) => {

    let id = req.params.id
    console.log(id)

    let workExperienceService = new WorkExperienceService()
    try {
        await workExperienceService.deleteWorkExperience(id)
        res.status(200)
        res.send('work experience record deleted')
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})