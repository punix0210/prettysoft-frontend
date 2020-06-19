import { Empresa } from './empresa';
import { Pessoa } from './pessoa';

export class Usuario {

    idUsuario: number;
    nmUsuario: string;
    nmLogin: string;
    cdSenha: string;
    stAtivo: boolean;
    empresas: Empresa[] = [];
    pessoa: Pessoa;
    dtCadastro: string;

    constructor(
        idUsuario: number,
        nmUsuario: string,
        nmLogin: string,
        cdSenha: string,
        stAtivo: boolean,
        pessoa: Pessoa,
        dtCadastro: string
    ) {
        this.idUsuario = idUsuario;
        this.nmUsuario = nmUsuario;
        this.nmLogin = nmLogin;
        this.cdSenha = cdSenha;
        this.stAtivo = stAtivo;
        this.pessoa = pessoa;
        this.dtCadastro = dtCadastro;
    }
}
