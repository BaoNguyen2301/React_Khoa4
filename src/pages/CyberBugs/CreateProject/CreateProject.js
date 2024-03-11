import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProjectCategoryAction } from '../../../redux/actions/CyberBugs/CyberbusAction';

function CreateProject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectCategoryAction())
    return () => {

    }
  }, [])

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;

  const handleEditorChange = (value, editor) => {
    setFieldValue('description', value);
  }
  return (
    <div className='container mt-5'>
      <h3>Create Project</h3>
      <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name='projectName' />
        </div>
        <div className='form-group'>
          <p>Description</p>
          <Editor
            apiKey='sjskzwmsvvf48f63km1l2k34tvyvyj5i317qpwj5k53o0uip'
            initialValue="<p>This is the initial content of the editor</p>"
            name='description'
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className='form-group'>
          <select className='form-control' onChange={handleChange}>
            {arrProjectCategory.map((item, index) => {
              return <option value={item.id} key={index} >{item.projectCategoryName}</option>
            })}
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit'>Create Project</button>
      </form>
    </div>
  )
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id
    }
  },

  validationSchema: Yup.object({

  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: 'CREATE_PROJECT_SAGA',
      newProject: values
    })
  },

  displayName: 'Create Project',
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  }
}

export default connect(mapStateToProps)(createProjectForm);
