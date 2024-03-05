import { baseService } from "./baseService";

export class PriorityService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }

    getAllPriority = () =>{
        return this.get(`Priority/getAll`)
    }
}

export const priorityService = new PriorityService();