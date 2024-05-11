import { HeaderRepository } from "./HeaderRepository.js";

export class HeaderService {
    constructor() {
        this.headerRepository = new HeaderRepository();
    }

    async getHeader() {
        let count = await this.headerRepository.getHeaderCount()

        if(count == 1) {
            let headerDetails = await this.headerRepository.getHeaderDetails();
            return headerDetails;
        }
        else {
            throw new Error("no header record found")
        }
    }

    async insertIntoHeader(firstName, lastName, catchyHeadline, locationCityState, phoneNumber) {
        let count = await this.headerRepository.getHeaderCount()
        console.log(count)
        if(count == 0) {
            return await this.headerRepository.insertIntoHeader(firstName, lastName, catchyHeadline, locationCityState, phoneNumber)
        }
        else {
            throw new Error("Header already has an entry. Can't insert anymore into this table")
        }

    }

    async updateHeader(id, firstName, lastName, catchyHeadline, locationCityState, phoneNumber) {
        return await this.headerRepository.updateHeaderDetails(id, firstName, lastName, catchyHeadline, locationCityState, phoneNumber)
    }
}