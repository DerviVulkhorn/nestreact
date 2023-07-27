import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transactions from '../pages/Transactions'
import Categories from '../pages/Categories'
import Auth from '../pages/Auth'
//Массив роутеров
export const router= createBrowserRouter([
    {
        //Указываем путь
        path:'/',
        //Вызываем страницу
        element:<Layout></Layout>,
        //Страница для вывода ошибок
        errorElement:<ErrorPage></ErrorPage>,
        //Дочерние страницы
        children:[
            {
                //То же саоме что и path:'/'
                index:true,
                element:<Home></Home>
            },
            {
                path:'transactions',
                element:<Transactions></Transactions>
            },
            {
                path:'categories',
                element:<Categories></Categories>
            },
            {
                path:'auth',
                element:<Auth></Auth>
            }
        ]
    }
])
