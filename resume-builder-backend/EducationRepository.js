import sqlite3 from "sqlite3";

export class EducationRepository {
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

    async getEducationRecords() {
        return new Promise((resolve, reject) => {
            this.db.all('select * from education', (err, rows) => {
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

    async insertIntoEducationTable(universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO education (universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState], (err) => {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            this.db.get('SELECT * FROM education WHERE id = last_insert_rowid()', (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })   
    }

    async updateEducationDetails(id, universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE education SET universityName = ?, degree = ?, startDateMonth = ?, startDateYear = ?, endDateMonth = ?, endDateYear = ?, currentlyStudyHere = ?, locationState = ? where id = ?', [universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState, id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }

                if(this.changes === 0) {
                    reject(new Error("can't update record"))
                }
            })

            this.db.get('SELECT * FROM education where id = ?', [id], (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    async deleteEducation(id) {
        return new Promise((resolve, reject) => {
            this.db.run('delete from education where id = ?', [id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            resolve()
        })
    }
}