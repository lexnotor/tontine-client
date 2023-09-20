import { motion } from "framer-motion";
import React from "react";

function transition(Component: React.FunctionComponent) {
    return () => (
        <motion.div
            initial={{ opacity: 0, rotateY: -5 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -5 }}
            transition={{ duration: 0.5 }}
        >
            <Component />
        </motion.div>
    );
}

export default transition;
