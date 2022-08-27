import { useNavigate } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-sm badge-primary indicator-item">
                8
              </span>
            </div>
          </button>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" alt="Avatar" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <button className="justify-between">
              Profile
              <span className="badge">New</span>
            </button>
          </li>
          <li>
            <button>Settings</button>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <button
        className="pl-7 font-extrabold"
        onClick={() => {
          navigate("/");
        }}
      >
        responsIO
      </button>
    </div>
  );
};

const AuthActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-none ">
      <ul className="menu menu-horizontal p-0 space-x-4 text-sm">
        <li>
          <button
            className="hover:bg-info hover:border-none hover:text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        </li>

        <li>
          <button
            className="font-bold hover:bg-accent hover:border-none hover:text-base-100"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </div>
  );
};

function Header(props: { unauthenticated?: boolean }) {
  const { unauthenticated = false } = props;
  return (
    <>
      <div className="navbar pr-5">
        <Logo />
        {!unauthenticated && <Notifications />}
        {!unauthenticated && <Profile />}
        {unauthenticated && <AuthActions />}
      </div>
    </>
  );
}

export default Header;
