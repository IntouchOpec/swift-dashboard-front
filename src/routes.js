import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'
import {AuthContext} from './providers'
import { Spinner } from 'reactstrap'
import Layout from 'components/layouts'
import Page404 from 'pages/Page404'
import SignIn from 'pages/SignIn'
import OverviewPage from 'pages/Overview'

const Routes = props => {
    // useState(true)
    return (
        <Router>
            <AuthContext.Consumer>{context => {
                if (context.auth.loading) {
                    return <Spinner color="primary" />

                } 
                if (context.auth.auth) {
                    return <Layout>
                        <Switch>
                            <Route component={OverviewPage}/>
                            <Route component={Page404}/>
                        </Switch>
                    </Layout>
                } 
                return (<SignIn dispatch={context.dispatch}/>
                )
            }}</AuthContext.Consumer>
        </Router>
    )
}
// superadmin@swiftdynamics.co.th
export default Routes
