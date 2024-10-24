import { Container, Logo } from '../index'
import { Link } from 'react-router-dom'
function Footer() {
    const navItems = [
        {
            name: 'Home',
            slug: '/',
        },
        {
            name: 'About',
            slug: '/',
        },
        {
            name: 'Contact',
            slug: '/',
        }
    ]
    return(
        <Container className=" bg-white">
            <div className='w-full flex justify-center'>
                <div className='w-1/3 py-2 mb-2'>
                    <ul className='flex-col justify-items-start'>                    
                        <div>
                            {navItems.map(item =>
                                (<li key={item.name} className='p-2 m-2'>
                                    <Link to={item.slug}>{item.name}</Link>                                
                                    </li>)
                            )}
                        </div>
                    </ul>
                </div>
                <div className='w-1/3 py-2 m-2'>
                    <div>
                        <p>
                            Address: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet reprehenderit magnam cupiditate quas doloribus, laborum natus perspiciatis saepe nemo culpa!
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center m-2'>
                <div className="m-2 p-2">&copy;2024. MyBlog. </div>
                <span>
                    <Logo/>
                </span>
            </div>
        </Container>
    )
}
 
export default Footer;