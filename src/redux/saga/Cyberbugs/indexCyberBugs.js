import React, {useEffect} from 'react'
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../../components/CyberBugs/Main/InfoMain'
import ContentMain from '../../../components/CyberBugs/Main/ContentMain'
import {useSelector, useDispatch} from 'react-redux'

export default function IndexCyberBugs(props) {
  const {projectDetail} = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch()
  console.log('projectDetail', projectDetail)
  useEffect(() => {
    const {projectId} = props.match.params;
    dispatch({
      type: 'GET_PROJECT_DETAIL_SAGA',
      projectId
    })
  
    return () => {
    
    }
  }, [])
  

  return (
    <div className='main'>
      <HeaderMain projectDetail= {projectDetail}/>
      <h3>{projectDetail.projectName}</h3>
      <InfoMain projectDetail= {projectDetail}/>
      <ContentMain projectDetail= {projectDetail}/>
    </div>
  )
}
