import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://anti-corruption-egov.onrender.com/api'
export default  axios.create({
    baseURL: "https://anti-corruption-egov.onrender.com/api",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    })


