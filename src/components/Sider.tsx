import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { CommonComponentInterface } from "~/interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
// type MenuItem = Required<MenuProps>["items"][number];
interface MenuItem {
  label: React.ReactNode;
  key: React.Key;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    path,
    icon,
    children,
  };
}
const menus = [
  getItem("Countdown", "countdown", "/"),

  getItem("Stopwatch", "stopwatch", "/stopwatch"),
];

interface SiderInterface extends CommonComponentInterface {}
const Sider = ({}: SiderInterface) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {};
  return (
    <div className="absolute">
      <div style={{ width: 256 }} className="flex">
        {menus?.length > 0 &&
          menus.map((menuItem) => (
            <Link
              href={menuItem?.path}
              key={menuItem?.key}
              className="text-black p-2"
            >
              {menuItem?.label}
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Sider;
