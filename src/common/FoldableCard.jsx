import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const FoldableCard = ({ title, children, opened = true }) => {
  const [open, setOpen] = useState(opened);

  return (
    <section className="card p-4 mt-4 w-100 shadow">
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <h2 className="m-0 flex-grow-1" style={{ borderBottom: `${open ? "solid 1px" : "hidden"}`}}>{title}</h2>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FoldableCard;