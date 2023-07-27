import { FC, useState } from "react";

//FC - функциональный компонент реакта
const Auth: FC = () =>{
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [isLogin,setIsLogin] = useState<boolean>(false)
    return (
        <div className="mt-40 flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="text-center text-xl mb-10">
                {isLogin ? 'Login':'Registration'}
            </h1>

            <form className="flex w-1/3 flex-col mx-auto gap-5">
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
