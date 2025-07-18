import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import InputText from "../../../components/InputText"
import Erro from "../../../components/Mensagem/Erro"

export default function EditarUsuario () {
    
    const [ usuario, setUsuario ] = useState(null )
    const [ error, setError ] = useState( null )
    const [ loading, setLoading] = useState( null )
    const [ validationErrors, setValidationErrors ] = useState( null )
    const { id } = useParams()

    useEffect( () => {

        const fetchUsuario = async () => {
            setError( null )
            setLoading( false )
    
            try {
                const response = await fetch( `http://127.0.0.1:8000/api/usuarios/${id}` )

                if( !response.ok ) {
                    setError( response.status )
                }

                const data = await response.json()
                setUsuario(data)
    
            } catch( error ) {
                setError( error )
            } finally {
                setLoading(false)
            }
        }
        
    if ( id ) {
        fetchUsuario()
    }

    }, [id])

    const handleChange = (evento) => {
        const { name, value } = evento.target;

        setUsuario( ( prev ) => ({
            ...prev,
            [name]: value,
        }))

        console.log(usuario)
    }
    
    const handleSubmit = async (evento) => {
        evento.preventDefault();

        setLoading(true)
        setError(null)

        try {
            const response = await fetch ( `http://127.0.0.1:8000/api/usuarios/${ id }`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(usuario),
                }
            )

            if ( !response.ok ) {
                if (response.status === 422) {
                    try {
                        const data = await response.json(); // pode falhar se não for JSON
                        setValidationErrors(data.errors || {});
                    } catch (e) {
                        setError("Erro de validação, mas não foi possível interpretar a resposta.");
                    }
                    return;
                }
    
                throw new Error(`Erro HTTP ${response.status}`);
            }

            const newUsuario = await response.json()
            setUsuario(newUsuario)
        } catch( error ) {
            setError ( error ) 
        } finally { 
            setLoading(false) 
        }
    } 


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!usuario) return <p>Nenhum dado encontrado.</p>;


    return (
        <div>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <form onSubmit={handleSubmit}>

                <div>
                    <InputText 
                        label="Nome"
                        type="text"
                        name="nome"
                        value={usuario.nome}
                        onChange={handleChange}
                    />
                    {console.log(validationErrors)}
        
                    
                </div>
             <button type="submit">enviar</button>
            </form>
        </div>
    )
}