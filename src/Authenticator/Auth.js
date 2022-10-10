import {Navigate , Outlet} from 'react-router-dom';

const PrivateRoutes = ()=>{
    let auth = {'token': false}

    return(
        auth.token? <Outlet /> : <Navigate  to= '/register'/>    
        )
}

export default PrivateRoutes