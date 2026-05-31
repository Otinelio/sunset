import { jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
function PageTransition({ children }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
      children
    }
  );
}
export {
  PageTransition as P
};
