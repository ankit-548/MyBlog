import { Container, PostForm } from "../components"

export default function AddPost() {
    return (
        <div className="w-full py-8">
            <Container>
                {console.log('reached addpost page')}
                <PostForm />
            </Container>
        </div>
    )
}