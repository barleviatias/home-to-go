
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Component } from 'react'
import { DateRangePicker } from 'react-date-range';

export class DateRange extends Component {

  handleSelect(ranges) {

  }

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    )
  }
}