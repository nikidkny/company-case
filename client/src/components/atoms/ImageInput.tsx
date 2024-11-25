import { useState } from "react";
import classNames from "classnames";
import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";
import Button from "./Button";

interface Props {
  onImageChange: (file: File | null) => void;
  className?: string;
  variant?: "cover" | "profile";
}

export default function ImageInput({ onImageChange, className, variant = "cover" }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const containerClasses = classNames("flex flex-col items-center gap-2", className);

  const previewClasses = classNames(
    "flex justify-center items-center bg-gray-100 border border-dashed border-gray-300 overflow-hidden", // Common preview styles
    {
      "w-full h-48 rounded-md": variant === "cover",
      "w-20 h-20 rounded-full": variant === "profile",
    }
  );

  const imageClasses = classNames("object-cover", {
    "w-full h-full": variant === "cover",
    "w-full h-full rounded-full": variant === "profile",
  });

  return (
    <div className={containerClasses}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id={`file-input-${variant}`}
      />
      <label htmlFor={`file-input-${variant}`} className={previewClasses}>
        {preview ? (
          <img src={preview} alt="Selected preview" className={imageClasses} />
        ) : variant === "cover" ? (
          <Icon
            name={ICON_NAMES.image_placeholder}
            height={237}
            width={441}
            viewBox="0 0 441 237"
          />
        ) : (
          <Icon name={ICON_NAMES.profile_placeholder} height={91} width={91} viewBox="0 0 91 91" />
        )}
      </label>
      <Button
        buttonLabel={variant === "cover" ? "Upload cover image" : "Upload image"}
        buttonVariant="secondary"
        buttonState="default"
        iconPosition="none"
        onClick={() => document.getElementById(`file-input-${variant}`)?.click()}
      />
    </div>
  );
}
