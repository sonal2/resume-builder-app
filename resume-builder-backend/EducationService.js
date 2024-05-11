import { EducationRepository } from "./EducationRepository.js";

export class EducationService {
    constructor() {
        this.educationRepository = new EducationRepository()
    }

    async getEducationDetails() {
        let educationRecords = await this.educationRepository.getEducationRecords()

        educationRecords.sort((a, b) => {
            if (a.currentlyStudyHere && b.currentlyStudyHere) {
                // Both are currently studying
                return new Date(b.startDateYear, this.getMonthIndex(b.startDateMonth)) -
                    new Date(a.startDateYear, this.getMonthIndex(a.startDateMonth));
            } else if (!a.currentlyStudyHere && !b.currentlyStudyHere) {
                // Both are not currently studying
                return new Date(b.endDateYear, this.getMonthIndex(b.endDateMonth)) -
                    new Date(a.endDateYear, this.getMonthIndex(a.endDateMonth));
            } else {
                // One is currently studying, the other is not
                if (a.currentlyStudyHere) {
                    return -1; // a is currently studying, so it comes first
                } else {
                    return 1; // b is currently studying, so it comes first
                }
            }
        });

        return educationRecords
    }

    getMonthIndex(month) {
        return new Date(Date.parse(month + " 1, 2000")).getMonth();
    }


    async insertIntoEducation(universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState) {
        return await this.educationRepository.insertIntoEducationTable(universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState)
    }
    
    async updateEducation(id, universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState) {
        return await this.educationRepository.updateEducationDetails(id, universityName, degree, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyStudyHere, locationState)
    }

    async deleteEducation(id) {
        await this.educationRepository.deleteEducation(id)
    }
}