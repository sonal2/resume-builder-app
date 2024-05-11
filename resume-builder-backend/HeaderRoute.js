import { Router } from "express";
import { HeaderService } from "./HeaderService.js";

const router = Router();

export var getHeaderRoute = router.get('/', async (req, res) => {
    let headerService = new HeaderService()
    try {
        let header = await headerService.getHeader()
        res.send(header)
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

export var postHeaderRoute = router.post('/', async (req, res) => {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let catchyHeadline = req.body.catchyHeadline
    let locationCityState = req.body.locationCityState
    let phoneNumber = req.body.phoneNumber
    
    let headerService = new HeaderService()
    try {
        let header = await headerService.insertIntoHeader(firstName, lastName, catchyHeadline, locationCityState, phoneNumber)
        res.send(header)
    }
    catch (err) {
        res.status(500).send(err.message)

    }
})

export var putHeaderRoute = router.put('/', async (req, res) => {
    console.log(JSON.stringify(req.body))
    let id = req.body.id
    console.log(`id ${id}`)
    let firstName = req.body.firstName
    console.log(firstName)
    let lastName = req.body.lastName
    let catchyHeadline = req.body.catchyHeadline
    let locationCityState = req.body.locationCityState
    let phoneNumber = req.body.phoneNumber
    
    let headerService = new HeaderService()
    try {
        let header = await headerService.updateHeader(id, firstName, lastName, catchyHeadline, locationCityState, phoneNumber)
        res.send(header)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)

    }})