import { Route, Routes } from "react-router-dom";
import ListProduto from './views/produto/ListProduto';
import ListEntregador from './views/entregador/ListEntregador';
import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import ListCliente from './views/cliente/ListCliente';
import FormProduto from './views/produto/FormProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="list-produto" element={<ListProduto/>} />
                <Route path="list-entregador" element={<ListEntregador/>} />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
            </Routes>
        </>
    )
}

export default Rotas
