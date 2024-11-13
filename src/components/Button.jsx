
function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <button className={` m-2 py-2 bg-orange-400 rounded-xl ${className}`} {...props}>{children}</button>
    )
}

export default Button;