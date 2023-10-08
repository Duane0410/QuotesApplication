import React from 'react'
import { Outlet } from 'react-router-dom'
import SoftwareQuotes from './SoftwareQuotes'
import '../static/layout.css'

const Layout = () => {
  return (
    <main>
        <div className='nav-header'>
            <SoftwareQuotes />
        </div>
        <div className='app-body'>
            <Outlet />
        </div>
    </main>
  )
}

export default Layout