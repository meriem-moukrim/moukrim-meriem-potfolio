import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Composant de révélation au scroll utilisant Framer Motion.
 * Applique une animation de fade-in et slide-up.
 */
const ScrollReveal = ({ children, delay = 0, duration = 0.8, y = 30, staggerChildren = false }) => {
    const variants = {
        hidden: { opacity: 0, y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Transition fluide et professionnelle
                when: staggerChildren ? 'beforeChildren' : null,
                staggerChildren: staggerChildren ? 0.1 : 0,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

ScrollReveal.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    y: PropTypes.number,
    staggerChildren: PropTypes.bool,
};

export default ScrollReveal;
