import { Pessoa } from './pessoa';
import { PessoaCategoria } from './pessoa-categoria';

export class Cliente extends Pessoa {

    categorias?: PessoaCategoria[] = [];

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
    // categorias?: PessoaCategoria[] = [
    //     {
    //         idCategoria: 1,
    //         stAtivo: 'S',
    //         dtCadastro: new Date().toISOString().split('T')[0],
    //         cdChamada: '000001',
    //         nmCategoria: 'CLIENTE'
    //     }
    // ]
