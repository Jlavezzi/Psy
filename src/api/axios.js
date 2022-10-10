import axios from 'axios';


export default axios.create({
    baseURL: 'http://localhost:3500'
})

// async function makeRequest(){

//     const config = {
//         method: 'get',
//         url: 'http://webcode.me',
//         Headers: {'User-Agent' : 'Axios- console app'}
//     }
//     let res = await Axios(config)
//     console.log(res.request._header);
// }

// makeRequest()