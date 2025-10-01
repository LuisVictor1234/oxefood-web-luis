import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

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

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete("http://localhost:8080/api/entregador/" + idRemover)
            .then(() => {
                console.log("Entregador removido com sucesso!");
                carregarLista();
            })
            .catch((error) => {
                console.error("Erro ao remover entregador:", error);
            });
        setOpenModal(false);
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
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Editar'
                                                as={Link}
                                                to='/form-entregador'
                                                state={{ id: entregador.id }}
                                            >
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                icon
                                                title='Remover'
                                                onClick={() => confirmaRemover(entregador.id)}
                                            >
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
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>
                        Tem certeza que deseja remover esse registro?
                    </div>
                </Header>

                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={remover}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
