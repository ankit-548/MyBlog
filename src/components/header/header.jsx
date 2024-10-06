import { useSelector } from 'react-redux';
import { LogoutButton, Container, Logo } from '../index';
import { Navigate, Link } from 'react-router-dom';

function Header() {
    const authStatus = useSelector(state => state.isLoggedIn);
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            isActive: authStatus
        },
        {
            name: 'About',
            slug: '/about',
            isActive: authStatus
        },
        {
            name: 'Contact',
            slug: '/contact',
            isActive: authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            isActive: !authStatus
        },
        {
            name: 'SignUp',
            slug: '/signup',
            isActive: !authStatus
        }
    ]
    return(
        <header>
            <Container>
                <div className='w-full bg-green-300 py-2'>
                    <ul className='flex'>
                        <li>
                            <Logo/>
                        </li>
                         {navItems.map(item => 
                            item.isActive ? 
                            (<li key={item.name}>
                                <Link to={item.slug}>{item.name}</Link>                                
                                </li>)
                             : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutButton/>
                            </li>
                        )}
                    </ul>
                </div>
            </Container>
        </header>
    )
}
 
export default Header;