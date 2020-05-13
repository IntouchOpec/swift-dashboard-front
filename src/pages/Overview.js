import React, { useState, useEffect } from 'react'
import { Progress, Card } from 'reactstrap'
import GoogleMapReact from 'google-map-react'
import moment from 'moment'
import { weathersURL, settingURL } from 'utils/endpoint'
import client from 'utils/client'
import { getWeatherIcon } from 'utils/formats' 

const sumMock = [
    {name: 'license & Permit', planValue: 100, actValue: 40},
    {name: 'Engineering', planValue: 90, actValue: 40},
    {name: 'Procuement', planValue: 56, actValue: 40}, 
    {name: 'Delivery', planValue: 100, actValue: 40}, 
    {name: 'Civil Work', planValue: 98, actValue: 40}
]

const OverviewPage = props => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        client.get(weathersURL).then(res => {
            setWeather(res.data)
        }).catch(err => {  

        })

        client.get(settingURL).then(res => {
            // setWeather(res.data)
        }).catch(err => {  

        })

    }, [])

    return (
        <>
            <div className='row'>
                <div className='col-6'>
                    <WeatherCard {...weather}/>
                </div>
                <div className='col-6'>
                    <GoogleMapCard {...{lat: 13.8119942,lng: 100.5626938,}}/>
                </div>
            </div>
            <Card className='p-3 mt-3'>
                <div className='row'>
                    {sumMock.map(value => <SumProgress key={value.name} {...value} />)}
                </div>
            </Card>
        </>
    )
}

const SumProgress = props => (
    <div className='col-12 mt-2'>
        <div className='d-flex justify-content-between'>
            <div className="">{props.name}</div>
            <div className="">{props.planValue}%</div>
        </div>
        <Progress animated color='danger' value={props.planValue} >{props.planValue}%</Progress>
        <Progress className='mt-1' value={props.actValue}>{props.actValue}%</Progress>
    </div>
)

const formatDay = date => moment(date).format('DD/MM/YYYY')
const formatTime = date => moment(date).format('hh:mm')

const WeatherCard = props => {
    let weatherItems = []
    if (props.source) {
        let arr = JSON.parse(props.source).data
        for (let index = 0; index < 6; index++) {
            weatherItems.push(arr[index])
        }
    }
    return (
        <Card className='p-3'>
            <h3>Date : {formatDay(props.created_at)}</h3>
            <h3>Time : {formatTime(props.created_at)}</h3>
            <div className='row my-3'>
                {weatherItems.map(item => {
                    return (
                        <WeatherItem key={JSON.stringify(item)} {...item} />
                    )
                }
                )}
            </div>
        </Card>)
}


const WeatherItem = props => (
    <div className='col-2'>
        <span>{moment(props.datetime).format('ddd')}</span>
        {getWeatherIcon(props.weather.code, 'w-100', props.weather.description)}
        <span className='weather-font'>{props.low_temp} - {props.max_temp} C</span>
    </div>
)

const mapOptions = maps => {
    return {
        mapTypeControl: true,
        streetViewControl: true,
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_TOP,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_CENTER
        }
    }
}


const GoogleMapCard = props => {
    return (
        <Card style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.google_map_key }}
                center={{ lat: props.lat, lng: props.lng }}
                defaultZoom={props.zoom}
                defaultSize={props.size}
                options={mapOptions}
                zoom={13}
                onClick={(e) => handleClick(e)}
                yesIWantToUseGoogleMapApiInternals={true} 
            >
                <Marker
                    lat={props.lat}
                    lng={props.lng}
                    name=''
                    color='blue'
                />
            </GoogleMapReact>
        </Card>
    )
}


const Marker = (props) => {
    const { color, name, id } = props
    return (
      <div className='marker'
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    )
}

export default OverviewPage