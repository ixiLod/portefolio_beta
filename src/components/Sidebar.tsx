'use client';

import { motion } from 'framer-motion';

interface SidebarProps {
  isVisible: boolean;
  onMenuClick: (modalName: string) => void;
  activeModal: string | null;
}

const MENU_ITEMS = [
  { title: 'À propos', trigger: 'about' },
  { title: 'Mes créations', trigger: 'creations' },
  { title: 'Mes réseaux', trigger: 'networks' },
  { title: 'Contact', trigger: 'contact', isMail: true },
];

const Sidebar = ({ isVisible, onMenuClick, activeModal }: SidebarProps) => {
  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-50 h-16 w-full transform rounded-full border-neutral-400 bg-slate-300 bg-opacity-10 text-sm text-white transition-transform duration-300 xs:w-96 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } mx-auto flex items-center justify-center`}
    >
      <motion.h2
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-ninna text-base text-gray-300 shadow-lg xs:text-xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Creative Coder & Visual Artist
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="flex h-full items-center justify-center"
      >
        <nav aria-label="Menu de navigation principale">
          <ul className="flex items-center">
            {MENU_ITEMS.map(({ title, trigger, isMail }) => (
              <li className="mx-2 flex items-center" key={trigger}>
                <motion.button
                  onClick={() => {
                    if (isMail) {
                      window.location.href = `mailto:ixilod@proton.me`;
                    } else {
                      onMenuClick(trigger);
                    }
                  }}
                  className={`flex items-center transition-colors hover:text-gray-300 ${
                    activeModal === trigger ? 'text-white' : 'text-gray-400'
                  } ${trigger === 'creations' ? 'line-through' : ''} text-xs xs:text-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  aria-label={`Ouvrir ${title}`}
                  aria-current={activeModal === trigger ? 'page' : undefined}
                >
                  {title}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Sidebar;
