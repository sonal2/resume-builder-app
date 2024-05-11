import sqlite3 from "sqlite3";

export class HeaderRepository {

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

    async getHeaderCount() {
        return new Promise((resolve, reject) => {
            this.db.all('select COUNT(*) as count from header', (err, rows) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log('rows: ', rows)
                    resolve(rows[0].count)
                }
            });
        });
    }

    async getHeaderDetails() {
        return new Promise((resolve, reject) => {
            this.db.all('select * from header', (err, row) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log('rows: ', row)
                    resolve(row)
                }
            });
        });
    }

    async insertIntoHeader(firstName, lastName, catchyHeadline, locationCityState, phoneNumber) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO header (id, firstName, lastName, catchyHeadline, locationCityState, phoneNumber) VALUES (1, ?, ?, ?, ?, ?)', [firstName, lastName, catchyHeadline, locationCityState, phoneNumber], (err) => {
                if(err) {
                    console.error(err)
                    reject(err)
                }
            })

            this.db.get('SELECT * FROM header', (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    async updateHeaderDetails(id, firstName, lastName, catchyHeadline, locationCityState, phoneNumber) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE header SET firstName = ?, lastName = ?, catchyHeadline = ?, locationCityState = ?, phoneNumber = ? where id = ?', [firstName, lastName, catchyHeadline, locationCityState, phoneNumber, id], function(err) {
                if(err) {
                    console.error(err)
                    reject(err)
                }

                if(this.changes === 0) {
                    reject(new Error("can't update record"))
                }
            })

            this.db.get('SELECT * FROM header', (err, row) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    //No delete for header because there is only one record

}