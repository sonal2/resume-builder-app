import sqlite3 from "sqlite3";

export class PersonalProjectsRepository {
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

    async getPersonalProjects() {
        return new Promise((resolve, reject) => {
            this.db.all('select * from personalProjects', (err, rows) => {
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

    async insertIntoPersonalProjects(title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO personalProjects (title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink], (err) => {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            this.db.get('SELECT * FROM personalProjects WHERE id = last_insert_rowid()', (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })   
    }

    async updatePersonalProjects(id, title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE personalProjects SET title = ?, startDateMonth = ?, startDateYear = ?, endDateMonth = ?, endDateYear = ?, currentProject = ?, projectDescription = ?, githubLink = ? where id = ?', [title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink, id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }

                if(this.changes === 0) {
                    reject(new Error("can't update record"))
                }
            })

            this.db.get('SELECT * FROM personalProjects where id = ?', [id], (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    async deletePersonalProjects(id) {
        return new Promise((resolve, reject) => {
            this.db.run('delete from personalProjects where id = ?', [id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            resolve()
        })
    }
}