import { useState } from 'react';
import './styles.css';

export default function SelectBool({ label, value1, option1, cor1, value2, option2, cor2, name, onChange }) {
    const [selectedValue, setSelectedValue] = useState(value1);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // Define a cor com base no valor selecionado
    const corAtual = selectedValue === value1 ? cor1 : cor2;

    return (
        <div className="container-select">
            <label>{label}</label>
            <select name={name} value={selectedValue} onChange={(event) => {handleChange(event); onChange(event)}}>
                <option value={value1}>{option1}</option>
                <option value={value2}>{option2}</option>
            </select>

            <div
                style={{
                    position: 'absolute',
                    right: '0',
                    marginTop: '10px',
                    width: '30px',
                    height: '10px',
                    backgroundColor: corAtual,
                    borderRadius: '50px',
                    transition: 'background-color 0.3s ease',
                }}
            ></div>
        </div>
    );
}
