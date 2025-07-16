import { useEffect, useState } from "react";

export default function Condominios() {
    
    // estado para guardar o que vier da API
    const [condominios, setCondominios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // para capturar falhas

    useEffect(() => {
    // 2. faça a requisição assim que o componente montar
    // (o array vazio [] garante que roda só 1 vez)

        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/condominios");
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json(); // converte JSON → objeto JS
                setCondominios(data.data); // salva no estado
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Carregando…</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        console.log(condominios),
        (
        <ul>
            {condominios.map((condominio) => (
            <li key={condominio.id}>
                <strong>{condominio.id}.</strong> {condominio.nome}
                <ul>
                <li>Sindico: {condominio.sindico.nome}</li>
                <li>Endereço: {condominio.endereco}</li>
                <li>Telefone: {condominio.telefone}</li>
                <li>Email: {condominio.email}</li>
                <li>
                    Data de Criação:{" "}
                    {new Date(condominio.created_at).toLocaleDateString()}
                </li>
                <li>
                    Data de Atualização:{" "}
                    {new Date(condominio.updated_at).toLocaleDateString()}
                </li>

                <ul>
                    <li>Blocos:</li>
                    <ul>
                    {condominio.blocos.map((bloco) => (
                        <li key={bloco.id}>
                        <strong>{bloco.id}.</strong> {bloco.nome}
                        <ul>
                            <li>Andares: {bloco.andares}</li>
                            <li>
                            Data de Criação:{" "}
                            {new Date(bloco.created_at).toLocaleDateString()}
                            </li>
                            <li>
                            Data de Atualização:{" "}
                            {new Date(bloco.updated_at).toLocaleDateString()}
                            </li>
                        </ul>
                        </li>
                    ))}
                    </ul>
                </ul>
                </ul>
            </li>
            ))}
        </ul>
        )
  );
}
