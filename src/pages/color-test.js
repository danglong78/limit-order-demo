import React from 'react';
import classNames from 'classnames';

const colorName = ['primary', 'secondary', 'neutral'];
const colorNumber = [
  [
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-500',
    'bg-primary-6000',
    'bg-primary-700',
    'bg-primary-800',
    'bg-primary-900',
  ],
  [
    'bg-secondary-50',
    'bg-secondary-100',
    'bg-secondary-200',
    'bg-secondary-300',
    'bg-secondary-400',
    'bg-secondary-500',
    'bg-secondary-6000',
    'bg-secondary-700',
    'bg-secondary-800',
    'bg-secondary-900',
  ],
  [
    'bg-neutral-50',
    'bg-neutral-100',
    'bg-neutral-200',
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-6000',
    'bg-neutral-700',
    'bg-neutral-800',
    'bg-neutral-900',
  ],
];

const ColorTest = () => {
  return (
    <div className="flex flex-col container">
      {colorName.map((name, index) => {
        return (
          <div key={name} className="flex flex-col">
            <div className="flex justify-center">
              <span className="font-bold text-lg md:text-3xl">{name}</span>
            </div>
            <div className="flex">
              {colorNumber[index].map((colorClass) => {
                return (
                  <div key={colorClass} className="flex justify-center">
                    <span
                      className={classNames(
                        'font-bold text-sm w-24 h-24',
                        colorClass
                      )}
                    >
                      {colorClass}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorTest;
