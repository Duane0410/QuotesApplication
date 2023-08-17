import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/App.css';
import SoftwareQuotes from './components/main/SoftwareQuotes';
import Authors from './components/main/Authors';
import Quotes from './components/main/Quotes';
import AddQuotes from './components/AddQuotes';
// import SignUp from './components/SignUp';
import LogIn from './components/authentication/LogIn';
import Register from './components/authentication/Register';
import Layout from './components/Layout';
import Missing from './components/main/Missing';
import GooglePlacesExample from './trials/GooglePlacesExample';
// import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<SoftwareQuotes />} />
                <Route path='authors' element={<Authors />} />
                <Route path='quotes' element={<Quotes />} />
                <Route path='*' element={<Missing />} />
                <Route path='/trialOne' element={<GooglePlacesExample />} />

                {/* <Route element={<RequireAuth />}> */}
                  <Route path='add-quotes' element={<AddQuotes />} />
                {/* </Route> */}
                
                {/* <Route path='/sign-up' element={<SignUp />} /> */}
                <Route path='register' element={<Register />} />
                <Route path='log-in' element={<LogIn />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
