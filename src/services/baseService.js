import axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"

export class baseService {

    put = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    get = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'GET',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method: 'DELETE',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

}