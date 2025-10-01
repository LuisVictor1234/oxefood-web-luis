import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { useLocation, useNavigate } from "react-router-dom";
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    const navigate = useNavigate();
    const { state } = useLocation();

    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorUnitario, setValorUnitario] = useState("");
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState("");
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState("");

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    const dados = response.data;
                    setIdProduto(dados.id);
                    setTitulo(dados.titulo);
                    setCodigo(dados.codigo);
                    setDescricao(dados.descricao);
                    setValorUnitario(dados.valorUnitario);
                    setTempoEntregaMinimo(dados.tempoEntregaMinimo);
                    setTempoEntregaMaximo(dados.tempoEntregaMaximo);
                })
                .catch((error) => {
                    console.error("Erro ao carregar produto:", error);
                });
        }
    }, [state]);

    function salvar() {
        const produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario ? parseFloat(valorUnitario) : null,
            tempoEntregaMinimo: tempoEntregaMinimo ? parseInt(tempoEntregaMinimo) : null,
            tempoEntregaMaximo: tempoEntregaMaximo ? parseInt(tempoEntregaMaximo) : null
        };

        if (idProduto != null) {
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then(() => {
                    console.log("Produto alterado com sucesso!");
                    navigate("/list-produto");
                })
                .catch((error) => {
                    console.error("Erro ao alterar produto:", error);
                });
        } else {
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then(() => {
                    console.log("Produto cadastrado com sucesso!");
                    navigate("/list-produto");
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar produto:", error);
                });
        }
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    {idProduto === undefined ? (
                        <h2>
                            <span style={{ color: 'darkgray' }}> Produto &nbsp;
                                <Icon name='angle double right' size="small" />
                            </span>
                            Cadastro
                        </h2>
                    ) : (
                        <h2>
                            <span style={{ color: 'darkgray' }}> Produto &nbsp;
                                <Icon name='angle double right' size="small" />
                            </span>
                            Alteração
                        </h2>
                    )}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    placeholder='Informe o título do produto'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </Form.Group>

                            <Form.TextArea
                                label='Descrição'
                                placeholder='Informe a descrição do produto'
                                style={{ minHeight: 80 }}
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />

                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    placeholder='Informe o valor unitário'
                                    type="number"
                                    step="0.01"
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder='30'
                                    type="number"
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    type="number"
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                                />
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => navigate("/list-produto")}
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>

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
