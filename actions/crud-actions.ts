import axios from "axios"

 export const postRequest = async (url: string, data: any) => {
    const response = await axios.post(url, data)
    return response.data
}


 