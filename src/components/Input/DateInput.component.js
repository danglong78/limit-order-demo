import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useWindowSize from 'hooks/useWindowSize';
import Dayjs from 'dayjs';

import { DayPickerSingleDateController } from 'react-dates';
import classNames from 'classnames';
import { ButtonThird } from 'components/Button';

const TIME = [
  '00 : 00',
  '00 : 30',
  '01 : 00',
  '01 : 30',
  '02 : 00',
  '02 : 30',
  '03 : 00',
  '03 : 30',
  '04 : 00',
  '04 : 30',
  '05 : 00',
  '05 : 30',
  '06 : 00',
  '06 : 30',
  '07 : 00',
  '07 : 30',
  '08 : 00',
  '08 : 30',
  '09 : 00',
  '09 : 30',
  '10 : 00',
  '10 : 30',
  '11 : 00',
  '11 : 30',
];

const DateInput = ({
  handleDateChange,
  handleFocusChange,
  handleDateTimeChange,
  dates,
  className,
  dateTimePicker,
  noShadow,
}) => {
  const windowSize = useWindowSize();
  const [isAM, setIsAM] = useState(true);
  const [selectedTime, setSelectedTime] = useState('00 : 00');
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  useEffect(() => {}, [isAM, selectedTime]);

  const getDaySize = () => {
    if (windowSize.width <= 600) {
      return undefined;
    }
    return 56;
  };

  const renderTime = (value) => {
    return (
      <div
        key={value}
        className={classNames('date-input__time-row', {
          'date-input__selected-time-row': selectedTime === value,
        })}
        onClick={() => setSelectedTime(value)}
      >
        {value}
      </div>
    );
  };

  useEffect(() => {
    handleDateTimeChange(formatDateTime(selectedDate));
  }, [selectedDate, selectedTime, isAM]);

  const formatDateTime = (date) => {
    const [hour, minute] = selectedTime.split(':').map((value) => +value);
    const dateTime = new Dayjs(date)
      .hour(hour + (isAM ? 0 : 12))
      .minute(minute)
      .second(0);
    return dateTime;
  };

  const handleUpdateDateTime = (date) => {
    if (!date) return;
    handleDateTimeChange(formatDateTime(date));
    handleDateChange(new Dayjs(date));
    setSelectedDate(new Dayjs(date));
  };

  return (
    <div
      className={classNames('date-input', className, {
        'date-input__date-time-picker': dateTimePicker,
        '!shadow-none': noShadow,
      })}
    >
      <DayPickerSingleDateController
        onDateChange={handleUpdateDateTime}
        focused={false}
        onFocusChange={handleFocusChange}
        date={null}
        isDayHighlighted={(day) => dates.some((d) => d.isSame(day, 'day'))}
        keepOpenOnDateSelect
        hideKeyboardShortcutsPanel
        daySize={getDaySize()}
        initialVisibleMonth={null}
      />
      {dateTimePicker && (
        <div className="date-input__time-picker">
          <p className="text-center text-lg font-semibold">Select Time</p>
          <div className="date-inpunt__time-list">{TIME.map(renderTime)}</div>
          <div className="flex gap-[3px]">
            <ButtonThird
              className={classNames('date-input__btn', {
                'date-input__btn-active': isAM,
              })}
              onClick={() => setIsAM(true)}
              label="AM"
            >
              AM
            </ButtonThird>
            <ButtonThird
              className={classNames('date-input__btn', {
                'date-input__btn-active': !isAM,
              })}
              onClick={() => setIsAM(false)}
              label="PM"
            >
              PM
            </ButtonThird>
          </div>
        </div>
      )}
    </div>
  );
};

DateInput.defaultProps = {
  handleDateChange: () => {},
  handleFocusChange: () => {},
  handleDateTimeChange: () => {},
  dates: [new Dayjs()],
  className: '',
  dateTimePicker: false,
  noShadow: false,
};

DateInput.propTypes = {
  handleDateChange: PropTypes.func,
  handleFocusChange: PropTypes.func,
  handleDateTimeChange: PropTypes.func,
  dates: PropTypes.array,
  className: PropTypes.string,
  dateTimePicker: PropTypes.bool,
  noShadow: PropTypes.bool,
};

export default DateInput;
