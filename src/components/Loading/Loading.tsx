import { motion } from 'framer-motion';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.loader}></div>
    </motion.div>
  );
};

export default Loading;
