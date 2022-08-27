import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModeButtonProps {
  name: string;
  icon: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
}

function ModeButton(props: ModeButtonProps) {
  const { name, icon, onClick } = props;
  return (
    <button className="btn text-md gap-2 w-full" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {name}
    </button>
  );
}

export default ModeButton;
