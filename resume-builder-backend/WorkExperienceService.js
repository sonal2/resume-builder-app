import { WorkExperienceRepository } from "./WorkExperienceRepository.js";

export class WorkExperienceService {
    constructor() {
        this.workExperienceRepository = new WorkExperienceRepository()
    }

    async getWorkExperiences() {
        let workExperienceRecords = await this.workExperienceRepository.getWorkExperienceRecords()

        workExperienceRecords.sort((a, b) => {
            if (a.currentlyWorkHere && b.currentlyWorkHere) {
                // Both are current work experiences
                return new Date(b.startDateYear, this.getMonthIndex(b.startDateMonth)) -
                    new Date(a.startDateYear, this.getMonthIndex(a.startDateMonth));
            } else if (!a.currentlyWorkHere && !b.currentlyWorkHere) {
                // Both are not current work experiences
                return new Date(b.endDateYear, this.getMonthIndex(b.endDateMonth)) -
                    new Date(a.endDateYear, this.getMonthIndex(a.endDateMonth));
            } else {
                // One is current work experience, the other is not
                if (a.currentlyWorkHere) {
                    return -1; // a is current work experience, so it comes first
                } else {
                    return 1; // b is current work experience, so it comes first
                }
            }
        });

        return workExperienceRecords
    }

    getMonthIndex(month) {
        return new Date(Date.parse(month + " 1, 2000")).getMonth();
    }

    async insertIntoWorkExperience(title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities) {
        return await this.workExperienceRepository.insertIntoWorkExperience(title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities)
    }

    async updateWorkExperience(id, title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities) {
        return await this.workExperienceRepository.updateWorkExperience(id, title, company, startDateMonth, startDateYear, endDateMonth, endDateYear, currentlyWorkHere, locationCityState, workResponsibilities)
    }

    async deleteWorkExperience(id) {
        await this.workExperienceRepository.deleteWorkExperience(id)
    }
}