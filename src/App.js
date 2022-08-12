import React from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_green.css";
import moment from "moment";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.datePicker = React.createRef();
        this.state = {
            value: "2021-05-04T14:00:00.938Z"
        };
    }
    onChange(selectedDates, dateStr, instance) {
        console.log(selectedDates);
    }
    componentDidMount() {
        flatpickr(this.datePicker.current, {
            onChange: this.onChange.bind(this),
            defaultDate: this.state.value,
            enableTime: true,
            allowInput: true,
            allowInvalidPreload: false,
            time_24hr: false
            //   formatDate: (date, format) => {
            //     return date.toLocaleString()
            // }
        });
    }
    render() {
        return <input type="date" ref={this.datePicker} />;
    }
}
