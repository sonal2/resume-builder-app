import sqlite3 from "sqlite3";

export class WorkExperienceRepository {
    constructor() {
        this.db = new sqlite3.Database('./database/portfolioDB', (err) => {
            if (err) {
                console.error('Error connecting database: ', err.message);
            }
            else {
                console.log('Connected to the database');
            }
        });
    }


    async getWorkExperienceRecords() {
        return new Promise((resolve, reject) => {
            this.db.all('select * from workExperience', (err, rows) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log('rows: ', rows)
                    resolve(rows)
                }
            });
        });
    }

    async insertIntoWorkExperience(title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO workExperience (title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities], (err) => {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            this.db.get('SELECT * FROM workExperience WHERE id = last_insert_rowid()', (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })   
    }


    async updateWorkExperience(id, title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE workExperience SET title = ?, company = ?, startDateMonth = ?, startDateYear = ?, endDateMonth = ?, endDateYear = ?, currentlyWorkHere = ?, locationCityState = ?, workResponsibilities = ? where id = ?', [title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities, id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }

                if(this.changes === 0) {
                    reject(new Error("can't update record"))
                }
            })

            this.db.get('SELECT * FROM workExperience where id = ?', [id], (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    async deleteWorkExperience(id) {
        return new Promise((resolve, reject) => {
            this.db.run('delete from workExperience where id = ?', [id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            resolve()
        })
    }
}