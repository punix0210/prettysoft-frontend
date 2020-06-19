import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class FormatDate {

    static format(data: Date) {
        return data.toLocaleDateString().replace('/', '-').replace('/', '-').split('-').reverse().join('-');
    }

    static fromNgbDate(data: NgbDate) {
        let dataConv = new Date(data.year, data.month - 1, data.day);
        return this.format(dataConv);
    }

}
