import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface MetricCircleProps {
  percentage: number;
  label: string;
  duration?: number;
}

export const MetricCircle: React.FC<MetricCircleProps> = ({ percentage, label, duration = 2 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="metric-circle mx-auto" style={{ '--percentage': `${percentage}%` } as React.CSSProperties}>
        <motion.div
          className="metric-number"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration }}
          >
            {percentage}%
          </motion.span>
        </motion.div>
      </div>
      <p className="text-white/60">{label}</p>
    </motion.div>
  );
};