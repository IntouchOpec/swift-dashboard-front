import React from 'react'
import ThunderstormWithLightRainIcon from'../../public/icons/weather/5896934 - cloud moon rain sun weather.png'
import DrizzleIcon from'../../public/icons/weather/5896966 - cloud moon rain sun weather.png'
import LightRainIcon from'../../public/icons/weather/5896965 - cloud moon rain sun weather.png'
import HeavyRainIcon from '../../public/icons/weather/5896932 - cloud moon rain sun weather.png'
import LightSnowIcon from'../../public/icons/weather/5896947 - cloud moon rain sun weather.png'
import SnowIcon from'../../public/icons/weather/5896946 - cloud moon rain sun weather.png'
import FlurriesIcon from'../../public/icons/weather/5896948 - cloud moon rain sun weather.png'
import SleetIcon from'../../public/icons/weather/5896970 - cloud moon rain sun weather.png'
import MistIcon from'../../public/icons/weather/5896943 - cloud moon rain sun weather.png'
import FreezingFogIcon from'../../public/icons/weather/5896968 - cloud moon rain sun weather.png'
import ClearSkyIcon from'../../public/icons/weather/5896969 - cloud moon rain sun weather.png'
import FewCloudsIcon from'../../public/icons/weather/5896929 - cloud moon rain sun weather.png'
import OvercastCloudsIcon from '../../public/icons/weather/5896931 - cloud moon rain sun weather.png' 
import DefualtIcon from '../../public/icons/weather/5896975 - cloud moon rain sun weather.png'
import moment from 'moment'

const thunderstormWithLightRain	= 200
const thunderstormWithRain = 201
const thunderstormWithHeavyRain = 202

const thunderstormWithLightDrizzle = 230
const thunderstormWithDrizzle = 231
const thunderstormWithHeavyDrizzle = 232
const thunderstormWithHail = 233

const lightDrizzle = 300
const drizzle = 301
const heavyDrizzle = 302

const lightRain = 500
const moderateRain = 501

const heavyRain = 502

const freezingRain = 511
const lightShowerRain = 520

const showerRain = 521

const heavyShowerRain = 522

const lightSnow = 600
const snow = 601
const heavySnow = 602

const mixSnowRain = 610

const sleet = 611
const heavySleet = 621

const snowShower = 622
const heavySnowShower = 623
const flurries = 623
const mist = 700
const smoke = 711
const haze = 721
const sandDust = 731
const fog = 741
const freezingFog = 751
const clearSky = 800
const fewClouds = 801
const scatteredClouds = 802
const brokenClouds = 803
const overcastClouds = 804
const unknownPrecipitation = 900

export const getWeatherIcon = (code, className, description) => {
    if (showerRain== code || thunderstormWithLightRain== code || thunderstormWithRain== code || thunderstormWithHeavyRain== code || thunderstormWithLightDrizzle== code || thunderstormWithDrizzle== code || thunderstormWithHeavyDrizzle== code || thunderstormWithHail === code) {
        return <img src={ThunderstormWithLightRainIcon} className={className} alt={description} />
    } else if (lightDrizzle== code || drizzle== code || heavyDrizzle === code) {
        return <image src={DrizzleIcon} className={className} alt={description} />
    } else if (lightRain== code || moderateRain== code || freezingRain== code || lightShowerRain== code || heavyShowerRain === code) {
        return <image src={LightRainIcon} className={className} alt={description} />
    } else if (heavyRain== code || unknownPrecipitation === code) {
        return <image src={HeavyRainIcon} className={className} alt={description} />
    } else if (lightSnow== code || mixSnowRain === code) {
        return <img src={LightSnowIcon} className={className}/>
    } else if (snow === code) {
        return <img src={SnowIcon} className={className} alt={description} />
    } else if (heavySnow== code || heavySnowShower== code || flurries === code) {
        return <img src={FlurriesIcon} className={className} alt={description} />
    } else if (sleet== code || heavySleet== code || snowShower === code) {
        return <img src={SleetIcon} className={className} alt={description} />
    } else if (mist== code || smoke== code || haze== code || fog== code || sandDust === code) {
        return <img src={MistIcon} className={className} alt={description} />
    } else if (freezingFog === code) {
        return <img src={FreezingFogIcon} className={className} alt={description} />
    } else if (clearSky === code) {
        return <img src={ClearSkyIcon} className={className} alt={description} />
    } else if (fewClouds== code || scatteredClouds== code || brokenClouds === code) {
        return <img src={FewCloudsIcon} className={className} alt={description} />
    } else if (overcastClouds === code) {
        return <img src={OvercastCloudsIcon} className={className} alt={description} />
    } else {
        return <img src={DefualtIcon} className={className} alt={description} />
    }
}

const REPORT_TYPE_S_CURVE = 0 
const REPORT_TYPE_MANPOWERPLAN = 1

const charts = {
    [REPORT_TYPE_S_CURVE]: 'S-Curve',
    [REPORT_TYPE_MANPOWERPLAN]: 'Manpower Plan'
}

export const getChartName = code => {
    return charts[code]
}


export const dateFormat = date => {
    return <p>{moment(date).format('DD/MM/YYYY')}</p>
}