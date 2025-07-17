

export default function InputEmail({ label, name, value, onChange }) {

    const isEmailValid = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };
    
    return (
        <div>
            <label>{label}</label>
            <input
                type="email"
                name={name}
                value={value}
                onChange={onChange}
                style={{ borderColor: isEmailValid(value) ? "black" : "red" }}
            />
            {!isEmailValid(value) && <p style={{ color: "red" }}>E-mail inválido</p>}
        </div>

    )

}