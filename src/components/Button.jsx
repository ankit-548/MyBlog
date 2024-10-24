
function Button({
    children,
    className = '',
    ...props
}) {
    return (
        <button className={`${className} m-2 py-2 w-4/5 bg-orange-400 rounded-xl`} {...props}>{children}</button>
    )
}

export default Button;