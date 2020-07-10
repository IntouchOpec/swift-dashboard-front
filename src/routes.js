import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContext } from './providers'
import { Spinner } from 'reactstrap'
import Layout from 'components/layouts'
import Page404 from 'pages/Page404'
import SignIn from 'pages/SignIn'
import ResetPass from 'pages/ResetPass'
import ForgotPass from 'pages/ForgotPass'
import OverviewPage from 'pages/Overview'
import ManageChartPage from 'pages/ManageChart'
import CreateChartPage from 'pages/ManageChart/Create'
import ChartDetailPage from 'pages/ManageChart/Detail'
import TimeSheetPage from 'pages/Timesheet'
import CreateTimeSheetPage from 'pages/Timesheet/Create'
import TimeSheetDetailPage from 'pages/Timesheet/Detail'
import EditTimeSheetPage from 'pages/Timesheet/Edit'
import JobPage from 'pages/Job'
import CreateJobPage from 'pages/Job/Create'
import ManageUserPage from 'pages/User'
import CreateUserPage from 'pages/User/Create'
import EditUserPage from 'pages/User/Edit'
import UserDetailPage from 'pages/User/Detail'
import UserExportPage from 'pages/User/Export'
import SettingPage from 'pages/Setting'
import SCurvePage from 'pages/SCurve'
import ManpowerPlanPage from 'pages/ManpowerPlan'
import CreateCompanyPage from 'pages/Company/Create'
import CompanyPage from 'pages/Company'
import EditCompanyPage from 'pages/Company/Edit'
import CreateJobTypePage from 'pages/JobType/Create'
import JobTypePage from 'pages/JobType'
import EditJobTypePage from 'pages/JobType/Edit'
import CameraPage from 'pages/Cameras'
import PermissionPage from 'pages/Permissions'
import CreatePermissionPage from 'pages/Permissions/Create'

const routes = [
    { path: '/chart/:id', component: ChartDetailPage },
    { path: '/charts/create', component: CreateChartPage },
    { path: '/charts', component: ManageChartPage },
    { path: '/user/:id', component: UserDetailPage },
    { path: '/users/create', component: CreateUserPage },
    { path: '/users/', component: ManageUserPage },
    { path: '/manpower_plan/', component: ManpowerPlanPage },
    { path: '/', component: OverviewPage },
    { path: '/company/create', component: CreateCompanyPage },
    { path: '/company/edit/:id', component: EditCompanyPage },
    { path: '/company/', component: CompanyPage },
    { path: '/job_type/create', component: CreateCompanyPage },
    { path: '/job_type/edit/:id', component: EditCompanyPage },
    { path: '/job_type/', component: CompanyPage },
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
                    return <div className='container d-flex h-100'>
                        <div className='row align-self-center w-100'>
                            <div className='col-3 mx-auto text-center'>
                                <Spinner color='primary' />
                                <p>กรุณารอสักครู่.....</p>
                            </div>
                        </div>
                    </div>
                }
                if (context.auth.auth) {
                    return <Layout user={context.auth}>
                        <Switch>
                            <Route path='/timesheet/edit/:id' component={EditTimeSheetPage} />
                            <Route path='/timesheet/create' component={CreateTimeSheetPage} />
                            <Route path='/timesheet/:id' component={TimeSheetDetailPage} />
                            <Route path='/timesheet' component={TimeSheetPage} />
                            <Route path='/chart/:id' component={ChartDetailPage} />
                            <Route path='/charts/create' component={CreateChartPage} />
                            <Route path='/charts' component={ManageChartPage} />
                            <Route path='/jobs/create' component={CreateJobPage} />
                            <Route path='/jobs' component={JobPage} />
                            <Route path='/user/:id/edit' component={EditUserPage} />
                            <Route path='/user/:id' component={UserDetailPage} />
                            <Route path='/users/export/:id' component={UserExportPage} />
                            <Route path='/users/create' component={CreateUserPage} />
                            <Route path='/users' component={ManageUserPage} />
                            <Route path='/reset' component={ResetPass} />
                            <Route path='/forgotpassword' component={ForgotPass} />
                            <Route path='/setting' component={SettingPage} />
                            <Route path='/setting' component={SettingPage} />
                            <Route path='/s_curve' component={SCurvePage} />
                            <Route path='/manpower_plan' component={ManpowerPlanPage} />
                            <Route path='/company/create' component={CreateCompanyPage} />
                            <Route path='/company/edit/:id' component={EditCompanyPage} />
                            <Route path='/company' component={CompanyPage} />
                            <Route path='/cameras' component={CameraPage} />
                            <Route path='/permissions/create' component={CreatePermissionPage} />
                            <Route path='/permissions' component={PermissionPage} />
                            
                            <Route path='/job_type/create' component={CreateJobTypePage} />
                            <Route path='/job_type/edit/:id' component={EditJobTypePage} />
                            <Route path='/job_type' component={JobTypePage} />
                            <Route path='/' component={OverviewPage} />
                            <Route component={Page404} />
                        </Switch>
                    </Layout>
                }
                return (
                    <Switch>
                        <Route path='/reset/:token' component={ResetPass} />
                        <Route path='/forgotpassword' component={ForgotPass} />
                        <Route path='/' render={() => <SignIn dispatch={context.dispatch} />} />

                    </Switch>
                )
            }}</AuthContext.Consumer>
        </Router>
    )
}
// superadmin@swiftdynamics.co.th
export default Routes
