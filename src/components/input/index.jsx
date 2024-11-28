import "./index.css";

export const Input = ({ id, type = "text", label, ...rest }) => {
    return (
        <div className="document-filter-input">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} {...rest} />
        </div>
    );
};
