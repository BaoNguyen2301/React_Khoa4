/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    projectList: [
        {
            "id": 14587,
            "projectName": "testtestte2",
            "description": "test",
            "categoryId": 1,
            "categoryName": "Dự án web",
            "alias": "testtestte2",
            "deleted": false,
            tags: ['nice', 'developer'],
        }
    ]
}


export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_PROJECT':
            state.projectList = action.listProject
            return { ...state }

        default:
            return { ...state }
    }
}
