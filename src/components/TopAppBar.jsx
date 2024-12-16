import { useNavigation, useNavigate, useLoaderData } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import logout from '../utils/logout';

import { useToggle } from '../hooks/useToggle';
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import Logo from './Logo';

const TopAppBar = ({ toggleSidebar }) => {
  const navigation = useNavigation();

  const navigate = useNavigate();

  const { user } = useLoaderData();

  const [showMenu, setShowMenu] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.fromData;

  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />

        <Logo className='lg:hidden' />
      </div>
      <div className='menu-wrapper'>
        {/* Button to toggle the menu */}
        <IconBtn onClick={() => setShowMenu()}>
          <Avatar name={user.name} />
        </IconBtn>

        {/* Menu Component */}
        <Menu className={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>

      <AnimatePresence>{isNormalLoad && <LinearProgress />}</AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default TopAppBar;
