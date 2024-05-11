import { Router } from "express";
import { EducationService } from "./EducationService.js";

const router = Router();

export var getEducationRoute = router.get('/', async (req, res) => {
    let educationService = new EducationService()
    try {
        res.send(await educationService.getEducationDetails())
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

export var postEducationRoute = router.post('/', async (req, res) => {

    let universityName = req.body.universityName
    let degree = req.body.degree
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentlyStudyHere = req.body.currentlyStudyHere
    let locationState = req.body.locationState
    
    let educationService = new EducationService()
    try {
        let education = await educationService.insertIntoEducation(universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState)
        res.send(education)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})

export var putEducationRoute = router.put('/', async (req, res) => {
    let id = req.body.id
    let universityName = req.body.universityName
    let degree = req.body.degree
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentlyStudyHere = req.body.currentlyStudyHere
    let locationState = req.body.locationState
    
    let educationService = new EducationService()
    try {
        let education = await educationService.updateEducation(id, universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState)
        res.send(education)
    }
    catch (err) {
        res.status(500).send(err.message)

    }})


    export var deleteEducationRoute = router.delete('/:id', async (req, res) => {

        let id = req.params.id
        console.log(id)
    
        let educationService = new EducationService()
        try {
            await educationService.deleteEducation(id)
            res.status(200)
            res.send('education record deleted')
        }
        catch (err) {
            res.status(500).send(err.message)
        }
    })