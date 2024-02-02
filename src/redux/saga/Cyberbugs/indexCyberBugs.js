import React from 'react'
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../../components/CyberBugs/Main/InfoMain'
import ContentMain from '../../../components/CyberBugs/Main/ContentMain'

export default function indexCyberBugs() {
  return (
    <div className='main'>
      <HeaderMain />
      <h3>Cyber Board</h3>
      <InfoMain />
      <ContentMain />
    </div>
  )
}
