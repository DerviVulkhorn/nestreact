//Получения токена
export function getTokenFromLocalStorage():string{
    const data = localStorage.getItem('token')
    //Если в переменной data что-то есть, то парсим её, если нет, то пустую строку
    const token = data ? JSON.parse(data) : ''
    
    return token
}

//Принимаем 2 параметра key и token
export function setTokenToLocalStorage(key:string, token:string):void{
    //JSON.stringify(token) - получение строки с JSON-запроса
    localStorage.setItem(key, JSON.stringify(token))
}