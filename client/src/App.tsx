//Для отображения роутов
import {RouterProvider} from 'react-router-dom'
//Импортируем наш роутер
import { router } from './router/router'

function App() {

  return  <RouterProvider router={router}></RouterProvider>
    
  
}

export default App
