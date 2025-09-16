import React from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto() {

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    
                    <h2>
                        <span style={{ color: 'darkgray' }}> Produto &nbsp;
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
                                    label='Título'
                                    placeholder='Informe o título do produto'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                />
                            </Form.Group>

                            <Form.TextArea
                                label='Descrição'
                                placeholder='Informe a descrição do produto'
                                style={{ minHeight: 80 }}
                            />

                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    placeholder='Informe o valor unitário'
                                    type="number"
                                    step="0.01"
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder='30'
                                    type="number"
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    type="number"
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
                                Listar
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
