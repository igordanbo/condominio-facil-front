import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './styles.css';

export default function EditarCondominio() {

      //pega o id do condominio da URL
      const { id } = useParams();

      const [condominio, setCondominio] = useState(null); 
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchData = async () => {
  
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
              fetchData();
          }
      }, [id]); // id como dependência

    // Função para lidar com mudanças nos inputs
    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setCondominio((prev) => ({
        ...prev, //recebe todos os dados do condominio
        [name]: value, //atualiza o campo específico
        }));
    };

    const [email, setEmail] = useState("");
    const [emailValido, setEmailValido] = useState(true);

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    const handleEmailChange = (e) => {
        const valor = e.target.value;
        setEmail(valor);
        setEmailValido(isEmailValid(valor));
    };


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!condominio) return <p>Nenhum dado encontrado.</p>;
  
    return (
        <div >
            <form>
                <div>
                    <label>Nome do condominio</label>
                    <input
                        type="text"
                        name="nome"
                        value={condominio.nome}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Endereço</label>
                    <input
                        type="text"
                        name="endereco"
                        value={condominio.endereco}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Telefone de contato</label>
                    <InputMask
                        mask="(99) 99999-9999"
                        name="telefone"
                        value={condominio.telefone}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input type="text" {...inputProps} />}
                    </InputMask>
                </div>

                <div>
                    <label>Email de contato</label>
                    <input
                        type="text"
                        name="email"
                        value={condominio.email}
                        onChange={handleChange}
                    />
                     <input
    type="email"
    name="email"
    value={email}
    onChange={handleEmailChange}
    style={{ borderColor: emailValido ? "black" : "red" }}
  />
  {!emailValido && <p style={{ color: "red" }}>E-mail inválido</p>}
                </div>

                <div>
                    <label>Status</label>
                    <select name="status" value={condominio.status} onChange={handleChange}>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>

                <div>
                    <label>CNPJ</label>
                    <InputMask
                        mask="99.999.999/9999-99"
                        name="cnpj"
                        value={condominio.cnpj}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input type="text" {...inputProps} />}
                    </InputMask>
                </div>

                <div>
                    <label>Cidade do condomínio</label>
                    <input
                        type="text"
                        name="cidade"
                        value={condominio.cidade}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>UF do condomínio</label>
                    <InputMask
                        mask="aa"
                        name="uf"
                        value={condominio.uf}
                        onChange={handleChange}
                    >
                        {(inputProps) => <input type="text" {...inputProps} />}
                    </InputMask>

                </div>


                <p>Responsável ID: {condominio.responsavel_id}</p>
            </form>               
          </div>
      );
}