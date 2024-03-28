import { IoSettingsOutline } from "react-icons/io5";
interface SettingProps {
  className?: string;
}
export default function ({ className }: SettingProps) {
  return (
    <div className={`${className ? className : ""} absolute top-0`}>
      <IoSettingsOutline className="text-2xl" />
    </div>
  );
}
