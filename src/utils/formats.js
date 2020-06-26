import React, {useState} from 'react'
import ThunderstormWithLightRainIcon from'../../public/assets/images/5896934 - cloud moon rain sun weather.png'
import DrizzleIcon from'../../public/assets/images/5896966 - cloud moon rain sun weather.png'
import LightRainIcon from'../../public/assets/images/5896965 - cloud moon rain sun weather.png'
import HeavyRainIcon from '../../public/assets/images/5896932 - cloud moon rain sun weather.png'
import LightSnowIcon from'../../public/assets/images/5896947 - cloud moon rain sun weather.png'
import SnowIcon from'../../public/assets/images/5896946 - cloud moon rain sun weather.png'
import FlurriesIcon from'../../public/assets/images/5896948 - cloud moon rain sun weather.png'
import SleetIcon from'../../public/assets/images/5896970 - cloud moon rain sun weather.png'
import MistIcon from'../../public/assets/images/5896943 - cloud moon rain sun weather.png'
import FreezingFogIcon from'../../public/assets/images/5896968 - cloud moon rain sun weather.png'
import ClearSkyIcon from'../../public/assets/images/5896969 - cloud moon rain sun weather.png'
import FewCloudsIcon from'../../public/assets/images/5896929 - cloud moon rain sun weather.png'
import OvercastCloudsIcon from '../../public/assets/images/5896931 - cloud moon rain sun weather.png' 
import DefualtIcon from '../../public/assets/images/5896975 - cloud moon rain sun weather.png'
import moment from 'moment'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

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

const PopoverDetail = ({description, datetime}) =>{
    const [popoverOpen, setPopoverOpen] = useState(false);
    console.log(datetime)
    const toggle = () => setPopoverOpen(!popoverOpen);
    return (
        <Popover placement='img' isOpen={popoverOpen} target={`img-${datetime}`} toggle={toggle}>
        <PopoverHeader>{description}</PopoverHeader>
        {/* <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody> */}
      </Popover>
    )
}

export const getWeatherIcon = (code, className, description, datetime) => {
    if (showerRain == code || thunderstormWithLightRain== code || thunderstormWithRain== code || thunderstormWithHeavyRain== code || thunderstormWithLightDrizzle== code || thunderstormWithDrizzle== code || thunderstormWithHeavyDrizzle== code || thunderstormWithHail === code) {
        return <> <img id={`img-${datetime}`} src={ThunderstormWithLightRainIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (lightDrizzle== code || drizzle== code || heavyDrizzle === code) {
        return <> <img id={`img-${datetime}`} src={DrizzleIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (lightRain== code || moderateRain== code || freezingRain== code || lightShowerRain== code || heavyShowerRain === code) {
        return <> <img id={`img-${datetime}`} src={LightRainIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (heavyRain== code || unknownPrecipitation === code) {
        return <> <img id={`img-${datetime}`} src={HeavyRainIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (lightSnow== code || mixSnowRain === code) {
        return <> <img id={`img-${datetime}`} src={LightSnowIcon} className={className}/> </>
    } else if (snow === code) {
        return <> <img id={`img-${datetime}`} src={SnowIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (heavySnow== code || heavySnowShower== code || flurries === code) {
        return <> <img id={`img-${datetime}`} src={FlurriesIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (sleet== code || heavySleet== code || snowShower === code) {
        return <> <img id={`img-${datetime}`} src={SleetIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (mist== code || smoke== code || haze== code || fog== code || sandDust === code) {
        return <> <img id={`img-${datetime}`} src={MistIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (freezingFog === code) {
        return <> <img id={`img-${datetime}`} src={FreezingFogIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (clearSky === code) {
        return <> <img id={`img-${datetime}`} src={ClearSkyIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (fewClouds== code || scatteredClouds== code || brokenClouds === code) {
        return <> <img id={`img-${datetime}`} src={FewCloudsIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else if (overcastClouds === code) {
        return <> <img id={`img-${datetime}`} src={OvercastCloudsIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    } else {
        return <> <img id={`img-${datetime}`} src={DefualtIcon} className={className} alt={description} /> <PopoverDetail description={description} datetime={datetime} /> </>
    }
}

const REPORT_TYPE_S_CURVE = 0 
const REPORT_TYPE_MANPOWERPLAN = 1

export const charts = {
    [REPORT_TYPE_S_CURVE]: 'S-Curve',
    [REPORT_TYPE_MANPOWERPLAN]: 'Manpower Plan'
}

export const getChartName = code => {
    return charts[code]
}


export const dateFormat = date => {
    return <p>{moment(date).format('MMM-DD-YYYY')}</p>
}