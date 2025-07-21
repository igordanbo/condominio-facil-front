import { useEffect, useState } from 'react'
import './styles.css'
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import TableItemEmpty from '../../components/Table/TableItemEmpty';
import TableFooter from '../../components/Table/TableFooter';
import { useNavigate } from 'react-router-dom';
import Success from '../../components/Modal/Success';

export default function Manutencoes () {
    
    const [manutencoes, setManutencoes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mostrarModalDelete, setMostrarModalDelet] = useState(false);
    const [mostrarModalSuccess, setMostrarModalSuccess] = useState(false);
    const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null)
    const navigate = useNavigate();

    useEffect( () => {
        const fetchManutencoes = async () => {

            try{
                setError(null)
                setLoading(true)

                const response = await fetch ('http://127.0.0.1:8000/api/manutencaos');

                if ( !response.ok ) {
                    throw new Error(`Erro ${response.status}`);
                }

                const data = await response.json();
                setManutencoes(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }

        }

        fetchManutencoes();
    }, [])

const handleDelete = async (id) => {
    try {
        setError(null);
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:8000/api/manutencaos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            try {
                const data = await response.json();
                if (data?.message) errorMessage = data.message;
            } catch (_) {}

            throw new Error(errorMessage);
        }

        console.log('Deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar:', error);
        setError(error.message); 
    } finally {
        setLoading(false);
    }
};

    return (
        <div>
            {error && <p>Erro ao carregar: {error.message || error}</p>}
            {!loading && manutencoes.length === 0 && <p>Nada encontrado aqui...</p>}
            {loading ? <Loading/> : ''}

            <Table>
                <TableHeader
                    col1='Tipo da manutenção'
                    col2='Condomínio/Bloco/Ap'
                    col3='Agendado para'
                    col4='Status'
                />

                {loading ?
                    <TableItemEmpty>
                        Carregando...
                    </TableItemEmpty>
                    
                    :

                    (manutencoes.map( (manutencao) => (
                        <TableItem
                            key={manutencao.id}
                            id={manutencao.id}
                            link_view={`/manutencao/${manutencao.id}`}
                            status={manutencao.status}
                            col1={manutencao.tipo.nome}
                            col2={
                                <>
                                    {manutencao.condominio?.nome} <br />
                                    {manutencao.bloco?.nome && (
                                        <>
                                        Bloco: {manutencao.bloco.nome} <br />
                                        </>
                                    )}
                                    {manutencao.apartamento?.numero && (
                                        <>Apto: {manutencao.apartamento.numero}</>
                                    )}
                                </>
                            }
                            col3={manutencao.data_agendada}
                            col4={
                                <>
                                <span className={`col-status col-status-${manutencao.status}`}>{manutencao.status}</span>
                                </>
                            }
                            onClickView={ () => {
                                    navigate(`/manutencao/${manutencao.id}`)
                                }
                            }
                            onClickEdit={ () => {
                                    navigate(`/manutencao/editar/${manutencao.id}`)
                                }
                            }
                            onClickDelete={ () => {
                                    setMostrarModalDelet(true);
                                    setManutencaoSelecionada(manutencao);
                                }
                            }
                        />
                    )))
                }
                <TableFooter/>
            </Table>

            {mostrarModalDelete ? (
                <Modal
                    type='danger'
                    title='Deletar manutenção'
                    description={`Tem certeza que deseja deletar a manutenção ${manutencaoSelecionada.tipo.nome} do dia ${manutencaoSelecionada.data_agendada} no ${manutencaoSelecionada.condominio.nome}?`}
                    onConfirm={ () => {
                            handleDelete(manutencaoSelecionada.id);
                            setMostrarModalDelet(false);
                            setMostrarModalSuccess(true);
                        }
                    }
                    onCancel={ () => {
                        setMostrarModalDelet(false); 
                    }}
                />
            ) : '' }

            {mostrarModalSuccess ? (
                <Success
                    type='success'
                    title='Sucesso'
                    description='Sua solicitação foi atendida com sucesso.'
                    onConfirm={ () => {
                        setMostrarModalDelet(false);
                        window.location.reload();
                    }
                }
                />
            ) : '' }

        </div>
    )
}