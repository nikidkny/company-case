import TextBody from "./TextBody";

interface Props {
  text: string;
  className?: string;
}

const DividerWithText = ({ text }: Props) => {
  return (
    <div className="flex items-center w-full my-2">
      {/* Left Line */}
      {/* <hr className="flex-1 border-t border-gray-100" /> */}
      <div className="flex-1 border-0 border-t border-solid border-gray-400" />
      {/* Text */}
      <TextBody size="md" variant="p" className="px-4">
        {text}
      </TextBody>

      {/* Right Line */}
      <div className="flex-1 border-0 border-t border-solid border-gray-400" />
    </div>
  );
};

export default DividerWithText;
