import { useState, useEffect } from "react";
import { Container, Button, Input } from "../components";
import Service from "../appwrite/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector((state) => state.userdata);

    const author = userData && post ? userData.$id==post.user_id : false;
    useEffect(() => {
        if(slug) {
            Service.getDoc(slug).then((post) => {
                setPost(post);
            })
        } 
    }, [slug, navigate]);

    function deletePost() {
        Service.deleteDoc(post.$id).then((res) => {
            if(res) {
                Service.deleteFile(post.featured_imgae);
                navigate('/');
            }
        })
    }

    return post ? (
            <div className="w-full flex flex-wrap">
                <img src={Service.getFilePreview(post.featured_image)} alt={post.title} className="rounded-xl"/>
                {author ? (
                    <div>
                    <Link to={`/editPost/${post.$id}`}>
                    <Button type="submit">Edit</Button>
                    </Link>
                    <Button onClick={deletePost}>
                        Delete
                    </Button>                    
                    </div>
                ) : null}
                <div>
                    <h2>{post.title}</h2>
                </div>
                <div>
                    {post.content}
                </div>
            </div>
        )
    : (null) ;
}