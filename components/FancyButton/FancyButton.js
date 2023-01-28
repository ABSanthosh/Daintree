import Link from "next/link";
import "./FancyButton.scss";

function FancyButton({
  children,
  className = "",
  isLink = false,
  href = "",
  innerRef = null,
  invertButton = false,
  ...props
}) {
  if (isLink) {
    return (
      <Link href={href} legacyBehavior>
        <a
          className={`${
            invertButton ? "FancyButton__inverted" : "FancyButton"
          } ${className}`}
          ref={innerRef}
          {...props}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={`${
        invertButton ? "FancyButton__inverted" : "FancyButton"
      } ${className}`}
      ref={innerRef}
      {...props}
    >
      {children}
    </button>
  );
}

export default FancyButton;
