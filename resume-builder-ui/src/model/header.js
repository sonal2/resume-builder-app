export class HeaderModel {
    constructor() {

    }

    async getHeader() {
        return fetch('/api/header').then(res => {
            if (res.status == 500) {
                throw new Error();
            }
            else {
                return res.json()
            }
        } 
           
        ).then(res=> 
            res
        )
    }

    async postHeader(header) {
        return fetch('/api/header', {
            method: 'POST',
            body: JSON.stringify(header),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status == 500) {
                throw new Error();
            }
            else {
                return res.json()
            }
        } 
           
        ).then(res=> 
            res
        )
    }

    async putHeader(header) {
        let newHeader = {...header, "id": 1}
        console.log(newHeader)
        return fetch('/api/header', {
            method: 'PUT',
            body: JSON.stringify(newHeader),
            headers: {
                'Content-Type': 'application/json'
            },
        
        }).then(res => {
            if (res.status == 500) {
                throw new Error();
            }
            else {
                return res.json()
            }
        } 
           
        ).then(res=> 
            res
        )
    }

    async save(header) {
        try {
            await this.getHeader()
            console.log('header exists')
            let returnedHeader = await this.putHeader(header)
            console.log(returnedHeader)

        }
        catch (error) {
            let returnedHeader = await this.postHeader(header)
            console.log(returnedHeader)
        }
    }
}