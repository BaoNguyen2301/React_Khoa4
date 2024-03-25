import React, { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import './DemoDragDrop.css'

const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
]

export default function DemoDragDrop(props) {

    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({})
    const tagDragEnter = useRef({})

    //Animation
    const [propsSpring, set, stop] = useSpring(
        () => ({
            from: { bottom: -25 },
            to: { bottom: 0 },
            config: { duration: 250 },
            reset: true
        }),
        []
    )

    const handleDragStart = (e, task, index) => {
        // console.log('tag', e.target);
        // console.log('task', task);
        // console.log('index', index);
        tagDrag.current = task;
    }

    const handleDragOver = (e, taskDragEnter, index) => {
        // console.log('tagover', e.target);

    }

    const handleDragEnter = (e, taskDragEnter, index) => {

        set({ bottom: 0 })
        // console.log('tagend', e.target);

        console.log(taskDragEnter)

        tagDragEnter.current = { ...taskDragEnter }

        let taskListUpdate = [...taskList]
        //Lay ra index thang dang keo
        let indexDragTag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id)
        //Lay ra index thang bi keo qua
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id)

        let temp = taskListUpdate[indexDragTag]

        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter]

        taskListUpdate[indexDragEnter] = temp

        setTaskList(taskListUpdate)
    }

    const handleDragEnd = (e) => {


    }

    const handleDrop = (e) => {

        console.log('drop', e.target)
    }

    return (
        <div className='container' onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }} onDrop={(e) => {
            tagDrag.current = {};

            setTaskList([...taskList])
        }}>
            <div className='text-center display-4' onDragOver={handleDragOver}> Task list</div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='bg-dark p-5 col-4'>
                    {taskList.map((task, index) => {

                        let cssDragTag = task.id === tagDrag.current.id ? 'dragTag' : '';

                        if (task.id === tagDragEnter.current.id) {
                            return <animated.div
                                style={{
                                    position: 'relative',
                                    bottom: propsSpring.bottom.to([0, 1], ['-25px', '0px']),
                                }}
                                draggable='true'
                                onDragStart={(e) => { handleDragStart(e, task, index) }}
                                onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                                onDragEnd={(e) => { handleDragEnd(e) }}
                                className={`bg-success text-white m-1 p-3`}
                                key={index}
                                value={task.id}>
                                {task.taskName}
                            </animated.div>
                        }

                        return <div
                            draggable='true'
                            onDragStart={(e) => { handleDragStart(e, task, index) }}
                            onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                            onDragEnd={(e) => { handleDragEnd(e) }}
                            className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
                            key={index}
                            value={task.id}>
                            {task.taskName}
                        </div>
                    })}
                </div>
                <div
                    className='col-4 bg-primary'
                    style={{ height: 500 }}
                >drop</div>
            </div>
        </div>
    )
}

// onDragOver={(e) => {
//     e.stopPropagation();
//     e.preventDefault();
// }}