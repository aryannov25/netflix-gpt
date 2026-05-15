import { Chevron } from "./icons";

const RowChevrons = ({ onLeft, onRight }) => (
  <>
    <button
      onClick={onLeft}
      aria-label="Scroll left"
      className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass text-white opacity-0 transition group-hover/row:opacity-100 md:left-5 md:flex"
    >
      <Chevron dir="left" />
    </button>
    <button
      onClick={onRight}
      aria-label="Scroll right"
      className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass text-white opacity-0 transition group-hover/row:opacity-100 md:right-5 md:flex"
    >
      <Chevron dir="right" />
    </button>
  </>
);

export default RowChevrons;
