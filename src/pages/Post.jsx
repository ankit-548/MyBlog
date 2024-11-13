import { useState, useEffect } from "react";
import { Container, Button, Input } from "../components";
import Service from "../appwrite/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser/lib/index";

export default function Post() {
    const [author, setAuthor] = useState(false)
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector((state) => state.userdata);
    
    useEffect(() => {
        if(slug) {
            Service.getDoc(slug).then((post) => {
                setPost(post);
            })
        } 
    }, [slug, navigate]);

    useEffect(() => {
        if(userData && post && userData.$id==post.user_id) {
            setAuthor(true)
        }
    },[post]) 

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
                    <div className="flex flex-wrap justify-center md:flex-none">
                        <div className="w-full md:w-32">
                            <img src={Service.getFilePreview(post.featured_image)} alt={post.title} className="w-full rounded-2xl md:h-32"/>
                        </div>
                        <div className="flex flex-col m-4 p-4">
                            <div className="text-2xl mb-4 text-orange-400">
                                {post.title}
                            </div>
                            <div>
                                {HTMLReactParser(post.content)}
                            </div>
                        </div>
                    </div>
                    {author ? (
                        <div className="flex justify-end">
                        <Link to={`/editPost/${post.$id}`}>
                        <Button className="w-1/12 min-w-20" type="submit">Edit</Button>
                        </Link>
                        <Button className="w-1/12 min-w-20" onClick={deletePost}>
                            Delete
                        </Button>                    
                        </div>
                    ) : null}
                </div>
            </div>
        )
    : (null) ;
}