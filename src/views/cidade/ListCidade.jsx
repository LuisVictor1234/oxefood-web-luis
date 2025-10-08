import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table, Segment } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCidade() {

    const [lista, setLista] = useState([]);
    const [openModalRemover, setOpenModalRemover] = useState(false);
    const [openModalDetalhe, setOpenModalDetalhe] = useState(false); 
    const [cidadeDetalhe, setCidadeDetalhe] = useState({}); 
    const [idRemover, setIdRemover] = useState();


    function formatarData(dataParam) {
        if (!dataParam) return "N/A";

        const date = new Date(dataParam + 'T00:00:00'); 
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }


    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/cidade")
            .then((response) => {
                setLista(response.data);
            })
            .catch((error) => {
                console.log("Erro ao carregar cidades.");
                console.error(error);
            });
    }


    function confirmaRemover(id) {
        setOpenModalRemover(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cidade/' + idRemover)
            .then(() => {
                console.log('Cidade removida com sucesso.');
                carregarLista();
            })
            .catch(() => {
                console.log('Erro ao remover uma cidade.');
            });
        setOpenModalRemover(false);
    }


    async function detalharCidade(id) {
        await axios.get('http://localhost:8080/api/cidade/' + id)
            .then((response) => {
                setCidadeDetalhe(response.data); 
                setOpenModalDetalhe(true);      
            })
            .catch((error) => {
                console.log('Erro ao buscar detalhes da cidade.');
                console.error(error);
                setCidadeDetalhe({});
            });
    }


    return (
        <div>
            <MenuSistema tela={'cidade'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> Cidade </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Nova'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cidade'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>Sigla Estado</Table.HeaderCell> 
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(cidade => (
                                    <Table.Row key={cidade.id}>
                                        <Table.Cell>{cidade.nome}</Table.Cell>
                                        <Table.Cell>{cidade.estado?.sigla}</Table.Cell> 
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Detalhar Cidade'
                                                icon
                                                onClick={() => detalharCidade(cidade.id)}
                                            >
                                                <Icon name='info' />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Editar'
                                                icon
                                                as={Link}
                                                to="/form-cidade" 
                                                state={{ id: cidade.id }}
                                            >
                                                <Icon name='edit' />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                icon
                                                title='Remover'
                                                onClick={() => confirmaRemover(cidade.id)}
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

            <Modal open={openModalDetalhe} onClose={() => setOpenModalDetalhe(false)} size='small'>
                <Header icon='info circle' content='Detalhamento da Cidade' />
                <Modal.Content>
                    <Segment basic>
                        <p><strong>Nome:</strong> {cidadeDetalhe.nome}</p>
                        <p><strong>UF:</strong> {cidadeDetalhe.estado?.nome} ({cidadeDetalhe.estado?.sigla})</p>
                        <p><strong>População:</strong> {cidadeDetalhe.qtdPopulacao ? cidadeDetalhe.qtdPopulacao.toLocaleString('pt-BR') : 'N/A'}</p>
                        <p><strong>Capital do estado:</strong> {cidadeDetalhe.ehCapital ? "Sim" : "Não"}</p>
                        <p><strong>Data de fundação:</strong> {formatarData(cidadeDetalhe.dataFundacao)}</p>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => setOpenModalDetalhe(false)}>
                        <Icon name='checkmark' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal basic onClose={() => setOpenModalRemover(false)} open={openModalRemover}>
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover esta cidade?</div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModalRemover(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}