import classNames from "classnames";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}
// this is the external link component - for inline link do we need a separate component?
// should it include an icon already?
export default function Link({ href, children, className }: Props) {
  const linkClasses = classNames("link", className);
  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
}
