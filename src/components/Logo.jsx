
/**
 * Node modules
 */
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * Assets
 */
import { logoLight, logoDark } from '../assets/assets';

const Logo = ({ classes = '' }) => {
  return (
    <Link href='/' className={`min-w-max max-w-max h-[24px] ${classes}`}>
      <img
        src={logoLight}
        width={133}
        height={24}
        alt='phoenix logo'
        className='dark:hidden'
      />

      <img
        src={logoDark}
        width={133}
        height={24}
        alt='phoenix logo'
        className='hidden dark:block'
      />
    </Link>
  );
};

Logo.propTypes = {
  classes: PropTypes.string,
};

export default Logo;
