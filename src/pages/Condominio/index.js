import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Condominio() {

    //pega o id do condominio da URL
    const { id } = useParams();

    const [condominio, setCondominio] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            setError(null); // limpa erro anterior antes da nova requisição

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();
                setCondominio(data);
            } catch (err) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // id como dependência

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!condominio) return <p>Nenhum dado encontrado.</p>;

    return (
        <div>
            <Link to={`/condominio/editar/${condominio.id}`}>Editar</Link>
            <h1>{condominio.nome}</h1>
            <p>Endereço: {condominio.endereco}</p>
            <p>Telefone: {condominio.telefone}</p>
            <p>Email: {condominio.email}</p>
            <p>Endereço: {condominio.endereco}</p>
                <p>Telefone: {condominio.telefone}</p>
                <p>Email: {condominio.email}</p>
                <p>Status: {condominio.status}</p>
                <p>CNPJ: {condominio.cnpj}</p>
                <p>Cidade: {condominio.cidade}</p>
                <p>UF: {condominio.uf}</p>
                <p>Responsável ID: {condominio.responsavel_id}</p>

    
        </div>
    );
};