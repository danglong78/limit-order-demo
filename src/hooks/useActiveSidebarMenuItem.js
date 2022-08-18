import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useActiveSidebarMenuItem = ({ href, children }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);

  const shouldActive = () => {
    const isHavingExactMatchChild =
      children && children.some((child) => child.href === router.pathname);
    const isExactMatch = router.pathname === href;

    return isHavingExactMatchChild || isExactMatch;
  };

  useEffect(() => {
    setActive(shouldActive());
  }, [router.pathname]);

  useEffect(() => {
    setShow(shouldActive());
  }, []);

  const toggleShow = () => setShow((state) => !state);

  return { show, active, toggleShow };
};

export default useActiveSidebarMenuItem;
