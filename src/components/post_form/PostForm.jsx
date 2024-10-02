import React from "react"
import { useForm, } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import config from "../../appwrite/config"
import { RTE, Input, Button, Select } from "../index"

export default function PostForm(post) {
    const [register, handleSubmit, getValue, setValue, watch] = useForm({
        defaultValues: "content"
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userdata);

    const submit = async (data) => {
        if(post) {
            const file = await config.uploadFile(data.file[0], data.featured_image);
            if(file) {
                await config.deleteFile(data.featured_image);
            }
            await config.updateDoc({
                slug: post?.$id || '',
                title: data?.title || '',
                content: data?.content || '',
                featured_image: data?.featured_image || '',
                status: data?.status || 'active',
                userId: userData?.slug || '' 
            });
            navigate(`/post/${post.$id}`);
        } else {
            const file = await config.uploadFile(data.file[0], data.featured_image);            
            const doc = await config.createDoc({
                slug: data?.slug || '',
                title: data?.title || '',
                content: data?.content || '',
                featured_image: data?.featured_image || '',
                status: data?.status || 'active',
                userId: userData?.slug || '' 
            });
            navigate(`/post/${doc.slug}`);
        }
    }

    // we have to watch title and to generate value in slug
    const slugTransform = React.useCallback((value) => {
        if(value && typeof(value.title === String)) 
            return value.title.trim()
            .toLowerCase()
            .replace(/[a-zA-Z0-9]/g, '');
        return '';
    }, []);

    // if we are calling a method in useEffect, How to do memory optimization(so that it doesn't keep on moving in itself)? We will store that in a variable and in return of useEffet using a callback unsubscribe;
    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                // input with name slug set it's value as mentionend in second argument
                setValue('slug', slugTransform(value.title, 
                    {shouldValidate: true}
                ))
            }
        });

        return () => {
          subscription.unsubscribe();  
        } 
    }, [slugTransform, watch, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="w-full flex flex-wrap">
            <div className="w-2/3">
                <Input 
                type="text"
                label="Title: "
                placeholder="Title"
                {...register('title', {
                    required: true
                })}
                />
                <Input
                label="Slug: "
                placeholder="Slug"
                {...register('slug', {
                    required: true
                })}
                onInput={(e) => {setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                name="content"
                label="Content: "
                control={control}
                defaultValue="Content"
                />
            </div>
            <div className="w-1/3">
                <Input
                type="file"
                label="Featured Image"
                {...register('featured_image', {
                    required: !post
                })}
                />
                {post ? (
                    <img src={config.getFilePreview(post.featured_image)} 
                    alt={post.title}
                    />
                    ) : null}
                {post ? (
                    <Select
                    label="Status: "
                    option={['Active, InActive']}
                    {...register('status', {
                        required: true
                    })}
                    />)
                : null }
                <Button type="submit"> 
                    {post? "Update": "Insert"}
                </Button>                
            </div>        
        </form>
    )
}