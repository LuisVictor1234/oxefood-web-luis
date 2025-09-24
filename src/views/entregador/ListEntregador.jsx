import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar entregadores:", error);
            });
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>

                    <h2> Entregador </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(entregador => (
                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button inverted circular color='green' icon title='Editar'>
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button inverted circular color='red' icon title='Remover'>
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    );
}
