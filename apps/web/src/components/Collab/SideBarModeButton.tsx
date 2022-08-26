import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModeButtonProps {
  name: string;
  icon: IconProp;
}

function ModeButton(props: ModeButtonProps) {
  const { name, icon } = props;

  return (
    <button className='btn gap-2 w-full '>
      <FontAwesomeIcon icon={icon} />
      {name}
    </button>
  );
}

export default ModeButton;
