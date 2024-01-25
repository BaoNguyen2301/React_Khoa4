import React from 'react'

export default function Detail(props) {
  return (
    <div>
        Detail: {props.match.params.id}<br/>
        path name hien tai: {props.match.path}
        </div>
  )
}
