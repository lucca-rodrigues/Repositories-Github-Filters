import React, {useState, useEffect, useCallback} from 'react';
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';

import {Link} from 'react-router-dom';
import {Container, Title, Form, List, SubmitButton, DeleteButton} from './styles';

import api from '../../services/api';

function Home() {

  // Pega o valor do Input
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);


  // Buscar dados LocalStorage
  useEffect(()=>{
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);



  // Salvar alterações
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  //Reponsável pelo envio do formulário
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    
    async function submit(){
      setLoading(true); // Habilita o Loading
      setAlerta(null);

      try{

        // Verifica se o Campo foi enviado Vazio!
        if(newRepo === ''){
          alert('Você precisa indicar um repositório!');
          throw new Error('Digite um repositório');
        }
          // API GET
        const response = await api.get(`repos/${newRepo}`);

        // Verifica se o nome do repositório digitado ja existe na lista
        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if(hasRepo){
          console.log('Este Repositório já existe na lista!');
          throw new Error('repositório Duplicado');
        } 

        // Desconstrução do Array, torna possível pegar outros valores depoi
        const data = {
          name: response.data.full_name,
        }
        setRepositorios([...repositorios, data]);
        setNewRepo('');

        //console.log('carregado com sucesso!')
        
        // console.log(newRepo); // Retorna o Valor digitado no Input
        // console.log(response.data); // Retorna um Array com a resposta do elemento Digital
        }catch(error){
          setAlerta(true);
          console.log(error);
        }finally{
          setLoading(false);
        }
    }
    submit();

  },[newRepo, repositorios]);

  // Salva o valor Digitado no Input
  function handleInputChange(e){
    setNewRepo(e.target.value);
    setAlerta(null);
  }

  // Faz um filtro de todos os elementos existentes e remove apenas o item clicado
  const handleDelete = useCallback((repo)=>{
    const find = repositorios.filter(r => r.name !== repo);

    setRepositorios(find);

  }, [repositorios]);

  return (
    <Container>
      <Title>
        <h1><FaGithub size={25}/>Meus Repositórios</h1>
      </Title>

      <Form onSubmit={handleSubmit} error={alerta}>
        <div>
          <input 
            type="text" 
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={handleInputChange}
            />
          <SubmitButton Loading={loading ? 1 : 0}>
            {loading ? 
              (<FaSpinner />)
              : 
              (<FaPlus />)
            }
          </SubmitButton>
        </div>
      </Form>
      <List>
        {repositorios.map(repo =>(
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash />
              </DeleteButton>
              {repo.name}
            </span>
            {/* utilizado para setar url com / no meio */}
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars /></Link>
          </li>
        ))}
      </List>
    </Container>
  )
}

export default Home;