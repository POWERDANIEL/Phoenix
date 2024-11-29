import {
  Link,
  useNavigation,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import logout from '../utils/logout';

import { useToggle } from '../hooks/useToggle';
import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';

import { logoLight, logoDark } from '../assets/assets';

const TopAppBar = () => {
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
        />

        <Link
          to='/'
          className='mix-w-max max-w-max h-[24px] lg:hidden'
        >
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

export default TopAppBar;
