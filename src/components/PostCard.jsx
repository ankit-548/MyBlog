import Service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({post, className}) {
    return (
        // $id this is syntex of appwrite this is the id of post.
        // in to attribute of Link we don't need complete path, it redirects from current url to the path mentioned in to attribute.
        <div className={`w-full rounded-2xl border-2 border-b-black  m-2 p-2 ${className}`}>
            <Link to={`/post/${post.$id}`}>
                    <img className="w-full rounded-2xl" src={Service.getFilePreview(post.featured_image)} alt={post.title}/>
                    <h2>{post.title}</h2>
            </Link>
        </div>
    )
}

export default PostCard;