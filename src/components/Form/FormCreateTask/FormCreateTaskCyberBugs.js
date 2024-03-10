import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react'
import { Select, Slider } from 'antd';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/ProjectContant';
import { getAllTaskTypeActionSaga } from '../../../redux/actions/CyberBugs/TaskTypeAction';
import { getAllPrioritySaga } from '../../../redux/actions/CyberBugs/PriorityAction';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { getAllStatusSaga } from '../../../redux/actions/CyberBugs/StatusAction';
import { getAllProjectByIdSaga } from '../../../redux/actions/CyberBugs/UserAction';

function FormCreateTaskCyberBugs(props) {

    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer)

    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)

    const { arrPriority } = useSelector(state => state.PriorityReducer)

    const { arrUser } = useSelector(state => state.UserCyberbugsReducer)

    const { statusList } = useSelector(state => state.StatusReducer)

    //ham bien doi option cho the select
    const userOptions = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })

        dispatch(getAllTaskTypeActionSaga())

        dispatch(getAllPrioritySaga())

        dispatch(getAllStatusSaga())

        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFuncion: handleSubmit })

        return () => {

        }
    }, [])

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select className='form-control' name='projectId' onChange={(e)=>{
                    let {value} = e.target;

                    dispatch(getAllProjectByIdSaga(value))

                    setFieldValue('projectId', e.target.value)
                }}>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>Task name</p>
                <input className='form-control' name='taskName' onChange={handleChange}>
                </input>
            </div>
            <div className='form-group'>
                <p>Status Id</p>
                <select className='form-control' name='statusId' onChange={handleChange}>
                    {statusList.map((status, index) => {
                        return <option key={index} value={status.statusId}>{status.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select className='form-control' name='priorityId' onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {arrTaskType.map((taskTp, index) => {
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
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            optionFilterProp='label'
                            defaultValue={[]}
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            onSearch={(value) => {
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
                                <input type='number' min={0} defaultValue={0} name='originalEstimate' className='form-control' onChange={handleChange} />
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
                                        });
                                        setFieldValue('timeTrackingSpent', e.target.value)
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
                                        setFieldValue('timeTrackingRemaining', e.target.value)
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
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content)
                    }}
                />
            </div>
        </form>
    )
}

const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {arrProject, arrTaskType, arrPriority, statusList} = props;

        // if(arrProject.length>0){
        //     props.dispatch(getAllProjectByIdSaga(arrProject[0]?.id))
        // }

        return {
            taskName: '',
            description: '',
            statusId: statusList[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: 'CREATE_TASK_SAGA',
            taskObject: values
        })
        console.log('taskObject', values)
    },
    displayName: 'createTaskForm',
})(FormCreateTaskCyberBugs);

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberBugsReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        statusList: state.StatusReducer.statusList
    }
}

export default connect(mapStateToProps)(frmCreateTask);
