import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector } from 'react-redux';
import { UseSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/CyberbugContant';
import { getAllProjectCategoryAction } from '../../../redux/actions/CyberBugs/CyberbusAction';

function CreateProject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectCategoryAction())
    return () => {
      
    }
  }, [])
  

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
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
        <div className='form-group'>
          <select className='form-control' onChange={handleChange}>
            {arrProjectCategory.map((item, index)=>{
              return <option value={item.id} key={index} >{item.projectCategoryName}</option>
            })}
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit' onClick={log}>Create Project</button>
      </form>
    </div>
  )
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return{
    projectName: '',
    description: '',
    categoryId: props.arrProjectCategory[0]?.id
  }},

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
