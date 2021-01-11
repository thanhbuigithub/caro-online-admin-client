import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const PageTittle = forwardRef(({
  children,
  title = '',
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

PageTittle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default PageTittle;
