import { PostForm, Container } from "../components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../appwrite/config";

export default function EditPost() {
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) {
            Service.getDoc(slug).then((post) => {
                setPost(post);
            })
        }
    }, [slug, navigate])

    return post ? (
        <Container>
            <PostForm post={post}/>
        </Container>
    ) : null;
}