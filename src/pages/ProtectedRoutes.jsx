import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const protectedRoutes = () => {
  const trainer = useSelector(reducer => reducer.trainer)
  if(trainer.length >= 3){
    return <Outlet/>
  }else {
    return <Navigate to='/'/>
  }
}

export default protectedRoutes