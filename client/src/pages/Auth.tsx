import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstore.helper";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { login } from '../store/user/userSlice'

//FC - функциональный компонент реакта
const Auth: FC = () =>{
    const [full_name, setFull_name] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin,setIsLogin] = useState<boolean>(false)
    const dispatch= useAppDispatch()
    //Для переноса на новоу страницу
    const navigate = useNavigate()

    const loginHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            const data = await AuthService.login({full_name,email, password})

            if(data){
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('You logget in.')
                //Для переноса на новоу страницу
                navigate('/')
            }
        }
        catch(err:any){
            const error = err.responce?.data.message
            toast.error(error.ToString())
        }
    }

    const registrationHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            const data = await AuthService.registration({full_name, email, password })
            if(data) {
                toast.success('Accaunt has been created.')
                setIsLogin(!isLogin)
            }
        }
        catch(err:any){
            const error = err.responce?.data.message
            toast.error(error.ToString())
        }
    }

    return (
        <div className="mt-40 flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="text-center text-xl mb-10">
                {isLogin ? 'Login':'Registration'}
            </h1>

            <form 
            onSubmit={isLogin ? loginHandler : registrationHandler}
            className="flex w-1/3 flex-col mx-auto gap-5">
                <input 
                type="text" 
                className="rounded-md border border-slate-800 bg-slate-700 bg-transparent p-2 outline-none placeholder:text-white focus:border-slate-300" 
                placeholder="Full name"
                //Для обработки введённых данных
                onChange={(e)=>setFull_name(e.target.value)}
                />
                <input 
                type="text" 
                className="rounded-md border border-slate-800 bg-slate-700 bg-transparent p-2 outline-none placeholder:text-white focus:border-slate-300" 
                placeholder="email"
                //Для обработки введённых данных
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="text" 
                className="rounded-md border border-slate-800 bg-slate-700 bg-transparent p-2 outline-none placeholder:text-white focus:border-slate-300" 
                placeholder="password"
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button className="btn bg-green-600 haver:bg-green-800 mx-auto">Submit</button> 
            </form>

            <div className="flex justify-center mt-5">
                {
                    isLogin ? (
                        <button 
                        // меняем на противоположный
                        onClick={()=> setIsLogin(!isLogin)}
                        className="text-slate-300 hover:text-white">
                            You don't have an account?
                        </button>
                    ):(
                        <button 
                        onClick={()=> setIsLogin(!isLogin)}
                        className="text-slate-300 hover:text-white">
                            Already have an account?
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Auth
