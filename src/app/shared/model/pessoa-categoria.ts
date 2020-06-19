export class PessoaCategoria {

    idCategoria?: number;
    stAtivo?: string;
    dtCadastro?: string;

    cdChamada?: string;
    nmCategoria?: string;

    constructor(stAtivo?: string, dtCadastro?: string, idCategoria?: number, cdChamada?: string, nmCategoria?: string) {
        this.idCategoria = idCategoria;
        this.nmCategoria = nmCategoria;
        this.cdChamada = cdChamada;
        this.stAtivo = stAtivo;
        this.dtCadastro = dtCadastro;
    }
}
