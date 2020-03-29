import React, { useMemo, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Logo, Container } from '../components'
import { AuthContext } from '../contexts/AuthContext'

import { Todos, Lists, Auth, Profile } from '../views'

const PublicRoutes = () => (
  <Switch>
    <Route exact path='/'>
      <Auth />
    </Route>
    <Redirect to='/' />
  </Switch>
)

const PrivateRoutes = () => (
  <Switch>
    <Route exact path='/'>
      <Lists />
    </Route>
    <Route exact path='/profile'>
      <Profile />
    </Route>
    <Route exact path='/:listId'>
      <Todos />
    </Route>
    <Redirect to='/' />
  </Switch>
)

export const Navigation = () => {
  const { logged } = useContext(AuthContext)
  const DefinitiveRoutes = useMemo(
    () => (logged ? PrivateRoutes : PublicRoutes),
    [logged],
  )

  return (
    <Router>
      <Container center={!logged}>
        <Logo big={!logged} />
        <DefinitiveRoutes />
      </Container>
    </Router>
  )
}
