import React, { useId } from "react";
 
const Input = React.forwardRef(function Input({
    label,
    type='text',
    placeholder='',
    className='',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (<p className="flex justify-center"><label>{label}</label></p>)}
            <input type={type} placeholder={placeholder} className={`w-full m-2 rounded-xl p-2 bg-green-100 ${className}`} {...props} ref={ref} id={id}/>
        </div>
    )
})

export default Input;