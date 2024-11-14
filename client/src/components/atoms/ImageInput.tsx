import classNames from "classnames";
import { useState } from "react";

interface Props {
  onImageChange: (file: File | null) => void;
  placeholder?: string;
}

export default function ImageInput(props: Props) {
  const classes = classNames("image-input");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    props.onImageChange(file);

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

  return (
    <div className={classes}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-input__file"
      />
      <div className="image-input__preview">
        {preview ? (
          <img src={preview} alt="Selected preview" className="image-input__image" />
        ) : (
          <span className="image-input__placeholder">{props.placeholder}</span>
        )}
      </div>
    </div>
  );
}
