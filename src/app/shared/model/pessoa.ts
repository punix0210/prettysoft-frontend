export class Pessoa {
    idPessoa?: number;
    cdChamada?: string;
    nmPessoa?: string;
    nmCurto?: string;
    telefone?: string;
    celular?: string;
    email?: string;
    cpfCnpj?: string;
    tpPessoa?: string;

    constructor(
        idPessoa?: number,
        cdChamada?: string,
        nmPessoa?: string,
        nmCurto?: string,
        telefone?: string,
        celular?: string,
        email?: string,
        cpfCnpj?: string,
        tpPessoa?: string
    ) {
        this.idPessoa = idPessoa;
        this.cdChamada = cdChamada;
        this.nmPessoa = nmPessoa;
        this.nmCurto = nmCurto;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.cpfCnpj = cpfCnpj;
        this.tpPessoa = tpPessoa;

    }
}
