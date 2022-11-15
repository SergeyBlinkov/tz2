import React, {useState} from 'react';
import calendar from '../assets/calendar 1.svg'
import '../App.css';
import calendarBlack from '../assets/calendar 2.svg'
import {useAppDispatch} from "../Redux/ReduxStore";
import {pushData} from "../Redux/DataStore";
import {FindButton, InputStyle} from "./styledComponent";
import { useNavigate } from "react-router-dom";

type SubmitEvent  = React.SyntheticEvent<HTMLFormElement>
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type Init = {
    from:string,
    where:string,
    toDate:string,
    backDate:string
}
const init:Init  = {
    from:'',
    where:'',
    toDate:'',
    backDate:''
}
const Avia = () => {
    const [storage,setStorage] = useState(init)
    const [err,setErr] = useState('')
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const inputClick = (id:string) => {
        const target: HTMLElement | null = document.getElementById(id)
        return (target as HTMLInputElement)?.showPicker()
    }
    const handleChange = (e:InputEvent) => {
            const {name,value} = e.target
        return setStorage(prev => ({
            ...prev,
            [name]:value
        }))
    }
    const fillContentChecker = () => storage.from.length > 0 && storage.where.length > 0 && storage.toDate.length > 0
    const checker = fillContentChecker()
    const onSubmit = (e:SubmitEvent) => {

        e.preventDefault()
        if(!checker) return setErr('Введите поля выше')
          else {
              setErr('')
            dispatch(pushData(storage))
            return history('/avia/info')
        }


    }
    return (
        <form onSubmit={onSubmit} className={'mx-auto sm:container h-52 grid-rows-2 relative rounded-2xl drop-shadow-xl mt-24'} style={{background:"rgba(92, 135, 219, 1)",width:962}}>
            <div className={'flex flex-row justify-between pt-3 w-full h-3/6 px-7'}>
                <section>
                    <label className={'text-xs text-white'}>Откуда</label>
                    <InputStyle placeholder={'Город вылета'} className={'flex w-52'} name={'from'} required onChange={handleChange}/>
                </section>
                <section>
                    <label className={'text-xs text-white'}>Куда</label>
                    <InputStyle placeholder={'Город прилёта'} className={'flex w-52'} name={'where'} required onChange={handleChange}/>
                </section>
                <section>
                    <label className={'text-xs text-white'}>Туда</label>
                    <div className={'bg-white rounded-xl h-10 w-52 relative flex items-center'}>
                        <img src={calendar} alt={'calendarFill'} className={'absolute top-3 left-2'} onClick={()=>inputClick('toId')}/>
                        <input className={'flex w-auto ml-8 input-date'} required type={'date'} id={'toId'} name={'toDate'} onChange={handleChange}/>
                    </div>

                </section>
                <section>
                    <label className={'text-xs text-white'}>Обратно</label>
                    <div className={'bg-white rounded-xl h-10 w-52 relative flex items-center'}>
                        <img src={calendarBlack} alt={'calendarEmpty'} className={'absolute top-3 left-2'} onClick={()=>inputClick('backId')}/>
                        <input className={'flex w-auto ml-8 input-date'}  id={'backId'} type={'date'} name={'backDate'} onChange={handleChange}/>
                    </div>
                </section>
            </div>
            <div className={'w-full bg-white rounded-b-xl h-3/6 relative'}>
                {err.length > 0 && <span className={'absolute left-6 bottom-2 text-red-500'}>{err}</span>}
                <FindButton type={'submit'} darkGray={checker} disabled={!checker} className={'flex absolute right-7 bottom-7'} >Найти билеты</FindButton>
            </div>

        </form>
    );
};

export default Avia;