import PropTypes from 'prop-types';
import { NavLink, useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from './Logo';
import { ExtendedFab } from './Button';
import { IconBtn } from './Button';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const data = useLoaderData() || {};
  const conversationData = data.conversation?.documents || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
      >
        <div className='sidebar-inner'>
          {/* Header with Logo */}
          <div className='h-16 grid items-center px-4 mb-4'>
            <Logo />
          </div>

          {/* Button for creating new chat */}
          <ExtendedFab
            href='/'
            text='New chat'
            classes='mb-4'
            onClick={toggleSidebar}
          />

          {/* Conversations List */}
          <div className='overflow-y-auto -me-2 pe-1'>
            <p className='text-titleSmall h-9 grid items-center px-4'>Recent</p>

            <nav>
              {conversationData.length > 0 ? (
                conversationData.map((item) => (
                  <div
                    key={item.$id}
                    className='relative group'
                  >
                    <NavLink
                      to={item.$id}
                      className='nav-link'
                      title={item.title || 'Untitled Chat'}
                      onClick={toggleSidebar}
                    >
                      <span className='material-symbols-rounded icon-small'>
                        chat_bubble
                      </span>

                      <span className='truncate'>
                        {item.title || 'Untitled Chat'}
                      </span>

                      <div className='state-layer'></div>
                    </NavLink>

                    <IconBtn
                      icon='delete'
                      size='small'
                      classes='absolute top-1/2 right-1.5 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 group:focus-within:opacity-100 hidden lg:grid'
                      title='Delete'
                    />
                  </div>
                ))
              ) : (
                <p className='px-4 text-sm text-gray-500'>
                  No conversations found.
                </p>
              )}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Overlay for closing sidebar */}
      <div
        className={`overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
