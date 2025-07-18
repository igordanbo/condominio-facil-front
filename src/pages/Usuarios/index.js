import './styles.css';
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import TableItemEmpty from '../../components/Table/TableItemEmpty';
import TableFooter from '../../components/Table/TableFooter';
import Erro from '../../components/Mensagem/Erro';
import ModalDanger from '../../components/Modal/ModalDanger';

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setError(null); 
            setLoading(true);
    
            try {
                const response = await fetch ('http://127.0.0.1:8000/api/usuarios')

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                
                const data = await response.json();

                
                console.log(data);

                // Verifica se data.data existe, evita erro silencioso
                if (data) {
                    setUsuarios(data);
                } else {
                    setError("Formato de resposta inesperado da API");
                }
    
            } catch (error) {
                setError(error.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();

    }, [])

    if (loading) return <p>Carregando…</p>;
    if (error) return <Erro mensagem={error} onClose={null} />;

    return (
        
        <Table>
            <TableHeader
                col1="Nome"
                col2="CPF"
                col3="E-mail"
                col4="Observações"
            />

            {usuarios.length > 0 ? 
                usuarios.map((usuario) => (
                    <TableItem
                        key={usuario.id}
                        id={usuario.id}
                        status={usuario.status}
                        col1={usuario.nome}
                        col2={usuario.cpf}
                        col3={usuario.email}
                        col4={usuario.observacao}
                        tipo={usuario.tipo}
                        onClickEdit={() => {
                            setMostrarModal(true)
                        }}
                    />
                ))
            : <TableItemEmpty/>}

            {mostrarModal && (
                <ModalDanger
                    title="Você tem certeza?"
                    description="Esta ação não pode ser desfeita."
                    onConfirm={() => {
                        // Lógica de confirmação
                        console.log("Confirmado!");
                        setMostrarModal(false);
                    }}
                    onCancel={() => {
                        setMostrarModal(false)
                    }}
                />
            )}
     
        </Table>
    )
    
}