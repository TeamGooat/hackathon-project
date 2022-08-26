interface UserVideoProps {
  src: string;
}

function UserVideo(props: UserVideoProps) {
  const { src } = props;

  return (
    <div className='avatar'>
      <div className='w-full aspect-square rounded-xl'>
        <video poster={src} />
      </div>
    </div>
  );
}

export default UserVideo;
