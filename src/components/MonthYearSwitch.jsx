import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onSelectMonth: PropTypes.func,
  onSelectYear: PropTypes.func,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
});

const defaultProps = {
  date: moment(),
  onSelectMonth() {},
  onSelectYear() {},
  navPrev: null,
  navNext: null,
};

export default class MonthSelector extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  prevMonthClick(e) {
    const { date, onSelectMonth } = this.props;
    e.preventDefault();
    onSelectMonth(date, date.get('month') - 1);
  }

  nextMonthClick(e) {
    const { date, onSelectMonth } = this.props;
    e.preventDefault();
    onSelectMonth(date, date.get('month') + 1);
  }

  prevYearClick(e) {
    const { date, onSelectYear } = this.props;
    e.preventDefault();
    onSelectYear(date, date.get('year') - 1)
  }

  nextYearClick(e) {
    const { date, onSelectYear } = this.props;
    e.preventDefault();
    onSelectYear(date, date.get('year') + 1)
  }

  render() {
    const {
      date,
      navPrev,
      navNext,
    } = this.props;

    const currentMonth = date.format('MMMM');
    const currentYear = date.format('YYYY');

    return (
      <div className="MonthYearSwitch">
        <div className="Month">
          <button onClick={this.prevMonthClick}>
            {navPrev ? navPrev : 
            <LeftArrow />
            }
          </button>
          <span className="Month--title">{currentMonth}</span>
          <button onClick={this.nextMonthClick}>
            {navNext ? navNext : 
            <RightArrow />
            }
          </button>
        </div>
        <div className="Year">
          <button onClick={this.prevYearClick}>
          {navPrev ? navPrev : 
            <LeftArrow />
          }
          </button>
          <span className="Year--title">{currentYear}</span>
          <button onClick={this.nextYearClick}>
          {navNext ? navNext : 
            <RightArrow />
          }
          </button>
        </div>
      </div>
    );
  }
}

MonthSelector.propTypes = propTypes;
MonthSelector.defaultProps = defaultProps;
