import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import Service from "../appwrite/config";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('in useeffect', posts)
        Service.getListDoc().then((posts) => {
            if(posts) {
                console.log('in useeffect', posts.documents)
                setPosts(posts.documents);
            }
        })
    }, []);
    if(posts.length === 0) {
        console.log('posts.length===0', posts)
        return (
            <div className="w-full bg-green-100 h-screen">
                <Container>
                <div className="text-lg">
                    No posts to show
                </div>
                </Container>                
            </div>
        )
    } else {
        return (
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
    }
}