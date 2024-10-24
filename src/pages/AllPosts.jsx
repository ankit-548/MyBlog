import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import Service from "../appwrite/config";

export default function AllPost() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        Service.getListDoc().then((posts) => {
            console.log(posts)
            if(posts) {
                setPost(posts.documents)
            }
        })
    }, [])

    return posts?.length>0 ? 
    (
    <div className="w-full py-8">
        <Container>
            <div className="">
            {posts.map(post => (
                <div className="py-8" key={post.$id}>
                    <PostCard post={post}/>
                </div>
            ))}
            </div>
        </Container>
    </div>
    ) 
    : null
}