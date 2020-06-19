
export class ProdutoDTO {

    idProduto?: number;
    cdChamada?: string;
    nmProduto?: string;
    nmProdutoCurto?: string;
    tpServico?: string;
    vlPreco?: number;
    vlCusto?: number;
    alRepasse?: number;

    constructor(
        idProduto?: number,
        cdChamada?: string,
        nmProduto?: string,
        nmProdutoCurto?: string,
        tpServico?: string,
        vlPreco?: number,
        vlCusto?: number,
        alRepasse?: number
    ) {
        this.idProduto = idProduto;
        this.cdChamada = cdChamada;
        this.nmProduto = nmProduto;
        this.nmProdutoCurto = nmProdutoCurto;
        this.tpServico = tpServico;
        this.vlPreco = vlPreco;
        this.vlCusto = vlCusto;
        this.alRepasse = alRepasse;
    }

}
