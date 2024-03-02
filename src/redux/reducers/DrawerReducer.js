/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    title: '',
    visible: false,
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: () => { alert('ckick') }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT':
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title }
        case 'SET_SUBMIT_EDIT_PROJECT':
            state.callBackSubmit = action.submitFuncion
            return {...state}
        case 'OPEN_FORM_CREATE_TASK': 
            return {...state, visible: true, ComponentContentDrawer: action.Component, title: action.title}
        default:
            return { ...state }
    }
}
