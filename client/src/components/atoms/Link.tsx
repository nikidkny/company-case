import classNames from "classnames";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: Props) {
  const linkClasses = classNames("link");
  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
}
