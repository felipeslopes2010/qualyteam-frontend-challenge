import "./index.css";

export const Select = ({ id, label, processes, ...rest }) => {
    const uniqueProcesses = Array.from(new Set(processes.map(process => process.name)));

    return (
        <div className="select-filter-input">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...rest}>
                <option value="">Select a process</option>
                {uniqueProcesses.map((processName, index) => (
                    <option key={index} value={processName}>
                        {processName}
                    </option>
                ))}
            </select>
        </div>
    );
};