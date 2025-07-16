import { useNavigate } from "react-router-dom";

export default function Page404() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 - Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <button onClick={() => navigate("/")}>
                Voltar para o início
            </button>
        </div>
    );
}