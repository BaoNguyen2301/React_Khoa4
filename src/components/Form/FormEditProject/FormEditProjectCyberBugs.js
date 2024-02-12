import React, { useRef, useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { UseDispatch,useDispatch,useSelector } from 'react-redux';

export default function FormEditProjectCyberBugs(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        alert('submit edit')
    }
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({type:'SET_SUBMIT_EDIT_PROJECT', submitFuncion: submitForm})
      return () => {
        
      }
    }, [])
    

    

    return (
        <form className='container-fluid' onSubmit={submitForm}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>project ID</p>
                        <input disabled className='form-control' name='id'></input>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>projectName</p>
                        <input className='form-control' name='projectName'></input>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>creator</p>
                        <input className='form-control' name='creator'></input>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>description</p>
                        <Editor
                            onInit={(evt, editor) => {
                                return editorRef.current = editor
                            }}
                            apiKey='sjskzwmsvvf48f63km1l2k34tvyvyj5i317qpwj5k53o0uip'
                            initialValue="<p>This is the initial content of the editor.</p>"
                            name='description'
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
