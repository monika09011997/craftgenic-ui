// components/AnimatedPage.tsx
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const AnimatePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }} 
    >
      {children}
    </motion.div>
  );
};