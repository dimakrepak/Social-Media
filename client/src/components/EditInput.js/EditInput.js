import './editInput.css'

export default function EditInput({ inputValue, onChange, name, profileEdit, }) {

    return (
        <>
            <input
                className={!profileEdit ? "edit-input" :"edit-input-status"}
                value={inputValue}
                placeholder="Edit"
                type="text"
                name={name}
                onChange={onChange}
            />
        </>
    )
}
