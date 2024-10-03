import md5 from "crypto-js/md5";

export default function Avatar({ user }) {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return name[0].toUpperCase();
  };

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="User Avatar"
        className="rounded-full w-12 h-12"
      />
    );
  }
  const initials = getInitials(user.displayName || user.email);

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
      <span className="text-xl text-gray-700 font-bold">{initials}</span>
    </div>
  );
}
