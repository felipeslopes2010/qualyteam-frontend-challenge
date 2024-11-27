import "./index.css";

export const Input = ({ id, type="text", placeholder, label, onChange }) => {
    return (
        <div className='document-filter-input'>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}