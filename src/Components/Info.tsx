import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../Redux/ReduxStore";
import InfoItem from "./InfoItem";

type WaysType = {
    cityFrom:string,
    timeFrom:string | Array<string>,
    dateFrom:string,
    cityTo:string,
    dateTo:string,
    duration:string
}

export type tempResultType = {
    oneWay:WaysType,
    twoWay: {
        oneWay:WaysType,
        backWay:WaysType
    }
}

const temporaryResult:tempResultType = {
    oneWay: {
        cityFrom:'Москва',
        timeFrom:['09:20','10:20','11:20'],
        dateFrom:'19.05.2022',
        cityTo:'Ростов на Дону',
        dateTo:'19.05.2022',
        duration:'1:55'
    },
    twoWay: {
        oneWay:{
            cityFrom:'Москва',
            timeFrom:'09:20',
            dateFrom:'19.05.2022',
            cityTo:'Ростов на Дону',
            dateTo:'19.05.2022',
            duration:'1:55'
        },
        backWay: {
            cityFrom:'Ростов на Дону',
            timeFrom:'18:00',
            dateFrom:'21.05.2022',
            cityTo:'Москва',
            dateTo:'21.05.2022',
            duration:'1:55'
        }

    }
}


const Info = () => {
    const {storage} = useAppSelector(state => state.dataStore)
    const [state,setState] = useState(temporaryResult)
    useEffect(() => {
        setState(prev => ({
            ...prev,oneWay : {
                ...prev.oneWay,
                cityFrom:storage.from,
                cityTo:storage.where,
                dateFrom:storage.toDate,
                dateTo:storage.toDate
            },
            twoWay: {
                ...prev.twoWay,
                oneWay: {
                    ...prev.twoWay.oneWay,
                    cityFrom:storage.from,
                    cityTo:storage.where,
                    dateFrom:storage.toDate,
                    dateTo:storage.toDate,
                },
                backWay: {
                    ...prev.twoWay.backWay,
                    cityFrom:storage.where,
                    cityTo:storage.from,
                    dateFrom:storage.backDate,
                    dateTo:storage.backDate
                }
            }
        }))
    },[storage.backDate,storage.from,storage.toDate,storage.where])
    let direction = storage.backDate.length > 0 ? 'twoWay' : 'oneWay'
    return (
        <div className={'container mx-auto  h-auto'}>
            <InfoItem result={state} direction={direction}/>
        </div>
    );
};

export default Info;