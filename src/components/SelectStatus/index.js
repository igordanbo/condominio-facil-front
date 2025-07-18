import './styles.css';

export default function SelectStatus({ label = 'Status', value, name = 'status', onChange }) {
    return (
        <div className="select-status-wrapper">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`select-status ${value === 'ativo' ? 'ativo' : 'inativo'}`}
            >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </select>
        </div>
    );
}