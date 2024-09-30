import { useForm, } from "react-hook-form"
import { useEffect } from "react"
import authService from "../../appwrite/auth.service"
import { RTE, Input, Button, Select } from "../index"

export default function PostForm() {
    const [register, handleSubmit, getValue, setValue, watch] = useForm({

    });
    return (
        <div>form</div>
    )
}