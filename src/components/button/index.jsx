import "./index.css";

export const Button = ({ type="button", title, onClick }) => {
    return (
        <button className="filter-documents-button" type={type} onClick={onClick}>{title}</button>
    )
}