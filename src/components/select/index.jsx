import "./index.css";

export const Select = ({ id, label, options, optionKey = "name", ...rest }) => {
    const uniqueOptions = Array.from(new Set(options.map(option => option[optionKey])));

    return (
        <div className="select-input">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...rest}>
                <option value="">Select an option</option>
                {uniqueOptions.map((optionValue, index) => (
                    <option key={index} value={optionValue}>
                        {optionValue}
                    </option>
                ))}
            </select>
        </div>
    );
};