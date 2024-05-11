export class EducationModel {
    constructor() {

    }

    async getEducation() {
        return fetch('/api/education').then(res => {
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

    async postEducation(education) {
        return fetch('/api/education', {
            method: 'POST',
            body: JSON.stringify(education),
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

    async putEducation(education) {
        return fetch('/api/education', {
            method: 'PUT',
            body: JSON.stringify(education),
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

    async deleteEducation(id) {
        return fetch(`/api/education/${id}`, {
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

    async saveEducations(educations) {
        console.log('inside save educations model')
        try {
            let existingEducations = await this.getEducation()

            let set = new Set()
            existingEducations.forEach(element => {
                set.add(element.id)
            });

    
            for(let i = 0; i < educations.length; i++) {
               
                if(!set.has(educations[i].id)) {
                    await this.postEducation(educations[i])
                }
                else {
                    if(set.has(educations[i].id)) {
                        console.log(educations[i].id)
                        console.log(educations[i])
                        await this.putEducation(educations[i])
    
                        set.delete(educations[i].id)
                    }
                }
            }

            let deletePromises = []
            set.forEach(async(id) => {
                deletePromises.push(this.deleteEducation(id))
            })          

            await Promise.all(deletePromises)
        }
        catch {
            for(let i = 0; i < educations.length; i++) {
                await this.postEducation(educations[i])
            }
        }


    }
}