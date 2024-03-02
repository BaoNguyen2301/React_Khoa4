import { Editor } from '@tinymce/tinymce-react';
import React from 'react'
import { Select } from 'antd';

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

export default function FormCreateTaskCyberBugs() {
    const handleEditorChange = (content, editor) => {

    }
    return (
        <div className='container-fluid'>
            <div className='form-group'>
                <p>Project</p>
                <select className='form-control' name='projectId'>
                    <option value="̀54">Project A</option>
                    <option value="̀55">Project B</option>
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select className='form-control' name='priorityId'>
                            <option>High</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select className='form-control' name='typeId' >
                            <option>Task</option>
                            <option>Bugs</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p>Creator</p>
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    options={options}
                />
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
