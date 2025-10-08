import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Select, Checkbox, Message } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema'; 

const ESTADOS_MOCK = [
    { key: 1, value: 1, text: 'Pernambuco (PE)' }, 
    { key: 2, value: 2, text: 'São Paulo (SP)' }, 
    { key: 3, value: 3, text: 'Rio de Janeiro (RJ)' }, 
    { key: 4, value: 4, text: 'Minas Gerais (MG)' }, 
    { key: 5, value: 5, text: 'Bahia (BA)' }, 
    { key: 6, value: 6, text: 'Ceará (CE)' }, 
    { key: 7, value: 7, text: 'Rio Grande do Sul (RS)' },
];


export default function FormCidade() {

    const { state } = useLocation();
    const [idCidade, setIdCidade] = useState();

    const [nome, setNome] = useState("");
    const [idEstado, setIdEstado] = useState(""); 
    const [qtdPopulacao, setQtdPopulacao] = useState("");
    const [ehCapital, setEhCapital] = useState(false);
    const [dataFundacao, setDataFundacao] = useState("");

    const [listaEstados, setListaEstados] = useState([]); 
    const [erroAPI, setErroAPI] = useState(null);
    const [sucesso, setSucesso] = useState(false); 

    useEffect(() => {

        setListaEstados(ESTADOS_MOCK);

    }, []); 


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cidade/" + state.id)
                .then((response) => {
                    setIdCidade(response.data.id);
                    setNome(response.data.nome);
                    setQtdPopulacao(response.data.qtdPopulacao);
                    setEhCapital(response.data.ehCapital);
                    setDataFundacao(response.data.dataFundacao || ""); 
                    setIdEstado(response.data.estado?.id || ""); 
                })
                .catch(() => {
                    console.log("Erro ao buscar cidade para edição.");
                });
        }
    }, [state]);

    function salvar() {
        setErroAPI(null); 
        setSucesso(false);

        let cidadeRequest = {
            nome,
            estado: { id: idEstado }, 
            qtdPopulacao: qtdPopulacao ? parseInt(qtdPopulacao) : null,
            ehCapital,
            dataFundacao
        };

        if (idCidade != null) {
            axios.put("http://localhost:8080/api/cidade/" + idCidade, cidadeRequest)
                .then(() => {
                    setSucesso(true);
                })
                .catch((error) => {
                    console.error("Erro ao alterar cidade:", error.response);
                    setErroAPI(error.response?.data?.message || "Erro de comunicação com a API ao alterar.");
                });
        } else {
            axios.post("http://localhost:8080/api/cidade", cidadeRequest)
                .then(() => {
                    setSucesso(true);
                    setNome("");
                    setIdEstado("");
                    setQtdPopulacao("");
                    setEhCapital(false);
                    setDataFundacao("");
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar cidade:", error.response);
                    setErroAPI(error.response?.data?.message || "Erro de comunicação com a API ao cadastrar.");
                });
        }
    }

    return (
        <div>
            <MenuSistema tela={'cidade'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    {idCidade === undefined ?
                        <h2><span style={{ color: 'darkgray' }}>Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                        :
                        <h2><span style={{ color: 'darkgray' }}>Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    {erroAPI && (
                        <Message
                            negative
                            header='Erro ao Salvar'
                            content={erroAPI}
                        />
                    )}
                    
                    {sucesso && !erroAPI && (
                         <Message
                            positive
                            header='Sucesso'
                            content={`Cidade ${idCidade ? 'alterada' : 'cadastrada'} com sucesso!`}
                        />
                    )}

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    placeholder='Informe o nome da cidade'
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Field
                                    required
                                    control={Select}
                                    label='Estado'
                                    options={listaEstados} 
                                    placeholder='Selecione um estado'
                                    value={idEstado}
                                    onChange={(e, { value }) => setIdEstado(value)} 
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='População'
                                    placeholder='Informe a quantidade de habitantes'
                                    type='number'
                                    value={qtdPopulacao}
                                    onChange={e => setQtdPopulacao(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Data de Fundação'
                                    type='date'
                                    value={dataFundacao}
                                    onChange={e => setDataFundacao(e.target.value)}
                                />

                                <Form.Field
                                    control={Checkbox}
                                    label='É capital?'
                                    checked={ehCapital}
                                    onChange={(e, { checked }) => setEhCapital(checked)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-cidade'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvar}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}