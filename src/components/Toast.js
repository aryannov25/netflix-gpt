import { useApp } from "../context/AppContext";

const Toast = () => {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      role="status"
      className="animate-toast pointer-events-none fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 whitespace-nowrap rounded-full glass px-5 py-2.5 text-sm font-medium text-white shadow-2xl"
    >
      {toast.message}
    </div>
  );
};

export default Toast;
