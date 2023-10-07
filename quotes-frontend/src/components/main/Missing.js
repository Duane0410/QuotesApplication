import React from 'react'

const Missing = () => {
  return (
    <a href='/' className='text-danger text-decoration-none' style={{padding: '100%'}}>
        <h1 className='display-1 text-center'>404!</h1>
        <h1 style={{position: 'absolute', top: '42%', left: '30%'}}>
            ERROR! Page Doesnot Exist!!!
        </h1>
    </a>
  )
}

export default Missing