import "./index.css";

export const Button = ({ title, className, type="button", onClick, ...rest }) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            {...rest}
        >
            {title}
        </button>
    )
}