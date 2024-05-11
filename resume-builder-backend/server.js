import fs from 'fs'
import path from 'path'
import express from 'express'
import { getHeaderRoute, postHeaderRoute, putHeaderRoute } from './HeaderRoute.js';
import { deleteEducationRoute, getEducationRoute, postEducationRoute, putEducationRoute } from './EducationRoute.js';
import { deleteWorkExperienceRoute, getWorkExperienceRoute, postWorkExperienceRoute, putWorkExperienceRoute } from './WorkExperienceRoute.js';
import { deletePersonalProjectsRoute, getPersonalProjectsRoute, postPersonalProjectsRoute, putPersonalProjectsRoute } from './PersonalProjectsRoute.js';
import { getProfilePhoto, postProfilePhoto } from './profilePhotoRoute.js';
const app = express();



fs.readFile('serverSettings.json', 'utf-8', function(err, data) {
    if(err) {
        throw err;
    }
    else {
        let serverSettings = JSON.parse(data);
        const port = serverSettings.port;

        app.use(express.json())
        app.use('/api/header', getHeaderRoute)
        app.use('/api/header', postHeaderRoute)
        app.use('/api/header', putHeaderRoute)
        app.use('/api/education', getEducationRoute)
        app.use('/api/education', postEducationRoute)
        app.use('/api/education', putEducationRoute)
        app.use('/api/education/', deleteEducationRoute)
        app.use('/api/workExperience', getWorkExperienceRoute)
        app.use('/api/workExperience', postWorkExperienceRoute)
        app.use('/api/workExperience', putWorkExperienceRoute)
        app.use('/api/workExperience/', deleteWorkExperienceRoute)
        app.use('/api/personalProjects', getPersonalProjectsRoute)
        app.use('/api/personalProjects', postPersonalProjectsRoute)
        app.use('/api/personalProjects', putPersonalProjectsRoute)
        app.use('/api/personalProjects/', deletePersonalProjectsRoute)
        app.use('/api/profilePhoto', getProfilePhoto)
        app.use('/api/profilePhoto', postProfilePhoto)


        app.get('/api/editMode', async (req, res) => {
            try {
                const filePath = path.join(process.cwd(), 'isEditMode.txt')

                fs.readFile(filePath, 'utf8', (err, data) => {
                    if(err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    const isEditMode = data.trim() === 'true';
                    res.json({ isEditMode });
                })
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })

        app.post('/api/editMode', async(req, res) => {
            try {
                const isEditMode = req.body.isEditMode

                if (isEditMode !== true && isEditMode !== false) {
                    return res.status(400).json({ error: 'Invalid value for isEditMode. Must be true or false.' });
                }

                const filePath = path.join(process.cwd(), 'isEditMode.txt');

                fs.writeFile(filePath, isEditMode.toString(), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
        
                    res.json({ message: 'Successfully updated isEditMode.' });
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
    

       
        bindToPort(port)
        
       
        
    }
})

function bindToPort(port) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    }).on('error', () => {
        console.log(`app is already listening to port ${port}. Trying with port: ${port+1}`)
        bindToPort(port+1)
    })
}

export default app