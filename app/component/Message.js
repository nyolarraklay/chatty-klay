import Avatar from "./Avatar";
import userAvatar from "../atom/userAvatar";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export default function Message({ role, content }) {
  const [userAvatarFile, setUserAvatarFile] = useRecoilState(userAvatar);

  return (
    <div
      className={`grid grid-cols-
    30px_1fr] gap-5 p-5 ${role === "user" ? "bg-gray-600" : " "}`}
    >
      <div className="flex space-x-6">
        {role === "user" && (
          <Image
            src={userAvatarFile?.photo}
            alt="User Avatar"
            width={30}
            height={30}
            className="rounded-sm shadow-sm shadow-black/50"
          />
        )}
        {role === "assistant" && (
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm shadow-sm shadow-black/50">
            <FontAwesomeIcon icon={faRobot} className="text-emerald-200" />
          </div>
        )}

        <div className="text-white">{content}</div>
      </div>
    </div>
  );
}
