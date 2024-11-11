import { useSelector } from 'react-redux';
import { LogoutButton, Container, Logo } from '../index';
import { Navigate, Link } from 'react-router-dom';

function Header() {
    const authStatus = useSelector(state => state.isLoggedIn);
    const navItems = [
        // {
        //     name: 'Home',
        //     slug: '/',
        //     isActive: authStatus
        // },
        // {
        //     name: 'About',
        //     slug: '/about',
        //     isActive: authStatus
        // },
        // {
        //     name: 'Contact',
        //     slug: '/contact',
        //     isActive: authStatus
        // },
        {
            name: 'Login',
            slug: '/login',
            isActive: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            isActive: !authStatus
        },
        {
            name: 'AddPost',
            slug: '/addPost',
            isActive: authStatus
        },
        {
            name: 'AllPost',
            slug: '/allPost',
            isActive: authStatus
        }
    ]
    return(
        <header>
            <Container>
                <div className='w-full py-2 bg-white'>
                    <ul className='flex justify-between'>
                        <div className='m-2'>
                            <li>
                                <Logo/>
                            </li>
                        </div>
                        <div className='flex'>
                            {navItems.map(item => 
                                item.isActive ? 
                                (<Link to={item.slug}><li key={item.name} className='p-2 m-2 hover:bg-orange-200 bg-orange-400 rounded-md'>
                                    {item.name}                                
                                    </li></Link>)
                                : null
                            )}
                            {authStatus && (
                                <li key='logoutbtn'>
                                    <LogoutButton />
                                </li>
                            )}
                        </div>
                    </ul>
                </div>
            </Container>
        </header>
    )
}
 
export default Header;