import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'
import { AuthContext } from './providers'
import { Spinner } from 'reactstrap'
import Layout from 'components/layouts'
import Page404 from 'pages/Page404'
import SignIn from 'pages/SignIn'
import OverviewPage from 'pages/Overview'
import ManageChartPage from 'pages/ManageChart'
import CreateChartPage from 'pages/ManageChart/Create'
import ChartDetailPage from 'pages/ManageChart/Detail'
import TimeSheetPage from 'pages/Timesheet'
import CreateTimeSheetPage from 'pages/Timesheet/Create'
import TimeSheetDetailPage from 'pages/Timesheet/Detail'
import UserDetailPage from 'pages/User/Detail'
import ManageUserPage from 'pages/User'
import CreateUserPage from 'pages/User/Create'
import SettingPage from 'pages/Setting'
import SCurvePage from 'pages/SCurve'
import ManpowerPlanPage from 'pages/ManpowerPlan'

const routes = [
    { path: '/chart/:id', component: ChartDetailPage },
    { path: '/charts/create', component: CreateChartPage },
    { path: '/charts', component: ManageChartPage },
    { path: '/user/:id', component: UserDetailPage },
    { path: '/users/create', component: CreateUserPage },
    { path: '/users/', component: ManageUserPage },
    { path: '/manpower_plan/', component: ManpowerPlanPage },
    { path: '/', component: OverviewPage },
    // {path: '', component: Page404},
]

const loginRoutes = props => {
    return routes.map(route => <Route key={route.name} path={route.name} component={route.component} />)
}
const Routes = props => {
    // useState(true)
    return (
        <Router>
            <AuthContext.Consumer>{context => {
                if (context.auth.loading) {
                    return <Spinner color="primary" />
                }
                if (context.auth.auth) {
                    return <Layout user={context.auth}>
                        <Switch>
                            {/* {loginRoutes()} */}
                            <Route path='/timesheet/:id' component={TimeSheetDetailPage} />
                            <Route path='/timesheet/create' component={CreateTimeSheetPage} />
                            <Route path='/timesheet' component={TimeSheetPage} />
                            <Route path='/chart/:id' component={ChartDetailPage} />
                            <Route path='/charts/create' component={CreateChartPage} />
                            <Route path='/charts' component={ManageChartPage} />
                            <Route path='/user/:id' component={UserDetailPage} />
                            <Route path='/users/create' component={CreateUserPage} />
                            <Route path='/users' component={ManageUserPage} />
                            <Route path='/setting' component={SettingPage} />
                            <Route path='/setting' component={SettingPage} />
                            <Route path='/s_curve' component={SCurvePage} />
                            <Route path='/manpower_plan' component={ManpowerPlanPage} />
                            <Route path='/' component={OverviewPage} />
                            <Route component={Page404} />
                        </Switch>
                    </Layout>
                }
                return (<SignIn dispatch={context.dispatch} />
                )
            }}</AuthContext.Consumer>
        </Router>
    )
}
// superadmin@swiftdynamics.co.th
export default Routes
