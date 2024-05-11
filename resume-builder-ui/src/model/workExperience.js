export class WorkExperienceModel {
    constructor() {

    }

    async getWorkExperiences() {
        return fetch('/api/workExperience').then(res => {
            if (res.status == 500) {
                throw new Error;
            }
            else {
                return res.json()
            }
        }
        ).then(res=> 
            res
        )
    }

    async postWorkExperience(workExperience) {
        return fetch('/api/workExperience', {
            method: 'POST',
            body: JSON.stringify(workExperience),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status == 500) {
                throw new Error;
            }
            else {
                return res.json()
            }
        }
        ).then(res=> 
            res
        )
    }

    async putWorkExperience(workExperience) {
        return fetch('/api/workExperience', {
            method: 'PUT',
            body: JSON.stringify(workExperience),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status == 500) {
                throw new Error;
            }
            else {
                return res.json()
            }
        }
        ).then(res=> 
            res
        )
    }

    async deleteWorkExperience(id) {
        return fetch(`/api/workExperience/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.status == 500) {
                throw new Error;
            }
           
        }
        ).then(res=> 
            res
        )
    }


    async saveWorkExperiences(workExperiences) {
        console.log('inside save work experiences model')
        try {
            let existingWorkExperiences = await this.getWorkExperiences()

            let set = new Set()
            existingWorkExperiences.forEach(element => {
                set.add(element.id)
            });

    
            for(let i = 0; i < workExperiences.length; i++) {
                if(!set.has(workExperiences[i].id)) {
                    await this.postWorkExperience(workExperiences[i])
                }
                else {
                    if(set.has(workExperiences[i].id)) {
                        console.log(workExperiences[i].id)
                        console.log(workExperiences[i])
                        await this.putWorkExperience(workExperiences[i])
    
                        set.delete(workExperiences[i].id)
                    }
                }
            }

            let deletePromises = []
            set.forEach(async(id) => {
                deletePromises.push(this.deleteWorkExperience(id))
            })          

            await Promise.all(deletePromises)
        }
        catch {
            for(let i = 0; i < workExperiences.length; i++) {
                await this.postWorkExperience(workExperiences[i])
            }
        }


    }
}