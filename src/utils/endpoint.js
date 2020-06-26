export const host = process.env.HOST
export const endpoint = `${host}/api/v1/`
export const apiURL = endpoint
export const authorizeURL = `${endpoint}authorize`
export const tokenURL = `${endpoint}token`
export const refeshTokenURL = `${host}/api/o/token/`

export const weatherURL = 'http://api.weatherapi.com/v1/forecast.json'

export const usersURL = `${endpoint}users/`
export const usersDetailURL = `${endpoint}users/:id/`

export const reportsURL = `${endpoint}reports/`
export const reportsDetailURL = `${endpoint}reports/:id/`
export const reportsSearchDetailURL = `${endpoint}reports-search/`

export const timesheetReportURL = `${endpoint}time_sheets/report/:id/`

export const weathersURL = `${endpoint}weathers/`

export const groupsURL = `${endpoint}groups/`

export const companyURL = `${endpoint}companies/`
export const companyDetailURL = `${endpoint}companies/:id/`

export const jobtypeURL = `${endpoint}job_types/`
export const jobtypeDetailURL = `${endpoint}job_types/:id/`

export const settingURL = `${endpoint}settings/`


export const getWeatherURL = (long, lang, days, qp) => {
    return `${weatherURL}?key=${process.env.weather_key}q=${long},${lang}&days=${days}`
}

export const timeSheetURL = `${endpoint}timesheet/`

export const jobsURL = `${endpoint}jobs/`
