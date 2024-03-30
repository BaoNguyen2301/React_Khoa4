import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA, UPDATE_TASK_STATUS_SAGA } from '../../../redux/constants/Cyberbugs/TaskContant';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
export default function ContentMain(props) {
    const dispatch = useDispatch()
    const { projectDetail } = props;
    const handleDragEnd = (result) => {
        let {projectId, taskId} = JSON.parse(result.draggableId)
        let { destination, source } = result;
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        dispatch({
            type: UPDATE_TASK_STATUS_SAGA,
            taskStatusUpdate: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                "projectId": projectId
            }
        })
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {projectDetail.lstTask?.map((task, index) => {
                return <Droppable droppableId={task.statusId} key={index}>
                    {(provided) => {
                        return <div
                            className="card"
                            style={{ width: '17rem', height: 'auto' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className="card-header" >
                                {task.statusName}
                            </div>
                            <ul

                                className="list-group list-group-flush">
                                {task.lstTaskDeTail.map((taskItem, index) => {
                                    return <Draggable draggableId={JSON.stringify({projectId: taskItem.projectId, taskId: taskItem.taskId})} index={index} key={taskItem.taskId.toString()}>
                                        {(provided) => {
                                            return <li
                                                className="list-group-item"
                                                data-toggle="modal"
                                                data-target="#infoModal"
                                                onClick={() => {
                                                    dispatch({
                                                        type: GET_TASK_DETAIL_SAGA,
                                                        taskId: taskItem.taskId
                                                    })
                                                }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                        }}

                                    </Draggable>
                                })}
                            </ul>
                            {provided.placeholder}
                        </div>
                    }}

                </Droppable>
            })}
        </DragDropContext>
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>
    )
}
