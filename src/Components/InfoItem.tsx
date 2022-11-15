import React, {Dispatch, SetStateAction, useState} from 'react';
import Logo from "../assets/logo.svg";
import baggage from '../assets/baggage.svg'
import bag from '../assets/bag.svg'
import {Button,LogoComponent} from "./styledComponent";
import {tempResultType} from "./Info";
import {addTimes} from "./helperComponents";


type buttonsType = {
    buttons: Array<{time:string}>,
    currentTime: string,
    setCurrentTime: Dispatch<SetStateAction<string>>
    duration:string
}
const buttons = [{time:'09:20 - 11:05'},{time:'10:20 - 12:05'},{time:'11:20 - 13:05'}]

const TwoPicture = () => {
    return (
        <div className={'flex flex-row gap-2 mt-2 px-2 w-24 h-12'}>
            <img src={bag} alt={'bag'} width={20} height={20}/>
            <img src={baggage} alt={'baggage'} width={20} height={37}/>
        </div>
    )
}
type DestinationComponentType = {
    time: string,
    city: string,
    date: string
}

const DestinationComponent = ({time, city, date}: DestinationComponentType) => {
    return (
        <section className={'flex flex-col w-24'}>
            <h3 className={'text-2xl pb-2 font-bold '}>{time}</h3>
            <span className={'text-xs font-medium'}>{city}</span>
            <p className={'text-xs'}>{date}</p>
        </section>
    )
}

const DestinationItem = () => {
    return (
        <div className={'flex flex-col items-center justify-center w-7 relative h-10'}>
            <h4 className={'text-sm uppercase font-normal text-black/50'}>ROV</h4>
            <span className={'absolute bottom-0 left-3 bg-black/50 w-2 h-2 block rounded-full'}></span>
        </div>
    )
}

const ButtonBlock = ({buttons,currentTime,setCurrentTime,duration}:buttonsType) => {
    let currentSplitter = currentTime.split(":")
    return (
        <div className={'flex flex-row gap-4 pt-7'}>
            {buttons?.map(({time}) => {
                const onClickHandler = (time:string) => setCurrentTime(time)
                let minusSplitter = time.split("-")
                let timeSplitter = minusSplitter[0].split(":")
                let isDisabled = (+currentSplitter[0] + +currentSplitter[1]) === (+timeSplitter[0] + +timeSplitter[1])
                let endTime = addTimes(minusSplitter[0],duration)



                return (
                    <Button key={time} onClick={()=>onClickHandler(minusSplitter[0])} disabled={isDisabled} darkGray={isDisabled} className={'text-base'}>
                        <span className={'text-lg font-bold'}>{minusSplitter[0]}</span> - {endTime}
                    </Button>
                )
            })}
        </div>
    )
}

const Item = ({result}: {result:tempResultType}) => {
    const {oneWay} = result
    const [chooseTime,setChooseTime] = useState(oneWay.timeFrom[0])
    let oneWayTime = addTimes(chooseTime as string,oneWay.duration)
    return (
        <div className={'flex mt-8 rounded-xl border drop-shadow mx-auto'} style={{width: 980}}>
                <div className={'flex flex-row relative pb-6 pt-10'}>
                    <div className={'flex flex-col gap-6 items-center justify-center'}>
                        <span
                            className={'w-32 absolute left-0 top-0 flex h-6 justify-center items-center font-bold text-white rounded-tl-xl rounded-br-xl text-xs'}
                            style={{background: "#8BA5D8"}}>Невозвратный</span>
                        <LogoComponent>
                            <img src={Logo} alt={'Logo'}/>
                            <span>S7 Airlines</span>
                        </LogoComponent>
                    </div>
                    <div className={'grid justify-center items-center gap-6'}>
                        <div className={'flex flex-row gap-4 px-4 items-center justify-center'}>
                            <DestinationComponent time={chooseTime as string} city={oneWay.cityFrom} date={oneWay.dateFrom}/>
                            <div className={'destinationItem flex flex-row relative justify-between self-start'}
                                 style={{width: 300}}>
                                <DestinationItem/>
                                <span className={'spaceLine absolute bg-black/50'}></span>
                                <span className={'text-sm font-light absolute left-24'} style={{bottom: -14}}>В пути 1 ч 55 мин</span>
                                <DestinationItem/>
                            </div>
                            <DestinationComponent time={oneWayTime} city={oneWay.cityTo} date={oneWay.dateTo}/>

                        </div>
                        <ButtonBlock buttons={buttons} setCurrentTime={setChooseTime} currentTime={chooseTime} duration={oneWay.duration}/>
                    </div>
                    <TwoPicture/>
                </div>
            <span className={'text-3xl font-bold border-l flex self-stretch justify-center items-center'}
                        style={{width: 190}}>4 150 ₽</span>
        </div>

    )
}
const DoubleItem = ({result}: {result:tempResultType}) => {
    const {twoWay} = result
    const durationToText = (time:string) => {
        let splitter = time.split(":")
        return 'В пути ' + splitter[0] + ' ч ' + splitter[1] + ' мин'
    }
    let oneWayTime = ''
    let backWayTime = ''
    if(typeof twoWay.oneWay.timeFrom === 'string' && typeof twoWay.backWay.timeFrom === 'string'){
        oneWayTime = addTimes(twoWay.oneWay.timeFrom,twoWay.oneWay.duration)
        backWayTime = addTimes(twoWay.backWay.timeFrom,twoWay.backWay.duration)
    }
    return (
        <div className={'doubleItem mt-8 mx-auto rounded-xl border drop-shadow'}>
            <div className={'flex flex-row relative pt-10 pb-7'} >
                <div className={'flex flex-col items-center justify-center'}>
                    <span
                        className={'w-32 absolute left-0 top-0 flex h-6 justify-center items-center font-bold text-white rounded-tl-xl rounded-br-xl text-xs'}
                        style={{background: "#8BA5D8"}}>Невозвратный</span>
                    <LogoComponent>
                        <img src={Logo} alt={'Logo'}/>
                        <span>S7 Airlines</span>
                    </LogoComponent>
                </div>
                <div className={'flex justify-center items-center'}>
                    <div className={'flex flex-row gap-4 px-4 items-center justify-center'}>
                        <DestinationComponent time={twoWay.oneWay.timeFrom as string} city={twoWay.oneWay.cityFrom} date={twoWay.oneWay.dateFrom}/>
                        <div className={'destinationItem flex flex-row relative justify-between self-start'}
                             style={{width: 300}}>
                            <DestinationItem/>
                            <span className={'spaceLine absolute bg-black/50'}></span>
                            <span className={'text-sm font-light absolute left-24'} style={{bottom: -14}}>{durationToText(twoWay.oneWay.duration)}</span>
                            <DestinationItem/>
                        </div>
                        <DestinationComponent time={oneWayTime} city={twoWay.oneWay.cityTo} date={twoWay.oneWay.dateTo}/>
                    </div>
                </div>
                <TwoPicture/>
            </div>
            <div className={'flex flex-row relative row-start-2 pt-10 pb-7'}>
                <div className={'flex flex-col gap-6 items-center justify-center'}>
                    <span
                        className={'w-32 absolute left-0 top-0 flex h-6 justify-center items-center font-bold text-white rounded-tl-xl rounded-br-xl text-xs'}
                        style={{background: "#8BA5D8"}}>Невозвратный</span>
                    <LogoComponent>
                        <img src={Logo} alt={'Logo'}/>
                        <span>S7 Airlines</span>
                    </LogoComponent>
                </div>
                <div className={'flex justify-center items-center'}>
                    <div className={'flex flex-row gap-4 px-4 items-center justify-center'}>
                        <DestinationComponent time={twoWay.backWay.timeFrom as string} city={twoWay.backWay.cityFrom} date={twoWay.backWay.dateTo}/>
                        <div className={'destinationItem flex flex-row relative justify-between self-start'}
                             style={{width: 300}}>
                            <DestinationItem/>
                            <span className={'spaceLine absolute bg-black/50'}></span>
                            <span className={'text-sm font-light absolute left-24'} style={{bottom: -14}}>{durationToText(twoWay.oneWay.duration)}</span>
                            <DestinationItem/>
                        </div>
                        <DestinationComponent time={backWayTime} city={twoWay.backWay.cityTo} date={twoWay.backWay.dateFrom}/>
                    </div>
                </div>
                <TwoPicture/>
            </div>
            <span className={'text-3xl row-span-2 flex font-bold border-l self-stretch justify-center items-center'}
                  style={{width: 190}}>8 300 ₽</span>
        </div>

    )
}

const InfoItem = ({result,direction}:{result:tempResultType,direction:string}) => {
    return  direction === 'twoWay' ? <DoubleItem result={result}/> : <Item result={result}/>

};

export default InfoItem;