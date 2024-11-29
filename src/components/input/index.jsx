import "./index.css";

export const Input = ({ id, className, type = "text", label, value, ...rest }) => {
    return (
        <div className={className}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type={type}
                value={value}
                {...rest}
            />
        </div>
    );
};
