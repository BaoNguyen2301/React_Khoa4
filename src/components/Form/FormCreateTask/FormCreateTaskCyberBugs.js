import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react'
import { Select, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/ProjectContant';
import { getAllTaskTypeActionSaga } from '../../../redux/actions/CyberBugs/TaskTypeAction';
import { getAllPrioritySaga } from '../../../redux/actions/CyberBugs/PriorityAction';

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

export default function FormCreateTaskCyberBugs(props) {

    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer)

    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)

    const {arrPriority} = useSelector (state => state.PriorityReducer)

    const {userSearch} = useSelector (state => state.UserCyberbugsReducer)
    
    const searchRef = useRef(null)
    //ham bien doi option cho the select
    const userOptions = userSearch.map((item, index)=>{
        return {value: item.userId, label: item.name}
    })

    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch({type: GET_ALL_PROJECT_SAGA})

        dispatch(getAllTaskTypeActionSaga())

        dispatch(getAllPrioritySaga())

        return () => {

        }
    }, [])


    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    // const {
    //     values,
    //     touched,
    //     errors,
    //     handleChange,
    //     handleBlur,
    //     handleSubmit,
    //     setFieldValue
    // } = props;

    const handleEditorChange = (content, editor) => {

    }
    return (
        <div className='container-fluid'>
            <div className='form-group'>
                <p>Project</p>
                <select className='form-control' name='projectId'>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}

                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select className='form-control' name='priorityId'>
                            {arrPriority.map((priority, index)=>{
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select className='form-control' name='typeId' >
                            {arrTaskType.map((taskTp, index)=> {
                                return <option key={index} value={taskTp.id}>{taskTp.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            optionFilterProp='label'
                            defaultValue={[]}
                            onChange={handleChange}
                            onSearch={(value)=>{
                                dispatch({
                                    type: 'GET_USER_API',
                                    keyWord: value
                                  })
                            }}
                            options={userOptions}
                        />
                        <div className='row'>
                            <div className='col-12 mt-3'>
                                <p>original Estimate</p>
                                <input type='number' min={0} defaultValue={0} name='originalEstimate' className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                            tooltip={{
                                open: true,
                            }}
                        />
                        <div className='row'>
                            <div className='col-6'>
                                <div className='text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</div>
                            </div>
                            <div className='col-6'>
                                <div className='text-right font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input
                                    type='number'
                                    defaultValue={0}
                                    min={0}
                                    className='form-control'
                                    name='timeTrackingSpent'
                                    onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracking,
                                            timeTrackingSpent: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input
                                    type='number'
                                    defaultValue={0}
                                    min={0}
                                    className='form-control'
                                    name='timeTrackingRemaining'
                                    onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracking,
                                            timeTrackingRemaining: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor
                    apiKey='sjskzwmsvvf48f63km1l2k34tvyvyj5i317qpwj5k53o0uip'
                    initialValue=""
                    name='description'
                    init={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    )
}
