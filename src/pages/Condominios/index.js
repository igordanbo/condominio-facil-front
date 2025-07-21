import { useEffect, useState } from "react";
import Table from "../../components/Table";
import TableHeader from "../../components/Table/TableHeader";
import TableItem from "../../components/Table/TableItem";
import TableItemEmpty from "../../components/Table/TableItemEmpty"
import TableFooter from "../../components/Table/TableFooter";
import Erro from "../../components/Mensagem/Erro";
import Modal from "../../components/Modal";
import Filtros from "../../components/Filtros";
import Loading from "../../components/Loading"
import SelectCustom from "../../components/SelectCustom";
import InputSearch from "../../components/InputSearch";
import BtnPrimary from "../../components/Btn/BtnPrimary"
import BtnSecundary from "../../components/Btn/BtnSecundary";
import { useNavigate } from "react-router-dom";
import './styles.css';

export default function Condominios() {
    
    const [condominios, setCondominios] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
    const [condominioSelecionado, setCondominioSelecionado] = useState(null);
    const [totalPages, setTotalPages] = useState(null)
    const [page, setPage] = useState(1);
    const [nome, setNome] = useState('');
    const [debouncedNome, setDebouncedNome] = useState(nome);
    const [status, setStatus] = useState('');
    const [sort_by, setOrderBy] = useState('');
    const [sort_order, setSortOrder] = useState();
    let navigate = useNavigate();

    useEffect( () => {

        const handler = setTimeout(() => {
            setDebouncedNome(nome);
        }, 700);

        return () => {
            clearTimeout(handler); 
        };

    }, [nome]);


 
    // requisição feita assim que o componente montar
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // limpa erro anterior
            const startTime = Date.now();

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/condominios/?page=${page}&status=${status}&nome=${debouncedNome}&sort_by=${sort_by}&sort_order=${sort_order}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();
                setTotalPages(data.last_page); 

                if (data && Array.isArray(data.data)) {
                    setCondominios(data.data);
                } else {
                    setCondominios([]);
                    setError("Formato de resposta inesperado da API");
                }

            } catch (err) {
                setError(err.message || "Erro desconhecido");
                setCondominios([]);
            }  finally {
                const elapsed = Date.now() - startTime;
                const delay = 2800; // 2.18 segundos de loader
                const remaining = delay - elapsed;

                if (remaining > 0) {
                    setTimeout(() => setLoading(false), remaining);
                } else {
                    setLoading(false);
                }
        }
        };

        fetchData();
    }, [page, status, debouncedNome, sort_by, sort_order]);

    return (
        <>

        {error && <Erro mensagem={error} onClose={null} />}
        {loading && <Loading />}

        <div className="navTools">
            <BtnSecundary
                onClick={ () => {
                    navigate('/')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </BtnSecundary>
            <BtnPrimary
                onClick={ () => {
                    navigate('/condominio/cadastrar')
                }}
            >
                Cadastrar
            </BtnPrimary>
        </div>

        <h2>Listagem de Condomínios</h2>

        <Filtros>
  
            <SelectCustom
                label='Filtre por status'
                value={status} 
                onChange={(event) => {
                setStatus(event.target.value)
            }}>
                <option value=''>Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </SelectCustom>

            <div className="info-status-div">
                <div>
                     <div className="ativo"></div>
                     Ativo
                </div>
                <div>
                     <div className="inativo"></div>
                     Inativo
                </div>
            </div>

            <InputSearch
                label='Pesquise por condomínios'
                value={nome} 
                placeholder='Buscar condomínio...' 
                onChange={ (event) => {
                setNome(event.target.value)
            }}>
            </InputSearch>
            
            
        </Filtros>
        
        <Table>
            <TableHeader
                col1="Condomínio"
                sort1={true}
                onClickSort1={ () => {
                    setOrderBy('nome');
                    setSortOrder(sort_order === 'asc' ? 'desc' : 'asc');
                }}

                col2="Telefone e Email"
                sort2={false}

                col3="Endereço"
                sort3={false}

                col4="Síndico"
                sort4={false}
            />
            {condominios.length > 0 ? (condominios.map((condominio) => (
                <TableItem
                    key={condominio.id}
                    id={condominio.id}
                    status={condominio.status}
                    col1={condominio.nome}
                    col2={condominio.telefone +' '+ condominio.email}
                    col3={condominio.endereco}
                    col4={condominio.sindico.nome}
                    link_view={`/condominio/${condominio.id}`}
                    onClickView={ () => {
                        navigate(`/condominio/${condominio.id}`)
                    }}
                    onClickEdit={ () => {
                        navigate(`/condominio/editar/${condominio.id}`)
                    }}
                    onClickDelete={ () => {
                        setCondominioSelecionado(condominio)
                        setAbrirModalDelete(true)
                    }}
                />                
            ))) : <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
           } 

            {mostrarModalDelete && condominioSelecionado && (<Modal 
                type='danger'
                title='Excluir condomínio'
                description={`Você solicitou excluir o seguinte condomínio: ${condominioSelecionado.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
                onConfirm={ () => {
                    navigate(`/condominio/editar/${condominioSelecionado.id}`)
                    setAbrirModalDelete(false)
                }}
                onCancel={ () => {
                    setAbrirModalDelete(false)
                }}
            />)}   

            <TableFooter
                totalPages={totalPages}
                atualPage={page}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </Table>
        </>
        )
  
}
