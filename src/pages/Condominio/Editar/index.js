import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputText from '../../../components/InputText';
import InputCustomMask from '../../../components/InputCustomMask';
import InputEmail from '../../../components/InputEmail';
import SelectBool from '../../../components/SelectBool';
import SelectCustom from '../../../components/SelectCustom';
import './styles.css';
import Erro from '../../../components/Mensagem/Erro';


export default function EditarCondominio() {

    //pega o id do condominio da URL
    const { id } = useParams();

    const [condominio, setCondominio] = useState(null); 
    const [usuarios, setUsuarios] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [erroValidacao, setErroValidacao] = useState('');
  
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
                setErroValidacao('Erro ao atualizar o condomínio: ' + error.message);
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


    // Função que atualiza o banco com os novos
    const  handleSubmit = async (evento) => {
        evento.preventDefault();

        if (!condominio.nome || condominio.nome.length < 3) {
            setErroValidacao('Nome do condomínio é obrigatório e deve ter pelo menos 3 caracteres.');
            return;
          }
        
          setErroValidacao('');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(condominio), // Envia os dados do condomínio atualizados
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}`);
            }

            const newCondominio = await response.json();

            setCondominio(newCondominio); // Atualiza o estado com os dados do condomínio atualizado

            alert('Condomínio atualizado com sucesso!');

        } catch (error) {
            setError(error.message || "Erro desconhecido ao atualizar o condomínio");
            alert('Erro ao atualizar.');
            return;
        }
    }

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!condominio) return <p>Nenhum dado encontrado.</p>;
    if (!usuarios) return <p>Nenhum usuário encontrado.</p>;
  
    return (
        <div>
           {erroValidacao && <Erro mensagem={erroValidacao} />}
            <form onSubmit={handleSubmit}>
                <InputText 
                    label="Nome do condomínio"
                    type="text"
                    name="nome"
                    value={condominio.nome}
                    onChange={handleChange}
                />

                <InputText 
                    label="Endereço do condomínio"
                    type="text"
                    name="endereco"
                    value={condominio.endereco}
                    onChange={handleChange}
                />
                
                <InputCustomMask 
                    label="Telefone de contato"
                    mask="(99) 9 9999-9999"
                    type="text"
                    name="telefone"
                    value={condominio.telefone}
                    onChange={handleChange}
                />

                <InputEmail
                    label="Email de contato"
                    name="email"
                    value={condominio.email}
                    onChange={handleChange}
                />

                <SelectBool 
                    label="Status"

                    value1="ativo"
                    option1="Ativo"
                    cor1="green"
                    
                    value2="inativo"
                    option2="Inativo"
                    cor2="red"
                    
                    name="status"
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

                <InputText 
                    label="Cidade do condomínio"
                    type="text"
                    name="cidade"
                    value={condominio.cidade}
                    onChange={handleChange}
                />
                
                <InputCustomMask 
                    label="Uf do condomínio"
                    mask="aa"
                    type="text"
                    name="uf"
                    value={condominio.uf}
                    onChange={handleChange}
                />

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

                <button type="submit" className="btn btn-primary">Atualizar</button>
            </form>               
          </div>
      );
}