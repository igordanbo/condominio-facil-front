import React from 'react';

export default function SelectCustom({
    label,
    options = [],
    value,
    name,
    onChange,
    valueKey = 'id',
    labelKey = 'nome',
    placeholder = 'Selecione uma opção...'
}) {
    return (
        <div>
            <label>{label}</label>
            <select name={name} value={value} onChange={onChange}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option[valueKey]} value={option[valueKey]}>
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>

  );
}
