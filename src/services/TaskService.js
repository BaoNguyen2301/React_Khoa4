import { baseService } from "./baseService";

export class TaskService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }

    createTask = (taskObject) => {
        return this.post(`Project/createTask`, taskObject)
    }

    getTaskDetail = (taskId) =>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (taskStatusUpdate) => {
        return this.put('Project/updateStatus', taskStatusUpdate)
    }

    updateTask = (taskUpdate) => {
        return this.post('Project/updateTask', taskUpdate)
    }
}

export const taskService = new TaskService();