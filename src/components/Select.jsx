import React,{ useId } from 'react'; 

function Select({
    label,
    options,
    className='',
    value='',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select {...props}  id={id} ref={ref} className={`w-full m-2 p-2 rounded-lg ${className}`} >
                {options?.map((option) => (
                    <option key={option} selected={value==option? true: false}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);