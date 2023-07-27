// Устанавливаем axios (npm i axios)

import axios from "axios";

//меняем строку запроса для аксиоса (http://localhost:3000/api)
//и добавляем токен

export const instance = axios.create({
    baseURL:'http://localhost:3000/api',
    headers:{
        Authorization:'Bearer',
        
    }
})