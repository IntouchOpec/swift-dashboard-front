import React, { useState, useEffect } from 'react'
import { Progress, Card } from 'reactstrap'
import GoogleMapReact from 'google-map-react'
import moment from 'moment'
import { getWeatherURL } from 'utils/endpoint'
const data = {
    dete: Date.now(),
    weatherList: [

    ]
}

const OverviewPage = props => {
    return (
        <>
            <div className='row'>
                <div className='col-6'>
                    <WeatherCard />
                </div>
                <div className='col-6'>
                    {/* <GoogleMapCard {...{lat: 13.8119942,lng: 100.5626938,}}/> */}
                </div>
            </div>
            <div className='row'>
                {/* {.map(value => <SumProgress {...value} />)} */}
            </div>
        </>
    )
}

const SumProgress = props => (
    <>
        <div className='d-flex'>
            <div className="text-start">{props.name}</div>
            <div className="text-end">{props.planValue}</div>
        </div>
        <Progress animated color='danger' value={props.planValue} >{props.planValue}%</Progress>
        <Progress value={props.actValue}>{props.actValue}%</Progress>
    </>
)

const formatDay = date => moment(date).format('DD/MM/YYYY')
const formatTime = date => moment(date).format('hh:mm')

const WatherCard = props => (
    <Card>
        <h3>Date : {formatDay(props.date)}</h3>
        <h3>Time : {formatTime(props.date)}</h3>
        <div className='row'>
            {props.weatherList.map(item => (
                <WeatherItem key={JSON.stringify(item.date)} {...item} />
            ))}
        </div>
    </Card>
)

const WeatherItem = props => (
    <div className='col-2'>
        <span>{props.day}</span>
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
    const [position, setPosition] = useState({
        key: process.env.google_map_key
    })
    return (
        <Card>
            <GoogleMapReact
                bootstrapURLKeys={{ key: position.key }}
                center={{ lat: position.lat, lng: position.lng }}
                defaultZoom={props.zoom}
                defaultSize={props.size}
                options={mapOptions}
                zoom={13}
                onClick={(e) => handleClick(e)}
                yesIWantToUseGoogleMapApiInternals={true} >
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