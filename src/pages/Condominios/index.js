import { useEffect, useState } from "react";
import Table from "../../components/Table";
import TableHeader from "../../components/Table/TableHeader";
import TableItem from "../../components/Table/TableItem";
import TableFooter from "../../components/Table/TableFooter";
import Erro from "../../components/Mensagem/Erro";
import ModalDanger from "../../components/Modal/ModalDanger";
import { useNavigate } from "react-router-dom";

export default function Condominios() {
    
    // estado para guardar o que vier da API
    const [condominios, setCondominios] = useState([]); //[] esperando lista
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [mostrarModal, setAbrirModal] = useState(true);
    const [condominioSelecionado, setCondominioSelecionado] = useState(null);
    let navigate = useNavigate();

    // requisição feita assim que o componente montar
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // limpa erro anterior

            try {
                const response = await fetch("http://127.0.0.1:8000/api/condominios");

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();

                // Verifica se data.data existe, evita erro silencioso
                if (data && Array.isArray(data.data)) {
                    setCondominios(data.data);
                } else {
                    setCondominios([]);
                    setError("Formato de resposta inesperado da API");
                }

            } catch (err) {
                setError(err.message || "Erro desconhecido");
                setCondominios([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Carregando…</p>;
    if (error) return <Erro mensagem={error} onClose={null} />;;

    return (
        <>
        <Table>
            <TableHeader
                col1="Condomínio"
                col2="Telefone e Email"
                col3="Endereço"
                col4="Síndico"
            />
            {condominios.map((condominio) => (

                <TableItem
                    key={condominio.id}
                    id={condominio.id}
                    status={condominio.status}
                    col1={condominio.nome}
                    col2={condominio.telefone +' '+ condominio.email}
                    col3={condominio.endereco}
                    col4={condominio.sindico.nome}
                    onClickEdit={ () => {
                        setCondominioSelecionado(condominio)
                        setAbrirModal(true)
                    }}
                />                
            ))}

            {mostrarModal && condominioSelecionado && (<ModalDanger 
                title='Editar condomínio'
                description={`Você solicitou editar os dados do seguinte condomínio: ${condominioSelecionado.nome}. Essa alteração pode não ser desfeita.`}
                onConfirm={ () => {
                    navigate(`/condominio/editar/${condominioSelecionado.id}`)
                    setAbrirModal(false)
                }}
                onCancel={ () => {
                    setAbrirModal(false)
                }}
            />)}   

            <TableFooter/>
        </Table>
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
        </>
        )
  
}
