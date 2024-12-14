import { useState } from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCopy, faLink } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  onClose: () => void;
}

const Contact = ({ onClose }: ModalProps) => {
  const [emailDisplay, setEmailDisplay] = useState('ixilod@proton.me');
  const email = 'ixilod@proton.me';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailDisplay('Copied!');
      setTimeout(() => {
        setEmailDisplay(email);
      }, 2000);
    } catch (err) {
      console.error('fail to copy', err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="about-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg p-4 shadow-lg md:w-3/4"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="m-1 flex items-start justify-between">
          <button
            onClick={handleCopy}
            className="flex min-w-[200px] items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-2 text-gray-300 transition duration-300 ease-in-out hover:border-gray-400 hover:text-gray-400"
          >
            {emailDisplay}
            <FontAwesomeIcon icon={faCopy} className="ml-2" />
          </button>

          <button
            onClick={() => (window.location.href = `mailto:${email}`)}
            className="rounded-md border-2 border-dashed border-gray-300 p-2 text-gray-300 transition duration-300 ease-in-out hover:border-gray-400 hover:text-gray-400"
            aria-label="Open mail client"
          >
            Direct link
            <FontAwesomeIcon icon={faLink} className="ml-2" />
          </button>
          <button
            onClick={onClose}
            className="-translate-y-2 translate-x-2 text-white transition duration-300 ease-in-out hover:text-gray-400"
            aria-label="Close the About window"
          >
            <FontAwesomeIcon icon={faCircleXmark} className="text-2xl opacity-10" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
