import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import EditForm from './Components/Form/EditForm'
import Login from './Components/Login'
import PrivateRoute from './Components/util/PrivateRoute'
import UserView from './Components/Responding/UserView'
import RadioCheck from './Components/Responding/RadioCheck'

function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />

          <PrivateRoute path="/form/:formId" component={EditForm} />
          <Route exact path="/s/:formId" component={UserView} />
          <Route exact path="/fuck" component={RadioCheck} />
        </Switch>
      </Router>
    </div>
  )
}
export default Main
