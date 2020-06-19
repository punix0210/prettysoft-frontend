import { ProdutoDTO } from './produtoDTO';

export class AgendaItem {
    idAgendaItem?: number;
    quantidade?: number;
    produto?: ProdutoDTO;
    vlUnitario?: number;
    vlItem?: number;
    alComissao?: number;

    constructor(
        idAgendaItem?: number,
        produto?: ProdutoDTO,
        quantidade?: number,
        vlUnitario?: number,
        vlItem?: number,
        alComissao?: number,
    ) {
        this.idAgendaItem = idAgendaItem;
        this.produto = produto;
        this.quantidade = quantidade;
        this.vlUnitario = vlUnitario;
        this.vlItem = vlItem;
        this.alComissao = alComissao;
    }
}
