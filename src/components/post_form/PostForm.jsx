import React from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import config from "../../appwrite/config"
import { RTE, Input, Button, Select } from "../index"

export default function PostForm({post}) {
    const {register, handleSubmit, getValue, setValue, watch, control} = useForm({
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
            const file = await config.uploadFile(data.image[0]);  
            if(file) {
                const fileId = file.$id;
                data.featured_image = fileId;
                const doc = await config.createDoc({
                    ...data,
                    user_id: userData.$id 
                });
                if(doc) {
                    navigate(`/post/${doc.$id}`);
                }
            }
        }
    }

    // we have to watch title and to generate value in slug
    const slugTransform = React.useCallback((value) => {
        if(value && typeof(value === String)) 
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '-') ;
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
                <div className="bg-white rounded-xl m-4 p-4">
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
                </div>
                <div className="m-4">
                    <RTE
                    name="content"
                    label="Content: "
                    control={control}
                    defaultValue="Content"
                    />
                </div>
            </div>
            <div className="w-1/3">
                <div className="m-4 p-4 bg-white">
                    <Input
                    type="file"
                    label="Featured Image: "
                    {...register('image', {
                        required: !post
                    })}
                    />
                    {post ? ( 
                        <div className="flex justify-center">
                        <img className="rounded-xl" src={config.getFilePreview(post.featured_image)}
                        alt={post.title}
                        /></div>
                        ) : (null) }
                    <Select
                        className="bg-green-100"
                        options={['active', 'inActive']}
                        label="Status: "
                        {...register('status', {
                            required: true
                        })}
                    />
                    <Button type="submit"> 
                        {post? "Update": "Create"}
                    </Button>
                </div>
            </div>        
        </form>
    )
}