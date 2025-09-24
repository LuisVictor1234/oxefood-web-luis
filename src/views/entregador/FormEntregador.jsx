import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useState } from "react";
import { Button, Container, Divider, Form, Icon, Select } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

export default function FormEntregador() {

    const navigate = useNavigate();

    const opcoesUF = [
        { key: 'PE', value: 'PE', text: 'PE' },
        { key: 'SP', value: 'SP', text: 'SP' },
        { key: 'RJ', value: 'RJ', text: 'RJ' },
        { key: 'MG', value: 'MG', text: 'MG' },
    ];

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [foneCelular, setFoneCelular] = useState("");
    const [foneFixo, setFoneFixo] = useState("");
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
    const [valorFrete, setValorFrete] = useState("");
    const [enderecoRua, setEnderecoRua] = useState("");
    const [enderecoNumero, setEnderecoNumero] = useState("");
    const [enderecoBairro, setEnderecoBairro] = useState("");
    const [enderecoCidade, setEnderecoCidade] = useState("");
    const [enderecoCep, setEnderecoCep] = useState("");
    const [enderecoUf, setEnderecoUf] = useState("");
    const [enderecoComplemento, setEnderecoComplemento] = useState("");
    const [ativo, setAtivo] = useState(true);

    function salvar() {
        const entregadorRequest = {
            nome,
            cpf,
            rg,
            dataNascimento,
            foneCelular,
            foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas ? parseInt(qtdEntregasRealizadas) : null,
            valorFrete: valorFrete ? parseFloat(valorFrete) : null,
            enderecoRua,
            enderecoNumero,
            enderecoBairro,
            enderecoCidade,
            enderecoCep,
            enderecoUf,
            enderecoComplemento,
            ativo
        };

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log("Entregador cadastrado com sucesso!");
                navigate("/list-entregador");
            })
            .catch((error) => {
                console.error("Erro ao cadastrar entregador:", error);
            });
    }

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    <h2>
                        <span style={{ color: 'darkgray' }}> Entregador &nbsp;
                            <Icon name='angle double right' size="small" />
                        </span>
                        Cadastro
                    </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    placeholder='Informe o nome'
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input required fluid label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    placeholder='Informe o RG'
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input fluid label='DT Nascimento'>
                                    <InputMask
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input required fluid label='Fone Celular'>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input fluid label='Fone Fixo'>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    type="number"
                                    step="0.01"
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    placeholder='Informe o nome da rua'
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />

                                <Form.Input fluid label='CEP'>
                                    <InputMask
                                        mask="99999-999"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Field
                                    control={Select}
                                    label='UF'
                                    options={opcoesUF}
                                    placeholder='Selecione'
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                />
                            </Form.Group>

                            <Form.Input
                                fluid
                                label='Complemento'
                                placeholder='Informe o complemento'
                                value={enderecoComplemento}
                                onChange={e => setEnderecoComplemento(e.target.value)}
                            />

                            <Form.Group inline>
                                <label>Ativo:</label>
                                <Form.Radio
                                    label='Sim'
                                    checked={ativo === true}
                                    onChange={() => setAtivo(true)}
                                />
                                <Form.Radio
                                    label='Não'
                                    checked={ativo === false}
                                    onChange={() => setAtivo(false)}
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
                                onClick={() => navigate("/list-entregador")}
                            >
                                <Icon name='reply' />
                                Voltar
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
