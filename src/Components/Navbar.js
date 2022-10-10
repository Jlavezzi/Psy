import {NavLink} from 'react-router-dom';

const Navbar = ()=>{
    return(
        <nav>
            <NavLink to='/'> Home</NavLink>
            <NavLink to='/portfolio'>Portfolio</NavLink>
            <NavLink to='/register'>Register</NavLink>
           
        </nav>
    )
}

export default Navbar;