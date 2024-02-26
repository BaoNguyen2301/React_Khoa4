import { baseService } from "./baseService";

export class ProjectService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }

    deleteProject = (id) =>{
       return this.delete(`Project/deleteProject?projectId=${id}`)
    }
}

export const projectService = new ProjectService();