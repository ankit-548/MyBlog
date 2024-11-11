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
    console.log(userData, post, 'nothing in post')
    const author = userData && post ? userData.$id==post.user_id : false;
    console.log(author)
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
            <div className="grid justify-items-center">
                <div className="bg-white m-4 p-4 rounded-xl">
                    <div className="flex flex-wrap  md:flex-none">
                        <div className="w-full md:w-32">
                            <img src={Service.getFilePreview(post.featured_image)} alt={post.title} className="w-full rounded-2xl md:h-32"/>
                        </div>
                        <div className="flex flex-col m-4 p-4">
                            <div>
                                <h2>{post.title}</h2>
                            </div>
                            <div>
                                {post.content}
                            </div>
                        </div>
                    </div>
                    {author ? (
                        <div className="flex justify-between">
                        <Link to={`/editPost/${post.$id}`}>
                        <Button className="w-24" type="submit">Edit</Button>
                        </Link>
                        <Button className="w-10" onClick={deletePost}>
                            Delete
                        </Button>                    
                        </div>
                    ) : null}
                </div>
            </div>
        )
    : (null) ;
}