import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const LOADING_SIZE = {
  SX: 'sx',
  SM: 'sm',
  BASE: 'base',
  LG: 'lg',
  XL: 'xl',
}

const Loading = ({ size }) => {
  return (
    <div
      className={classNames({
        'spinner-dual-container-sx': size === LOADING_SIZE.SX,
        'spinner-dual-container-sm': size === LOADING_SIZE.SM,
        'spinner-dual-container-base': size === LOADING_SIZE.BASE,
        'spinner-dual-container-lg': size === LOADING_SIZE.LG,
        'spinner-dual-container-xl': size === LOADING_SIZE.XL,
      })}
    >
      <div
        className={classNames({
          'spinner-dual-sx': size === LOADING_SIZE.SX,
          'spinner-dual-sm': size === LOADING_SIZE.SM,
          'spinner-dual-base': size === LOADING_SIZE.BASE,
          'spinner-dual-lg': size === LOADING_SIZE.LG,
          'spinner-dual-xl': size === LOADING_SIZE.XL,
        })}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

Loading.defaultProps = {
  size: 'base',
}

Loading.propTypes = {
  size: PropTypes.string,
}

export default Loading
