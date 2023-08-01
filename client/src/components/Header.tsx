import { FC } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {FaBtc} from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorge } from '../helpers/localstore.helper'
import {toast} from 'react-toastify'

const Header:FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHendler = () => {
        dispatch(logout())
        removeTokenFromLocalStorge('token')
        toast.success('You logout system.')
        navigate('/')
    }

  return (
    <header className='flex items-center p-4 shadow-sm bg-slate-800 background-blur-sm'>
        <Link to='/'>
            <FaBtc size={20} ></FaBtc>
        </Link>
        {   // Если переменная isAuth = true
            isAuth && (
                <nav className='ml-auto mr-10'>
                    <ul className='flex items-center gap-5'>
                        <li>
                        {/* className={({isActive})=> isActive ? 'text-white' : 'text-white/50'} 
                        где isActive - параметр react-router-dom, который принимает true или false
                        если (?) true тогда красим в text-white, а если false, тогда text-white/50 */}
                            <NavLink to='/' className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/categories' className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Category</NavLink>
                        </li>
                        <li>
                            <NavLink to='/transactions' className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Transaction</NavLink>
                        </li>
                    </ul>
                </nav>
            )
        }
        {
            //Если пользователь вошёл (isAuth = true)
            isAuth ? (
                <button className='flex p-2 justify-center rounded-md bg-rose-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
                onClick={logoutHendler}>
                    <span>Log out</span>
                </button>
            ):(
            //Если пользователь не вошёл (isAuth = false)
                <Link className='py-2 text-white/50 hover:text-white ml-auto' to={'auth'}>
                    Log in/Sign in
                </Link>
            )
        }
    </header>
  )
}

export default Header