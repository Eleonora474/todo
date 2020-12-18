import React from 'react'

export default function Loader() {
  return (
    <div stule={{ display: 'flex', justifyContent: 'center', margin: '5rem' }}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
