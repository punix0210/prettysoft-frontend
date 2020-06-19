import { OnInit, ViewChild } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { FormatDate } from 'src/app/shared/core/localeDateFormat';
import { MatCalendar } from '@angular/material/datepicker';


export class AgendaComponentBase implements OnInit {
    @ViewChild('calendarDetail', { static: false }) calendarDetailComponent: FullCalendarComponent;
    @ViewChild('calendar', { static: false }) calendar: MatCalendar<Date>;

    title = 'Agenda';

    optionsDetail: any;

    dateValue = new Date(localStorage.getItem('UtimaDtAgenda') === '' || undefined ?
        FormatDate.format(new Date()) : localStorage.getItem('UtimaDtAgenda'));

    constructor() { }

    ngOnInit() {
        // console.log(localStorage.getItem('UtimaDtAgenda'));

        setTimeout(() => {

            localStorage.getItem('UtimaDtAgenda') === '' || undefined ?
                this.getToday() : this.gotoDate(localStorage.getItem('UtimaDtAgenda'));

            // this.getToday();
        });

        this.optionsDetail = {
            localeCode: 'pt-br',
            timeZone: 'UTC',
            defaultView: 'timeGridDay',
            themeSystem: 'bootstrap',
            calendarPlugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin],
            calendarWeekends: true,
            editable: true,
            minTime: '06:00:00',
            handleWindowResize: true,
            height: 'auto',
            allDaySlot: false,
            contentHeight: 'auto',
            nowIndicator: true,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            buttonText: {
                timeGridDay: 'Dia',
                timeGridWeek: 'Semana',
                dayGridMonth: 'Mês',
                prev: 'Anterior',
                next: 'Próximo',
                today: 'Hoje'
            },
            dateClick: this.handleDateClick.bind(this)
            // eventClick: this.handleEventClick.bind(this),
            // eventDragStop: this.handleEventDragStop.bind(this)
        };

    }

    handleDateClick(arg) {
        console.log(arg);
    }

    onDateSelect(event) {
        localStorage.setItem('UtimaDtAgenda', FormatDate.format(event));
        // console.log(localStorage.getItem('UtimaDtAgenda'));
        this.gotoDate(FormatDate.format(event));
    }

    gotoDate(data) {
        let calendarApi = this.calendarDetailComponent.getApi();
        calendarApi.gotoDate(data);
        this.dateValue = calendarApi.getDate();
        this.calendar.activeDate = this.dateValue;
        this.calendar.updateTodaysDate();
        this.title = this.getViewTitle();
    }

    getToday() {
        const calendarApi = this.calendarDetailComponent.getApi();
        calendarApi.today();
        this.dateValue = calendarApi.getDate();
        this.calendar.activeDate = this.dateValue;
        this.calendar.updateTodaysDate();
        this.title = this.getViewTitle();
        localStorage.setItem('UtimaDtAgenda', FormatDate.format(this.dateValue));
    }

    getViewTitle() {
        let calendarApi = this.calendarDetailComponent.getApi();
        return calendarApi.view.title;
    }

    onCalendarView(value) {
        const calendarApi = this.calendarDetailComponent.getApi();
        calendarApi.changeView(value);
    }

    getDateStart() {
        const calendarApi = this.calendarDetailComponent.getApi();
        return calendarApi.view.activeStart;
    }

    getDateEnd() {
        const calendarApi = this.calendarDetailComponent.getApi();
        return calendarApi.view.activeEnd;
    }

    getCalendarView() {
        const calendarApi = this.calendarDetailComponent.getApi();
        return calendarApi.view.type;
    }

}

// isDataAtual() {
//     console.log(FormatDate.format(this.dateValue) === FormatDate.format(new Date()) ? true : false);
//     this.disabledDate = (FormatDate.format(this.dateValue) === FormatDate.format(new Date()) ? true : false);
//     this.title = this.getViewTitle();
// }

// getDate() {
//     const calendarApi = this.calendarDetailComponent.getApi();
//     return calendarApi.getDate();
// }

// selectToday() {
//     this.dateValue = new Date();
//     this.gotoDate(FormatDate.format(new Date()));
//     this.title = this.getViewTitle();
// }

// gotoPast(data) {
//     let calendarApi = this.calendarDetailComponent.getApi();
//     calendarApi.gotoDate(data);
//     this.dateValue = calendarApi.getDate();
//     this.title = this.getViewTitle();
// }

// toggleWeekends() {
//     this.optionsDetail.calendarWeekends = !this.optionsDetail.calendarWeekends;
// }

// onNext() {
//     const calendarApi = this.calendarDetailComponent.getApi();
//     calendarApi.next();
//     this.dateValue = calendarApi.getDate();
//     this.isDataAtual();
// }

// onPrev() {
//     const calendarApi = this.calendarDetailComponent.getApi();
//     calendarApi.prev();
//     this.dateValue = calendarApi.getDate();
//     this.isDataAtual();
// }


// handleEventClick(arg) {
//     console.log(arg);
// }

// handleEventDragStop(arg) {
//     console.log(arg);
// }


// handleDateClick(arg) {
//     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
//       this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
//         title: 'New Event',
//         start: arg.date,
//         allDay: arg.allDay
//       });
//     }
//   }
