import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useDispatch, useSelector } from "react-redux"
import { setPageG } from "../../store/slices/pageSlice"

const SelectType = ({setSelectValue}) => {

   

  
    const url = 'https://pokeapi.co/api/v2/type/'
    const [types, getAllTypes] = useFetch(url)
    useEffect(()=>{
        getAllTypes()
    },[])
    
    const handleChange = e => {
       setSelectValue(e.target.value)
    }

  return (
    <div>
    <select className='SelectType' onChange={handleChange}>
    <option className="select__option__one" value="allPokemons">All pokemons</option>
    {
        types?.results.map(type => (
            <option className="select__option__two" key={type.url} value={type.url}>{type.name}</option>
        ))
    }
   </select>
   
   </div>
   
   
  )
}

export default SelectType