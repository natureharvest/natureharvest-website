import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const styles = `
    group
    relative
    inline-flex
    min-h-[56px]
    min-w-[175px]
    items-center
    justify-center
    gap-3
    overflow-hidden
    rounded-tl-none
    rounded-tr-[50px]
    rounded-br-none
    rounded-bl-[50px]
    bg-[#f2a318]
    px-9
    py-4
    text-base
    font-bold
    tracking-wide
    !text-black
    shadow-[0_8px_22px_rgba(242,163,24,0.25)]
    transition-all
    duration-500 
    ease-in-out

    hover:-translate-y-1
    hover:rounded-tl-[50px]
    hover:rounded-tr-none
    hover:rounded-br-[50px]
    hover:rounded-bl-none
    hover:bg-[#c77c00]
    hover:!text-black
    hover:shadow-[0_12px_28px_rgba(7,91,91,0.25)]

    active:translate-y-0
    active:scale-[0.98]

    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={styles}>
        <span className="relative z-10 !text-black">{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles}
      >
        <span className="relative z-10 !text-black">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles} ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
    >
      <span className="relative z-10 !text-black">{children}</span>
    </button>
  );
};

export default Button;