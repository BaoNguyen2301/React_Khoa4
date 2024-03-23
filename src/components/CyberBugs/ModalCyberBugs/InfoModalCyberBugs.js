import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStatusSaga } from '../../../redux/actions/CyberBugs/StatusAction'
import { getAllPrioritySaga } from '../../../redux/actions/CyberBugs/PriorityAction'
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGNESS, UPDATE_TASK_STATUS_SAGA } from '../../../redux/constants/Cyberbugs/TaskContant'
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs/TaskTypeContant'
import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd';

export default function InfoModalCyberBugs(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    console.log('taskDetailModal', taskDetailModal)
    const { statusList } = useSelector(state => state.StatusReducer)

    const { arrPriority } = useSelector(state => state.PriorityReducer)

    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)

    const { projectDetail } = useSelector(state => state.ProjectReducer)

    const [visibleEditor, setVisibleEditor] = useState(false)

    const [historyContent, setHistoryContent] = useState(taskDetailModal.description)

    const [content, setContent] = useState(taskDetailModal.description)

    const dispatch = useDispatch()

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)

        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{timeTrackingSpent} logged</p>
                        <p className="estimate-time">{timeTrackingRemaining} estimated</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-6">
                    <input className='form-control' name='timeTrackingSpent' onChange={(e) => { handleChange(e) }} />
                </div>
                <div className="col-6">
                    <input className='form-control' name='timeTrackingRemaining' onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
        </div>
    }

    useEffect(() => {
        dispatch(getAllStatusSaga())
        dispatch(getAllPrioritySaga())
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({
            type: 'GET_PROJECT_DETAIL_SAGA',
            projectId: taskDetailModal.projectId
        })
        return () => { }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODEL,
            name,
            value
        })

        // dispatch({
        //     type: CHANGE_TASK_MODEL,
        //     name,
        //     value
        // })
    }


    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />

                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <div className='row'>
                                        <div className='col-5'>
                                            <p className="issue">This is an issue of type: </p>
                                        </div>
                                        <div className='col-3 text-left'>
                                            <select name='typeId' className="custom-select" value={taskDetailModal.typeId} onChange={handleChange}>
                                                {arrTaskType.map((type, index) => {
                                                    return <option key={index} value={type.id}>{type.taskType}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="description">
                                        <p>Description</p>
                                        <div>
                                            {visibleEditor ? <div>
                                                <Editor
                                                    apiKey='sjskzwmsvvf48f63km1l2k34tvyvyj5i317qpwj5k53o0uip'
                                                    initialValue={taskDetailModal.description}
                                                    name='description'
                                                    init={{
                                                        plugins: 'link image code',
                                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                    }}
                                                    onEditorChange={(content, editor) => {
                                                        setContent(content)
                                                    }}
                                                />
                                                <button className='btn btn-primary' onClick={() => {
                                                    dispatch({
                                                        type:HANDLE_CHANGE_POST_API_SAGA,
                                                        actionType: CHANGE_TASK_MODEL,
                                                        name: 'description',
                                                        value: content
                                                    })
                                                    // dispatch({
                                                    //     type: CHANGE_TASK_MODEL,
                                                    //     name: 'description',
                                                    //     value: content
                                                    // })
                                                    setVisibleEditor(false)
                                                }}>Save</button>
                                                <button className='btn btn-danger' onClick={() => {
                                                    dispatch({
                                                        type:HANDLE_CHANGE_POST_API_SAGA,
                                                        actionType: CHANGE_TASK_MODEL,
                                                        name: 'description',
                                                        value: historyContent
                                                    })
                                                    // dispatch({
                                                    //     type: CHANGE_TASK_MODEL,
                                                    //     name: 'description',
                                                    //     value: historyContent
                                                    // })
                                                    setVisibleEditor(false)
                                                }}>Cancel</button>
                                            </div> : <div onClick={() => {
                                                setHistoryContent(content)
                                                setVisibleEditor(!visibleEditor)
                                            }}>
                                                <p dangerouslySetInnerHTML={{ __html: taskDetailModal.description }}></p>
                                            </div>}
                                        </div>

                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require('../../../assets/img/download (1).jfif')} alt='1' />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require('../../../assets/img/download (1).jfif')} alt='1' />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {

                                            handleChange(e)

                                            // const action = {
                                            //     type: UPDATE_TASK_STATUS_SAGA,
                                            //     taskStatusUpdate: {
                                            //         taskId: taskDetailModal.taskId,
                                            //         statusId: e.target.value,
                                            //         projectId: taskDetailModal.projectId
                                            //     }
                                            // }
                                            // dispatch(action)
                                        }}>
                                            {statusList.map((status, index) => {
                                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {taskDetailModal.assigness?.map((assign, index) => {
                                                return <div className='col-6 mt-2 mb-2' key={index}>
                                                    <div style={{ display: 'flex' }} className="item" value={assign.id}>
                                                        <p className="name">
                                                            {assign.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={()=>{
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                                                    actionType: REMOVE_USER_ASSIGNESS,
                                                                    userId: assign.id
                                                                })

                                                                // dispatch({
                                                                //     type: REMOVE_USER_ASSIGNESS,
                                                                //     userId: assign.id
                                                                // })
                                                            }}/>
                                                        </p>
                                                    </div>
                                                </div>
                                            })}

                                            <div className='col-6 mt-2 mb-2'>
                                                <Select
                                                    options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId)
                                                        if (index !== -1) {
                                                            return false
                                                        }
                                                        return true
                                                    })?.map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name }
                                                    })}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    optionFilterProp='label'
                                                    name='lstUser'
                                                    value='+ Add more'

                                                    onSelect={(value) => {
                                                        if (value == '0') {
                                                            return
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId == value)
                                                        userSelected = { ...userSelected, id: userSelected.userId }

                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                            actionType: CHANGE_ASSIGNESS,
                                                            userSelected
                                                        })

                                                        // dispatch({
                                                        //     type: CHANGE_ASSIGNESS,
                                                        //     userSelected
                                                        // })
                                                    }}>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name='priorityId' value={taskDetailModal.priorityId} onChange={(e) => { handleChange(e) }}>
                                            {arrPriority.map((priority, index) => {
                                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name='originalEstimate' type="text" className="estimate-hours" defaultValue={taskDetailModal.originalEstimate} onChange={(e) => { handleChange(e) }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
