import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalDanger from "../../components/Modal/ModalDanger";


export default function Usuario () {

    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [modalAberto, setModalAberto] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}`);
                
                if (!response.ok) {
                    setError(`Erro HTTP: ${response.status}`)
                }   

                const data = await response.json();
                setUsuario(data)
            } catch(error) {
                setError(error.mensage)
            } finally {
                setLoading(false);
            }
        }

        if(id){
            fetchUsuarios()
        }
    }, [id])

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!usuario) return <p>Nenhum dado encontrado.</p>;

    console.log(usuario)

    return (
        <div>
            <button onClick={() => {
                setModalAberto(true)
            }}>
                Editar
            </button>

            {modalAberto && <ModalDanger
                title="Editar usuário"
                description={`Tem certeza que deseja editar os dados do usuário ${usuario.nome}? Essa alteração pode não ser desfeita.`}
                onConfirm={ () => {
                    navigate(`/usuario/editar/${usuario.id}`)
                    setModalAberto(false) 
                    }
                }
                onCancel={ () => {
                    setModalAberto(false)}
                }
            />}

            <div>
                id: {usuario.id}
            </div>
            <div>
                Nome: {usuario.nome}
            </div>
            <div>
                tipo: {usuario.tipo}
            </div>
            <div>
                email: {usuario.email}
            </div>
            <div>
                cpf: {usuario.cpf}
            </div>
            <div>
                idade: {usuario.idade}
            </div>
            <div>
                obs: {usuario.observacao}
            </div>
            <div>
                Sindico do condominio: {usuario.condominios_sindico[0].nome}
            </div>
    
        </div>
    )
} 
