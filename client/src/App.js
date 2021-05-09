import React , {Fragment,useEffect} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import  Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/alert'
import CreateProfile   from './components/profile-form/CreateProfile'
import Dashboard from './components/dashboard/Dashboard'
import EditProfile   from './components/profile-form/EditProfile'
import Experience   from './components/profile-form/Experinece'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

import Education   from './components/profile-form/Education'
import PrivateRoute from './components/routing/PrivateRoute'
import {setAuthToken} from './utiliz/setAuthToken'
import {Provider} from 'react-redux'
import store from './store'
import './App.css';
import {LoadUSer} from './actions/auth'
if(localStorage.token1){
  setAuthToken(localStorage.token1)
}




 const App = () => {
  useEffect(() =>{
    store.dispatch(LoadUSer())

  },[])
   return <Provider  store = {store}>
   <Fragment>
   <BrowserRouter>
   <Navbar/>
   <Route exact path='/'component={Landing}/>
   <section className='container'>
     <Alert/>
  <Switch>
   <Route exact path='/register' component={Register}/>
   <Route exact path='/profiles' component={Profiles}/>
   <Route exact path='/profile/:id' component={Profile}/>
   <Route exact path='/Login' component={Login}/>
   <PrivateRoute exact path='/dashboard' component={Dashboard}/>
   <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
   <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
   <PrivateRoute exact path='/add-experience' component={Experience}/>
   <PrivateRoute exact path='/add-education' component={Education}/>

   </Switch>




   </section>
  </BrowserRouter>
  
   </Fragment>
   </Provider>
 }



export default App;
