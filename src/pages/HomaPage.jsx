import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setTrainerG}  from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'


const HomaPage = () => {

  const trainer = useSelector(reducer => reducer.trainer)

const inputTrainer = useRef()

const dispatch = useDispatch()
const navigate = useNavigate()

const handleSubmit = () => {

 dispatch( setTrainerG(inputTrainer.current.value.trim()))
navigate('/pokedex')
}

  return (
    <div className='container__presentation'>
      <h1 className='title__presentation'>pokedex</h1>
      <h2 className='welcome__presentation'>Hi trainer</h2>
      <p className='description__presentation'>To start with the app, give me your name ()</p>
      <form className='form__presentation' onSubmit={handleSubmit}>
        <input className='input__presentation' ref={inputTrainer} type="text" />
        <button className='button__presentation' >Gotta catch'em all</button>
      </form>
    </div>
  )
}

export default HomaPage