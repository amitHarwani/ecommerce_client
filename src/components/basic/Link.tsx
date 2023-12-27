import { useMemo } from "react";
import { LinkTypes } from "../../constants";

interface LinkProps {
  onClick?(): void;
  text: string;
  className?: string;
  linkType?: LinkTypes;
}

const Link = (props: LinkProps) => {
  const { onClick, text, linkType = LinkTypes.default, className = "" } = props;

  const linkTypeStyles = useMemo(() => {
    switch (linkType) {
      case LinkTypes.red:
        return "text-darkRed hover:underline";
      default:
        return "";
    }
  }, [linkType]);

  return (
    <span
      className={`cursor-pointer ${linkTypeStyles} ${className}`}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Link;
