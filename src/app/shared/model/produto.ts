import { Empresa } from './empresa';

export class Produto {

    idProduto?: number;
    cdChamada?: string;
    nmProduto?: string;
    nmProdutoCurto?: string;
    stAtivo?: boolean;
    tpServico?: string;
    vlPreco?: number;
    vlCusto?: number;
    alRepasse?: number;
    empresas?: Empresa[];
    tempo?: number;

    constructor(
        idProduto?: number,
        cdChamada?: string,
        nmProduto?: string,
        nmProdutoCurto?: string,
        stAtivo?: boolean,
        tpServico?: string,
        vlPreco?: number,
        vlCusto?: number,
        alRepasse?: number,
        empresas?: Empresa[],
        tempo?: number
    ) {
        this.idProduto = idProduto;
        this.cdChamada = cdChamada;
        this.nmProduto = nmProduto;
        this.nmProdutoCurto = nmProdutoCurto;
        this.stAtivo = stAtivo;
        this.tpServico = tpServico;
        this.vlPreco = vlPreco;
        this.vlCusto = vlCusto;
        this.alRepasse = alRepasse;
        this.empresas = empresas;
        this.tempo = tempo;
    }

}
