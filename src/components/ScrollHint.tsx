import { motion } from "framer-motion";

export default function ScrollHint({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none z-50">
      <motion.div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Ir para próxima seção"
        className={`flex items-center justify-center cursor-pointer shadow-md pointer-events-auto ${
          className || ""
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
      >
        <div className="scroll-down">
          <i className="fas fa-chevron-down"></i>
        </div>
      </motion.div>
    </div>
  );
}
