import { motion } from "framer-motion";
import React from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, rotateY: -5 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -5 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
