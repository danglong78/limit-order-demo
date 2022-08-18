import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProgressSteps = ({ steps, disabled = false }) => {
  return (
    <div className="progress-steps">
      <div className="progress-steps__layout">
        {steps.map((step, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="progress-steps__content" key={i}>
              <div
                className={classNames('progress-steps__circle -mr-1', {
                  'progress-steps__circle--disabled':
                    disabled || (!steps[i - 1] && i !== 0),
                })}
              >
                {step ? '✓' : i + 1}
              </div>
              <div
                className={classNames('progress-steps__connector', {
                  '!to-neutral-6000 dark:!to-neutral-400':
                    steps[steps.length - 1],
                })}
                disabled={disabled}
              />
            </div>
          );
        })}
        <div
          className={classNames('progress-steps__circle -ml-1', {
            'progress-steps__circle--disabled': !steps[steps.length - 1],
          })}
        >
          {steps.length + 1}
        </div>
      </div>
    </div>
  );
};

ProgressSteps.defaultProps = {
  disabled: false,
};
ProgressSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};
export default ProgressSteps;
