import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MenuUpdater = ({ setActiveMenuItem }) => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.substring(1);
    setActiveMenuItem(pathname);
  }, [location, setActiveMenuItem]);

  // Return null because this component doesn't render anything
  return null;
};

export default MenuUpdater;
