import { useEffect, useState } from "react";
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import Loading from "../../components/Loading";
import TableItemEmpty from "../../components/Table/TableItemEmpty";
import TableFooter from "../../components/Table/TableFooter";
import BtnPrimary from "../../components/Btn/BtnPrimary"
import { useNavigate } from "react-router-dom";


export default function TiposManutencoes() {
    const [tipo_manutencao, setTipoManutencoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTipoManutencoes = async () => {
            setError(null)
            setLoading(true)

            try {
                const response = await fetch ('http://127.0.0.1:8000/api/tipos-manutencao'); 
                
                if (!response.ok) {
                    setError(response.status)
                }

                const data = await response.json()
                setTipoManutencoes(data)
                console.log(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchTipoManutencoes();
    }, []);

    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            {loading && <Loading />}
            <BtnPrimary
                adicionalClass="success"
                type="button"
                onClick={ () => {
                    navigate(`/tipo-manutencao/cadastrar/`)
                }}
            >
                Cadastrar
            </BtnPrimary>
            <h2>Tipos de Manutenções</h2>
            <Table>
                <TableHeader
                    col1="Nome"
                />

                { loading ? 
                    <TableItemEmpty>
                        Carregando...
                    </TableItemEmpty>
                :
                    (tipo_manutencao.map((tipo_manutencao) => ( 
                    <TableItem
                        height='sm'
                        id={tipo_manutencao.id}
                        col1={tipo_manutencao.nome}
                        link_view={`/tipo-manutencao/${tipo_manutencao.id}`}
                    />
                    )))
                }
                
            <TableFooter/>
            </Table>
        </div>
    );
}
