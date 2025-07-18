import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputText from '../../../components/InputText';
import InputCustomMask from '../../../components/InputCustomMask';
import InputEmail from '../../../components/InputEmail';
import SelectStatus from '../../../components/SelectStatus';
import SelectCustom from '../../../components/SelectCustom';
import './styles.css';
import Erro from '../../../components/Mensagem/Erro';



export default function EditarCondominio() {

    //pega o id do condominio da URL
    const { id } = useParams();
    const navigate = useNavigate();

    const [condominio, setCondominio] = useState(null); 
    const [usuarios, setUsuarios] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // erros técnicos
    const [validationErrors, setValidationErrors] = useState({}); // erros de campos

  
    useEffect(() => {
          const fetchCondominios = async () => {
  
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
              fetchCondominios();
          }
    }, [id]); // id como dependência

    useEffect( () => {
        const fetchUsuarios = async () => {

            setLoading(true);
            setError(null); // limpa erro anterior antes da nova requisição

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usuarios`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                setError('Erro ao atualizar o condomínio: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();

    }, []);


    // Função para lidar com mudanças nos inputs
    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setCondominio((prev) => ({
        ...prev, //recebe todos os dados do condominio
        [name]: value, //atualiza o campo específico
        }));
    };


    // Função que atualiza o banco com os novos dados
    const handleSubmit = async (evento) => {
        evento.preventDefault();
    
        setError(null);
        setValidationErrors({});
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // <- ESSENCIAL para forçar resposta JSON
                },
                body: JSON.stringify(condominio),
            });

            console.log(`Atualizando condomínio com ID ${id} e dados:`, condominio)
    
            if (!response.ok) {
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

            const newCondominio = await response.json();
            console.log('Resposta API após update:', newCondominio);
            setCondominio(newCondominio);
            
            setError(null);
            alert('Condomínio atualizado com sucesso!');
            navigate(-1);
        } catch (err) {
            if (err.name === 'TypeError') {
                setError("Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.");
            } else {
                setError(err.message || "Erro desconhecido ao atualizar");
            }
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (loading) return <p>Carregando...</p>;
    if (!condominio) return <p>Nenhum dado encontrado.</p>;
    if (!usuarios) return <p>Nenhum usuário encontrado.</p>;
  
    return (
        <div>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            <form onSubmit={handleSubmit}>
                <InputText 
                    label="Nome do condomínio"
                    type="text"
                    name="nome"
                    value={condominio.nome}
                    onChange={handleChange}
                />
                {validationErrors.nome && <Erro 
                    mensagem={validationErrors.nome[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, nome: null }))}    
                />}

                <InputText 
                    label="Endereço do condomínio"
                    type="text"
                    name="endereco"
                    value={condominio.endereco}
                    onChange={handleChange}
                />
                {validationErrors.endereco && <Erro 
                    mensagem={validationErrors.endereco[0]}
                    onClose={() => setValidationErrors((prev) => ({ ...prev, endereco: null }))}     
                />}
                
                <InputCustomMask 
                    label="Telefone de contato"
                    mask="(99) 9 9999-9999"
                    type="text"
                    name="telefone"
                    value={condominio.telefone}
                    onChange={handleChange}
                />
                {validationErrors.telefone && <Erro 
                    mensagem={validationErrors.telefone[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, telefone: null }))}
                />}

                <InputEmail
                    label="Email de contato"
                    name="email"
                    value={condominio.email}
                    onChange={handleChange}
                />
                {validationErrors.email && <Erro 
                    mensagem={validationErrors.email[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, email: null }))}
                />}



                <SelectStatus
                    label="Status do condomínio"
                    name="status"
                    value={condominio.status}
                    onChange={handleChange}
                />


                <InputCustomMask 
                    label="CNPJ"
                    mask="99.999.999/9999-99"
                    type="text"
                    name="cnpj"
                    value={condominio.cnpj}
                    onChange={handleChange}
                />
                {validationErrors.cnpj && <Erro 
                    mensagem={validationErrors.cnpj[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, cnpj: null }))}
                />}

                <InputText 
                    label="Cidade do condomínio"
                    type="text"
                    name="cidade"
                    value={condominio.cidade}
                    onChange={handleChange}
                />
                {validationErrors.cidade && <Erro
                    mensagem={validationErrors.cidade[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, cidade: null }))}
                />}
                
                <InputCustomMask 
                    label="Uf do condomínio"
                    mask="aa"
                    type="text"
                    name="uf"
                    value={condominio.uf}
                    onChange={handleChange}
                />
                {validationErrors.uf && <Erro
                    mensagem={validationErrors.uf[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, uf: null }))}
                />}

                {/*
                <label>Responsável pelo condomínio</label>
                <select value={condominio.responsavel_id}>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            #{usuario.id} {usuario.nome}
                        </option>
                    ))}
                </select>
                */}

                <SelectCustom
                    label="Responsável pelo condomínio"
                    name="responsavel_id"
                    options={usuarios}
                    value={condominio.responsavel_id}
                    onChange={handleChange}
                />
                {validationErrors.responsavel_id && <Erro 
                    mensagem={validationErrors.responsavel_id[0]}
                    onClose={() => setValidationErrors((prev) => ({ ...prev, responsavel_id: null }))}    
                />}

                <button type="submit">Atualizar</button>
            </form>               
          </div>
      );
}