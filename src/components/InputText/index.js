import './styles.css'

export default function InputText ( { label, type, name, value, onChange } ) {
    return ( 
        <div>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}