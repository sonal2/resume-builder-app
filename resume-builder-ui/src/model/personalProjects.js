export default class PersonalProjectsModel {
    constructor() {

    }

    async getPersonalProjects() {
        return fetch('/api/personalProjects').then(res => {
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

    async postPersonalProjects(personalProject) {
        return fetch('/api/personalProjects', {
            method: 'POST',
            body: JSON.stringify(personalProject),
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

    async putPersonalProjects(personalProject) {
        return fetch('/api/personalProjects', {
            method: 'PUT',
            body: JSON.stringify(personalProject),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status == 500) {
                throw new Error;
            }
         
        }
        ).then(res=> 
            res
        )
    }

    async deletePersonalProjects(id) {
        return fetch(`/api/personalProjects/${id}`, {
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

    async savePersonalProjects(personalProjects) {
        console.log('inside save personal projects model')
        try {
            let existingPersonalProjects = await this.getPersonalProjects()

            let set = new Set()
            existingPersonalProjects.forEach(element => {
                set.add(element.id)
            });

    
            for(let i = 0; i < personalProjects.length; i++) {
                if(!set.has(personalProjects[i].id)) {
                    await this.postPersonalProjects(personalProjects[i])
                }
                else {
                    if(set.has(personalProjects[i].id)) {
                        console.log(personalProjects[i].id)
                        console.log(personalProjects[i])
                        await this.putPersonalProjects(personalProjects[i])
    
                        set.delete(personalProjects[i].id)
                    }
                }
            }

            let deletePromises = []
            set.forEach(async(id) => {
                deletePromises.push(this.deletePersonalProjects(id))
            })          

            await Promise.all(deletePromises)
        }
        catch {
            for(let i = 0; i < personalProjects.length; i++) {
                await this.postPersonalProjects(personalProjects[i])
            }
        }


    }
}