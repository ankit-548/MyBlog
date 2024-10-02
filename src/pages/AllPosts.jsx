import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import Service from "../appwrite/config";

export default function AllPost() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        Service.getListDoc().then((posts) => {
            if(posts) {
                setPost(posts.document)
            }
        })
    }, [])

    return posts.length>0 ? 
    (
    <div className="w-full py-8">
        <Container>
            {posts.map(post => (
                <div className="py-8" id={post.$id}>
                    <PostCard post={post}/>
                </div>
            ))}
        </Container>
    </div>
    ) 
    : null
}