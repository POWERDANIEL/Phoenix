import PropTypes from 'prop-types';

const Menu = ({ className, children }) => {
  return <div className={`menu ${className}`}>{children}</div>;
};

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Menu;
