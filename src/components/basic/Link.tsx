interface LinkProps {
  onClick(): void;
  text: string;
  className: string;
}

const Link = (props: LinkProps) => {
  const { onClick, text, className = "" } = props;

  return (
    <span className={`cursor-pointer ${className}`} onClick={onClick}>
        {text}
    </span>
    )
};

export default Link;
