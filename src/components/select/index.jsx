import "./index.css";

export const Select = ({ id, label, processes, onChange }) => {
    const uniqueProcesses = Array.from(new Set(processes.map(process => process.name)));

    return (
        <div className='select-filter-input'>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={onChange}>
                <option value="">Select a process</option>
                {uniqueProcesses.map((processName, index) => (
                    <option key={index} value={processName}>{processName}</option>
                ))}
            </select>
        </div>
    );
};