import { PersonalProjectsRepository } from "./PersonalProjectsRepository.js"

export class PersonalProjectsService {
    constructor() {
        this.personalProjectsRepository = new PersonalProjectsRepository()
    }

    async getPersonalProjects() {
        let personalProjectRecords = await this.personalProjectsRepository.getPersonalProjects()

        personalProjectRecords.sort((a, b) => {
            if (a.currentProject && b.currentProject) {
                // Both are current projects
                return new Date(b.startDateYear, this.getMonthIndex(b.startDateMonth)) -
                    new Date(a.startDateYear, this.getMonthIndex(a.startDateMonth));
            } else if (!a.currentProject && !b.currentProject) {
                // Both are not current projects
                return new Date(b.endDateYear, this.getMonthIndex(b.endDateMonth)) -
                    new Date(a.endDateYear, this.getMonthIndex(a.endDateMonth));
            } else {
                // One is current project, the other is not
                if (a.currentProject) {
                    return -1; // a is current project, so it comes first
                } else {
                    return 1; // b is current project, so it comes first
                }
            }
        });

        return personalProjectRecords
    }

    getMonthIndex(month) {
        return new Date(Date.parse(month + " 1, 2000")).getMonth();
    }

    async insertIntoPersonalProjects(title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink) {
        return await this.personalProjectsRepository.insertIntoPersonalProjects(title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink)
    }

    async updatePersonalProjects(id, title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink) {
        return await this.personalProjectsRepository.updatePersonalProjects(id, title, startDateMonth, startDateYear, endDateMonth, endDateYear, currentProject, projectDescription, githubLink)
    }

    async deletePersonalProjects(id) {
        await this.personalProjectsRepository.deletePersonalProjects(id)
    }
}