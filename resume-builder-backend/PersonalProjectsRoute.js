import { Router } from "express";
import { PersonalProjectsService } from "./PersonalProjectsService.js";

const router = Router()

export var getPersonalProjectsRoute = router.get('/', async (req, res) => {
    let personalProjectsService = new PersonalProjectsService()
    try {
        res.send(await personalProjectsService.getPersonalProjects())
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

export var postPersonalProjectsRoute = router.post('/', async (req, res) => {

    let title = req.body.title
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentProject = req.body.currentProject
    let projectDescription = req.body.projectDescription
    let githubLink = req.body.githubLink
    
    let personalProjectsService = new PersonalProjectsService()
    try {
        let personalProjects = await personalProjectsService.insertIntoPersonalProjects(title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink)
        res.send(personalProjects)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})

export var putPersonalProjectsRoute = router.put('/', async (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let startDateMonth = req.body.startDateMonth
    let startDateYear = req.body.startDateYear
    let endDateMonth = req.body.endDateMonth
    let endDateYear = req.body.endDateYear
    let currentProject = req.body.currentProject
    let projectDescription = req.body.projectDescription
    let githubLink = req.body.githubLink
    
    let personalProjectsService = new PersonalProjectsService()
    try {
        let personalProjects = await personalProjectsService.updatePersonalProjects(id, title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink)
        res.send(personalProjects)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})


export var deletePersonalProjectsRoute = router.delete('/:id', async (req, res) => {

    let id = req.params.id
    console.log(id)

    let personalProjectsService = new PersonalProjectsService()
    try {
        await personalProjectsService.deletePersonalProjects(id)
        res.status(200)
        res.send('personal projects record deleted')
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})