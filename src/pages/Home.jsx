import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import Service from "../appwrite/config";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Service.getListDoc().then((posts) => {
            if(posts) {
                setPosts(posts);
            }
        })
    }, []);

    if(posts.lenght === 0) {
        return (
            <div className="w-full py-8">
                <Container>
                <div>
                    Login to see posts
                </div>
                </Container>                
            </div>
        )
    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    {posts.map(post => {
                        <div id={post.$id}>
                            <PostCard post={post}/>
                        </div>
                    })}
                </Container>
            </div>
        )
    }
}