import { useDispatch, useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import '../../src/components/styles/PokeCard.css'


const PokedexPage = () => {


  const trainer = useSelector(reducer => reducer.trainer)
  
  
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')
  const [item, setItem] = useState(1)

  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200`)

  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url)

  const inputSearch = useRef()
  
  
  //***********useEffect*********************** */


  useEffect(() => {
    if ((selectValue === 'allPokemons')) {
      setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200`)
      getAllPokemons()
      setItem(1)
      quantityPokemons()
      
    
    } else {
      getPokemonsByType(`${selectValue}`)
      setItem(1)
    }

  }, [selectValue, url])

  //****************Functions**************** */

  const handleSubmit = e => {

    e.preventDefault()

    setInputValue(inputSearch.current.value.trim().toLowerCase())

  }

  const cbFilter = poke => {
    
    const pokemonsByCategory = poke?.name?.includes(inputValue)
   
    return pokemonsByCategory
  }

  const next = e => {

    if(item < quantityPokemons().pages.length){
      setItem(item + 1)
    }
   
    //setUrl(pokemons?.next)
  }
  const previous = () => {
    if(item > 1){
      setItem(item - 1)
    }
  }

  const quantityPokemons = (e = 0) => {

    const quantity = pokemons?.results.length

    const itemsForPage = 20

    let pages = []

    let noOfPages = quantity / itemsForPage;

    for (let i = 1; i < noOfPages; i++) {
      pages.push(i);
    }
    
    let  pageNumber = item

    const itemsToSkip = (pageNumber - 1) * itemsForPage

    const items = pokemons?.results.slice(itemsToSkip, itemsForPage + itemsToSkip);

    return {items, pages}
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
        <div className="pagination">
        <button 
        className="previous"
        onClick={previous}
        >Previous</button>
        {
          quantityPokemons().pages?.map(page => (
            
            <button
            
            key={page?.url}
            url={page?.url}
        
            id={page}
            className={`pagination__btn ${item == page ? 'prueba' : ''}`}
          onClick={() => setItem(page)}
          >{page}</button>

          ))
        }
          
           
          
        
        <button  className="previous" onClick={() => next()} >Next</button>
      </div>
      </div>
      
      <div className="pokecard__container">
        {
  
          quantityPokemons().items?.filter(cbFilter).map(poke => (
              <PokeCard
                key={poke?.url}
                url={poke?.url}

              />
            ))

        }

      </div>
    </div>
  )
}

export default PokedexPage