import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA } from '../../../redux/constants/Cyberbugs/TaskContant';
export default function ContentMain(props) {
    const dispatch = useDispatch()
    const { projectDetail } = props;
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((task, index) => {
            return <div key={index} className="card" style={{ width: '17rem', height: 'auto' }}>
                <div className="card-header" >
                    {task.statusName}
                </div>
                <ul className="list-group list-group-flush">
                    {task.lstTaskDeTail.map((taskItem, index) => {
                        return <li key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} onClick={() => {
                            dispatch({
                                type: GET_TASK_DETAIL_SAGA,
                                taskId: taskItem.taskId
                            })
                        }}>
                            <p className='font-weight-bold' >
                                {taskItem.taskName}
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    <p className='text-danger'>{taskItem.priorityTask.priority}</p>
                                    {/* <i className="fa fa-bookmark" />
                            <i className="fa fa-arrow-up" /> */}
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        {taskItem.assigness?.map((assign, index) => {
                                            return <div key={index} className="avatar">
                                                <img src={assign.avatar} alt={assign.avatar} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        })
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>
    )
}
