import Service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({
    $id,
    featuredImage,
    title
}) {
    return (
        // $id this is syntex of appwrite this is the id of post.
        // in to attribute of Link we don't need complete path, it redirects from current url to the path mentioned in to attribute.
        <Link to={`/posts/${$id}`}>
            <div className='w-full rounded-xl'>
                <img src={Service.getFilePreview(featuredImage)} alt={title}>{title}</img>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;