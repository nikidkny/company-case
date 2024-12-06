import { useStore } from "../../store/useStore";
import TextBody from "../atoms/TextBody";
import classNames from "classnames";

interface PopUp {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function PopUp({ title, className = "", children }: PopUp) {
  const { popUp, setPopUp } = useStore();

  if (!popUp) return null;

  const displayPopUp = () => {
    setPopUp(false);
  };

  const overlayClasses = classNames(["fixed inset-0 z-50 flex items-center justify-center bg-black/50", className]);

  const containerClasses = classNames(["bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative mx-2 flex flex-col items-center gap-6", className]);

  return (
    <div className={overlayClasses} onClick={displayPopUp}>
      <div className={containerClasses}>
        {/* Modal content */}
        <div className="border-0 border-b border-solid border-gray-300 pb-3">
          <TextBody size="lg" variant="strong" className="text-blue-500">
            {title}
          </TextBody>
        </div>
        <div className="flex flex-col items-center gap-3 w-full items-stretch">{children}</div>
      </div>
    </div>
  );
}
