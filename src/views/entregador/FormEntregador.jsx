import React from "react";
import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon, Select } from 'semantic-ui-react';

export default function FormEntregador() {

    const opcoesUF = [
        { key: 'PE', value: 'PE', text: 'PE' },
        { key: 'SP', value: 'SP', text: 'SP' },
        { key: 'RJ', value: 'RJ', text: 'RJ' },
        { key: 'MG', value: 'MG', text: 'MG' },
        // adicione os estados que precisar
    ];

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
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    placeholder='Informe o RG'
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'>
                                    <InputMask
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/1985"
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'>
                                    <InputMask mask="(99) 99999-9999" />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'>
                                    <InputMask mask="(99) 9999-9999" />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                />

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    type="number"
                                    step="0.01"
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    placeholder='Informe o nome da rua'
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'>
                                    <InputMask mask="99999-999" />
                                </Form.Input>

                                <Form.Field
                                    control={Select}
                                    label='UF'
                                    options={opcoesUF}
                                    placeholder='Selecione'
                                />
                            </Form.Group>

                            <Form.Input
                                fluid
                                label='Complemento'
                                placeholder='Informe o complemento'
                            />

                            <Form.Group inline>
                                <label>Ativo:</label>
                                <Form.Radio
                                    label='Sim'
                                    value='sim'
                                    name='ativo'
                                />
                                <Form.Radio
                                    label='Não'
                                    value='nao'
                                    name='ativo'
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
