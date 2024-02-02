import axios from "axios";
import { DOMAIN_CYBERBUG} from "../util/constants/settingSystem";

export const cyberbugsService = {
    signinCyberBugs: (userLogin)=>{
       return axios({
            url: `${DOMAIN_CYBERBUG}/Users/signin`,
            method: 'POST',
            data: userLogin
        })
    }
}
