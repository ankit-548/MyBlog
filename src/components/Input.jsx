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
            {label && (<label>{label}</label>)}
            <input type={type} placeholder={placeholder} className={`${className}`} {...props} ref={ref} id={id}/>
        </div>
    )
})

export default Input;