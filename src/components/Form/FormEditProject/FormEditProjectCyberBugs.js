import React, { useRef, useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch, useSelector, connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { getAllProjectCategoryAction } from '../../../redux/actions/CyberBugs/CyberbusAction';

function FormEditProjectCyberBugs(props) {

    
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange= (value, editor)=> {
        setFieldValue('description', value);
      }

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console(editorRef.current.getContent());
        }
    };

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit')
    // }
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllProjectCategoryAction())

        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFuncion: handleSubmit })
        return () => {

        }
    }, [])



    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>project ID</p>
                        <input value={values.id} disabled className='form-control' name='id'></input>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>projectName</p>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange}></input>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Category</p>
                        <select className='form-control' onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index} >{item.projectCategoryName}</option>
                            })}
                        </select>
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
                            initialValue={values.description}
                            onEditorChange={handleEditorChange}
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

const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.projectEdit?.id,
            projectName: props.projectEdit.projectName,
            description: props.projectEdit.description,
            categoryId: props.projectEdit.categoryId
        }
    },

    validationSchema: Yup.object({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('values', values)
    },

    displayName: 'Edit Project',
})(FormEditProjectCyberBugs);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}

export default connect(mapStateToProps)(editProjectForm);
