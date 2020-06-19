import { Pessoa } from './pessoa';
import { PessoaCategoria } from './pessoa-categoria';

export class Colaborador extends Pessoa {

    // categorias?: PessoaCategoria[] = [
    //     {
    //         idCategoria: 3,
    //         cdChamada: '000003',
    //         nmCategoria: 'COLABORADOR',
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
