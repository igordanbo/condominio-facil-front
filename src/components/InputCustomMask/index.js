import InputMask from 'react-input-mask';
import './styles.css';

export default function InputCustomMask ( { label, mask, type, name, value, onChange} ) {
    return (
        <div>
            <label>{label}</label>
            <InputMask
                mask={mask || "(99) 99999-9999"}
                name={name}
                value={value}
                onChange={onChange}
            >
            {(inputProps) => <input type={type} {...inputProps} />}
        </InputMask>
    </div>
    );
} 