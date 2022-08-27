interface UserVideoProps {
  src: string;
  id: string;
  local?: boolean;
}

function UserVideo(props: UserVideoProps) {
  const { src, id, local = false } = props;

  return (
    <div className='avatar'>
      <div className='w-full aspect-square rounded-xl'>
        <video
          autoPlay
          playsInline
          muted={local}
          id={id}
          className={`w-full h-full object-cover ${
            local ? "scale-x-[-1]" : "scale-100"
          }`}
          poster={src}
        />
      </div>
    </div>
  );
}

export default UserVideo;
