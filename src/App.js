import React from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_green.css";
import moment from "moment";

function getDateFormatString() {
    const formatObj = new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(new Date());
    console.log(window.navigator.language, formatObj)
    return formatObj
        .map(obj => {
            switch (obj.type) {
                case "day":
                    return "DD";
                case "month":
                    return "MM";
                case "year":
                    return "YYYY";
                case "hour":
                    return "hh";
                case "literal":
                    return obj.value;
                case "minute":
                    return "mm";
                case "second":
                    return "ss";
                case "dayPeriod":
                    return "A"
                default:
                    return obj.value;
            }
        })
        .join("");
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.datePicker = React.createRef();
        this.state = {
            value: new Date()
        };
    }
    onChange(selectedDates, dateStr, instance) {
        console.log(selectedDates[0]);
    }
    componentDidMount() {
        console.log('getDateFormatString: ', getDateFormatString())
        flatpickr(this.datePicker.current, {
            onChange: this.onChange.bind(this),
            defaultDate: this.state.value,
            enableTime: true,
            allowInput: true,
            allowInvalidPreload: false,
            time_24hr: false,
            dateFormat: getDateFormatString(),
            parseDate: (datestr, format) => {
                return moment(datestr, format, true).toDate();
            },
            formatDate: (date, format) => {
                return moment(date).format(format);
            }

        });
    }
    render() {
        return <input type="date" ref={this.datePicker} />;
    }
}
