import React, { lazy, Suspense, useMemo, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Auth = lazy(() => import('../views/Auth'))
const Lists = lazy(() => import('../views/Lists'))
const Todos = lazy(() => import('../views/Todos'))

const PublicRoutes = () => (
  <>
    <Switch>
      <Route exact path='/'>
        <Suspense fallback={<div />}>
          <Auth />
        </Suspense>
      </Route>
      <Redirect to='/' />
    </Switch>
  </>
)

const PrivateRoutes = () => (
  <>
    <Switch>
      <Route exact path='/'>
        <Suspense fallback={<div />}>
          <Lists />
        </Suspense>
      </Route>
      <Route exact path='/:listId'>
        <Suspense fallback={<div />}>
          <Todos />
        </Suspense>
      </Route>
      <Redirect to='/' />
    </Switch>
  </>
)

export const Navigation = () => {
  const { logged } = useContext(AuthContext)
  const DefinitiveRoutes = useMemo(
    () => (logged ? PrivateRoutes : PublicRoutes),
    [logged]
  )
  return (
    <Router>
      <DefinitiveRoutes />
    </Router>
  )
}
