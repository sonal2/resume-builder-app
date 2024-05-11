import multer from "multer";
import { Router } from "express";
import fs from 'fs'
import path from 'path'

const router = Router();
const upload = multer({dest: 'uploads/'})

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname))
const uploadDir = path.join(__dirname, 'uploads'); // Define uploadDir here

export var postProfilePhoto = router.post('/', upload.single('photo'), async (req, res) => {
    try {
        if (req.file.filename) {
            // Delete all existing files in the uploads folder
            console.log(req.file.filename)

            // Save the new file
            console.log(req.file)
            console.log(path.join(__dirname, req.file.path))
            console.log(path.join(uploadDir, req.file.originalname))
            fs.renameSync(path.join(__dirname, req.file.path), path.join(uploadDir, req.file.originalname));

            await deleteAllFilesExcept(uploadDir, req.file.originalname);

            console.log('Profile photo uploaded and replaced successfully');
            res.send('Profile photo uploaded and replaced successfully');
        } else {
            throw new Error('No file uploaded');
        }
    } catch (err) {
        console.error('Error uploading profile photo:', err);
        res.status(500).send('Failed to upload profile photo');
    }
});

async function deleteAllFilesExcept(dirPath, filename) {
    console.log(dirPath)
    console.log(fs.existsSync(dirPath))
    if (fs.existsSync(dirPath)) {
        console.log('true');
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if(file != filename) {
                await fs.promises.rm(filePath);
            }
        }
    }
    else {
        console.log('false')
    }
}


export var getProfilePhoto = router.get('/', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            // Handle error
            res.status(500).send('Internal Server Error');
            return;
        }

        if (files.length === 1) {
            const filename = files[0];
            res.download(`uploads/${filename}`, (err) => {
                if (err) {
                    // Handle error, such as file not found
                    res.status(404).send('Profile photo not found');
                }
            });
        } else {
            // Handle case where there are no files or multiple files
            res.status(404).send('Profile photo not found');
        }
    });
});