'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TransitionLink from './common/transition/TransitionLink';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<'black' | 'white'>('black');
     const NAV_CLASSES = "text-[16px] pointer-event-auto! font-normal tracking-[0.15em] hover:text-white/80 transition-colors cursor-pointer hidden md:block";


  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const black = () => setTheme('black');
    const white = () => setTheme('white');

    window.addEventListener('show-header', show);
    window.addEventListener('hide-header', hide);
    window.addEventListener('header-black', black);
    window.addEventListener('header-white', white);

    return () => {
      window.removeEventListener('show-header', show);
      window.removeEventListener('hide-header', hide);
      window.removeEventListener('header-black', black);
      window.removeEventListener('header-white', white);
    };
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 w-full z-[9999999] transition-all duration-500 pointer-events-none', // ALWAYS none on container
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-6'
      )}
    >
      <div
        className={clsx(
          'flex items-center max-w-[1440px] w-full mx-auto justify-between px-8 py-4 transition-colors duration-500',
          theme === 'black' ? 'text-black' : 'text-white'
        )}
      >
        {/* LOGO */}
        <TransitionLink href='/'>
        <img
          src={theme === 'black' ? '/blacklogo.png' : '/headerlogo.png'}
          alt="Logo"
          className={clsx(
            "h-10 w-auto transition-opacity duration-300 cursor-pointer",
            visible ? "pointer-events-auto" : "pointer-events-none"
          )}
        />
        </TransitionLink>

        {/* NAV */}
        <div className="flex items-center justify-center gap-20">
          <nav className={clsx(
            "hidden md:flex items-center gap-8 md:gap-8 capitalize",
            visible ? "pointer-events-auto" : "pointer-events-none"
          )}>
                <TransitionLink href='/microsite' className={NAV_CLASSES}>Residential</TransitionLink>
                <TransitionLink href='/commercial' className={NAV_CLASSES}>Commercial</TransitionLink>
            {/* <a href="#">Residential</a>
            <a href="#">Commercial</a> */}
            <a href="#" className={NAV_CLASSES}>Land</a>
            <a href="#" className={NAV_CLASSES}>The Orange Circle</a>
          </nav>

          {/* HAMBURGER */}
          <button className={clsx(
            "flex flex-col gap-1.5 cursor-pointer",
            visible ? "pointer-events-auto" : "pointer-events-none"
          )}>
            <span
              className={clsx(
                'block w-6 h-[1.5px] transition-colors duration-300',
                theme === 'black' ? 'bg-black' : 'bg-white'
              )}
            />
            <span
              className={clsx(
                'block w-6 h-[1.5px] transition-colors duration-300',
                theme === 'black' ? 'bg-black' : 'bg-white'
              )}
            />
            <span
              className={clsx(
                'block w-6 h-[1.5px] transition-colors duration-300',
                theme === 'black' ? 'bg-black' : 'bg-white'
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
