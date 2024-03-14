import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStatusSaga } from '../../../redux/actions/CyberBugs/StatusAction'
import { getAllPrioritySaga } from '../../../redux/actions/CyberBugs/PriorityAction'

export default function InfoModalCyberBugs(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    console.log('taskDetailModal', taskDetailModal)
    const { statusList } = useSelector(state => state.StatusReducer)

    const { arrPriority } = useSelector(state => state.PriorityReducer)

    const dispatch = useDispatch()

    const renderTimeTracking = () =>{

        const {timeTrackingSpent, timeTrackingRemaining} = taskDetailModal

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
        
        const percent = Math.round(Number(timeTrackingSpent)/max *100)

        return <div style={{ display: 'flex' }}>
        <i className="fa fa-clock" />
        <div style={{ width: '100%' }}>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${percent}%`}} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="logged">{timeTrackingSpent} logged</p>
                <p className="estimate-time">{timeTrackingRemaining} estimated</p>
            </div>
        </div>
    </div>
    }

    useEffect(() => {
        dispatch(getAllStatusSaga())
        dispatch(getAllPrioritySaga())

        return () => { }
    }, [])


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
                                    <p className="issue">This is an issue of type: {taskDetailModal.taskTypeDetail?.taskType}.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        <p dangerouslySetInnerHTML={{ __html: taskDetailModal.description }}>
                                        </p>
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
                                        <select className="custom-select" value={taskDetailModal.statusId} onChange={(e)=>{}}>
                                            {statusList.map((status, index) => {
                                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex' }}>
                                            {taskDetailModal.assigness?.map((assign, index) => {
                                                return <div key={index} style={{ display: 'flex' }} className="item">
                                                    <p className="name">
                                                        {assign.name}
                                                        <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                    </p>
                                                </div>
                                            })}

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select value={taskDetailModal.priorityTask?.priorityId} onChange={(e)=>{}}>
                                            {arrPriority.map((priority, index) => {
                                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours" defaultValue={taskDetailModal.originalEstimate}/>
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
