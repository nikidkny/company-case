import classNames from "classnames";

interface Props {
  href: string;
  children: React.ReactNode;
}
// this is the external link component - for inline link do we need a separate component?
// should it include an icon already?
export default function Link({ href, children }: Props) {
  const linkClasses = classNames("link");
  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
}
