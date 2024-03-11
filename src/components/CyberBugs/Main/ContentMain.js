import React from 'react'

export default function ContentMain(props) {
    const {projectDetail} = props;
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((task, index)=>{
            return <div key={index} className="card" style={{ width: '17rem', height: 'auto' }}>
            <div className="card-header">
                {task.statusName}
            </div>
            <ul className="list-group list-group-flush">
                {task.lstTaskDeTail.map((taskItem, index)=>{
                    return <li key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                    <p className='font-weight-bold'>
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
                                {taskItem.assigness?.map((assign, index)=>{
                                    return <div key={index} className="avatar">
                                    <img src={assign.avatar} alt={assign.avatar}/>
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
        <div className="content" style={{ display: 'flex'}}>
            {renderCardTaskList()}
        </div>
    )
}
