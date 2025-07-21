import './styles.css';
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import TableItemEmpty from '../../components/Table/TableItemEmpty';
import TableFooter from '../../components/Table/TableFooter';
import Erro from '../../components/Mensagem/Erro';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom';


export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setError(null); 
            setLoading(true);
    
            try {
                const response = await fetch (`http://127.0.0.1:8000/api/usuarios/?page=${page}`)

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                
                const data = await response.json();

                // Verifica se data.data existe, evita erro silencioso
                if (data) {
                    setUsuarios(data.data);
                    setTotalPages(data.last_page)
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

    }, [page]);

    const handleDeleteUser = async () => {

        try{
            setError(null)

            const response = await fetch (`http://127.0.0.1:8000/api/usuarios/${usuarioSelecionado.id}`,
                {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'application/json',
                    },
                }
            )
            if(!response.ok) {
                setError(response.status)
            }

            alert('Excluido com sucesso.');
            window.location.reload();
        
        } catch(error) {
            setError(error.mensagem);
        }
    }

    if (error) return <Erro mensagem={error} onClose={null} />;

    return (
        <>
            {loading && <Loading/>}
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
                            link_view={`/usuario/${usuario.id}`}
                            onClickView={() => {
                                navigate(`/usuario/${usuario.id}`)    
                            }}
                            onClickEdit={() => {
                                navigate(`/usuario/editar/${usuario.id}`)
                            }}
                            onClickDelete={() => {
                                setMostrarModalDelete(true)
                                setUsuarioSelecionado(usuario)
                            }}
                        />
                    ))
                : <TableItemEmpty/>}

                {mostrarModalDelete && usuarioSelecionado && (<Modal 
                    corPrimaria='#dc2626'
                    corSecundaria='#fee2e2'
                    title='Excluir usuário'
                    description={`Você solicitou excluir o seguinte usuário: ${usuarioSelecionado.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
                    onConfirm={ () => {
                        handleDeleteUser()
                        setMostrarModalDelete(false)
                    }}
                    onCancel={ () => {
                        setMostrarModalDelete(false)
                    }}
                />)}   

            <TableFooter
                totalPages={totalPages}
                atualPage={page}
                onPageChange={(newPage) => {
                    setPage(newPage)
                }}
            />
            </Table>
        </>
    )
    
}