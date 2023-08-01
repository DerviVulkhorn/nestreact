//Для отображения роутов
import {RouterProvider} from 'react-router-dom'
//Импортируем наш роутер
import { router } from './router/router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localstore.helper'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'


function App() {
  const dispatch = useAppDispatch()

  //Проверяем залогинины ли мы
  const checkAuth = async () => {
    const token  = getTokenFromLocalStorage()
    try {
      if (token){
        const data = await AuthService.getMe()
        if (data) {
          dispatch(login(data))
        }
        else{
          dispatch(logout())
        }
      }
    }
    catch (error){
      console.log(error)
    }
  }

  //Вызываем при обновлении
  useEffect(()=>{
    checkAuth()
  },[])

  return  <RouterProvider router={router}></RouterProvider>
    
  
}

export default App
