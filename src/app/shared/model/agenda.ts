import { Colaborador } from './colaborador';
import { Cliente } from './cliente';
import { AgendaItem } from './agenda-item';

export class Agenda {

    idAgenda?: number;
    descricao?: string;
    data?: string;
    horario?: string;
    status?: string; // A- aberto ; L - Confirmado ; T - Finalizado; C- Cancelado
    observacao?: string;
    cliente?: Cliente;
    items?: AgendaItem[];
    tempo?: number;
    color?: string;
    colaborador?: Colaborador;


    constructor(
        idAgenda?: number,
        descricao?: string,
        data?: string,
        horario?: string,
        status?: string,
        observacao?: string,
        cliente?: Cliente,
        items?: AgendaItem[],
        tempo?: number,
        color?: string,
        colaborador?: Colaborador
    ) {
        this.idAgenda = idAgenda;
        this.descricao = descricao;
        this.data = data;
        this.horario = horario;
        this.status = status;
        this.observacao = observacao;
        this.cliente = cliente;
        this.items = items;
        this.tempo = tempo;
        this.color = color;
        this.colaborador = colaborador;
    }

    // get tempo(): number {

    //     let qtTempo = 0;

    //     this.itens.forEach(value => {
    //         qtTempo += value.produto.tempo;
    //     });
    //     return qtTempo;
    // }

    // get color(): string {
    //     if (this.status === 'A') {
    //         return '#FF9900';
    //     } else
    //         if (this.status === 'L') {
    //             return '#339933';
    //         } else
    //             if (this.status === 'T') {
    //                 return '#0066CC';
    //             } else
    //                 if (this.status === 'C') {
    //                     return '#CC0000';
    //                 }
    // }



}
