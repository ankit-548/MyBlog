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
        <Container className="flex flex-wrap justify-evenly md:justify-start">
            {posts.map(post => (
                <div key={post.$id} className="m-2 p-2">
                    <PostCard post={post} className="w-11/12  md:w-40 h-160"/>
                </div>
            ))}
        </Container>
    </div>
    ) 
    : null
}