import axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN} from "../util/constants/settingSystem";

export const cyberbugsService = {
    signinCyberBugs: (userLogin)=>{
       return axios({
            url: `${DOMAIN_CYBERBUG}/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getAllProjectCategory:()=>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET'
        })
    },
    createProjectAuthorization: (newProject)=>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getListProject: ()=>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}
