import { Route, Routes } from "react-router-dom";
import FormCidade from './views/cidade/FormCidade';
import ListCidade from './views/cidade/ListCidade';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/list-cidade" element={<ListCidade />} />
                <Route path="list-produto" element={<ListProduto/>} />
                <Route path="list-entregador" element={<ListEntregador/>} />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="/form-cidade" element={<FormCidade />} />
            </Routes>
        </>
    )
}

export default Rotas
