
import { Route, Routes, unstable_HistoryRouter } from 'react-router-dom'
import './App.css'
import HomaPage from './pages/HomaPage'
import PokedexPage from './pages/PokedexPage'
import PokeIdPage from './pages/PokeIdPage'
import Page404 from './pages/Page404'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomaPage/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/pokedex' element={<PokedexPage/>}/>
        <Route path='/pokedex/:id' element={<PokeIdPage/>}/>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </>
  )
}

export default App
