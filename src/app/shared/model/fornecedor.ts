import { Pessoa } from './pessoa';
import { PessoaCategoria } from './pessoa-categoria';

export class Fornecedor extends Pessoa {

    // categorias?: PessoaCategoria[] = [
    //     {
    //         idCategoria: 2,
    //         cdChamada: '000002',
    //         nmCategoria: 'FORNECEDOR',
    //         dtCadastro: new Date().toISOString().split('T')[0],
    //         stAtivo: 'S'
    //     }
    // ];
    categorias?: PessoaCategoria[];

    constructor(
        idPessoa?: number,
        cdChamada?: string,
        nmPessoa?: string,
        nmCurto?: string,
        telefone?: string,
        celular?: string,
        email?: string,
        cpfCnpj?: string,
        tpPessoa?: string,
        categorias?: Array<PessoaCategoria>

    ) {
        super(idPessoa, cdChamada, nmPessoa, nmCurto, telefone, celular, email, cpfCnpj, tpPessoa);
        this.categorias = categorias;
    }
}
