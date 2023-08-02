import { useDispatch, useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import { setTrainerG } from "../store/slices/trainer.slice"
import { setPageG } from "../store/slices/pageSlice"


const PokedexPage = () => {


  const trainer = useSelector(reducer => reducer.trainer)
  const pageSlice = useSelector(reducer => reducer.pageSlice)

  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=${pageSlice}&limite=100`)
  const [pages, setPages] = useState([1, 2, 3, 4, 5])
  const [p, setP] = useState(1)




  useEffect(() => {
    setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${pageSlice}&limite=100`)
  }, [pageSlice])




  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url)

 
  
  useEffect(() => {
    if ((selectValue === 'allPokemons')) {
      getAllPokemons()
    } else {
      getPokemonsByType(selectValue)
      console.log(selectValue)
   
    }

  }, [selectValue, url, pageSlice])



  const inputSearch = useRef()

  const handleSubmit = e => {

    e.preventDefault()

    setInputValue(inputSearch.current.value.trim().toLowerCase())

  }

  const cbFilter = poke => poke.name.includes(inputValue)

  const handlePage = e => {
   
      if (e == 5) dispatch(setPageG(80))
      if (e == 4) dispatch(setPageG(60))
      if (e == 3) dispatch(setPageG(40))
      if (e == 2) dispatch(setPageG(20))
      if (e == 1) dispatch(setPageG(0));
      setP(e)
      console.log(p)
    }

  const handlePageBtn = e => {
    
      if (e === 0) {
        if (p > 1) {
          setP(p - 1)
        }
        setUrl(pokemons?.previous)

      } else {
        setP(p + 1)
        setUrl(pokemons?.next)
      
        
        
      }
    }
  
  return (
    <div >

      <div className="container__header">
        <p className="container__welcome"><span>Welcome <span className="container__name">{trainer}</span>,</span> here you can find your favorite pokemon</p>
        <form className="container__form" onSubmit={handleSubmit}>
          <input className="container__input" ref={inputSearch} type="text" />
          <button className="container__button" >Search</button>
        </form>
        <SelectType setSelectValue={setSelectValue} />
      </div>
      <div className="pagination">
        <button onClick={() => handlePageBtn(0)}>Previous</button>
        {
          pages?.map(num => (
            <button
              className="pagination__btn"
              onClick={() => handlePage(num)}
              key={num}
              p={p}
            >{num > 4 ? `...${p}` : num}</button>
          ))
        }
        <button onClick={() => handlePageBtn(1)}>Next</button>
      </div>
      <div className="pokecard__container">
        {
         
          pokemons?.results.filter(cbFilter).map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}

            />
          ))
          
        }

      </div>
    </div>
  )
}

export default PokedexPage