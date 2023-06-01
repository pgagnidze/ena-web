import { IconBrandGithub, IconBrandDiscord } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://papu.omg.lol"
          target="_blank"
          rel="noreferrer"
        >
          Papuna Gagnidze
        </a>
      </div>

      <div className="flex space-x-4">
        <a
          className="flex items-center hover:opacity-50"
          href="https://discord.gg/aFrPHspzzs"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandDiscord size={24} />
        </a>

        <a
          className="flex items-center hover:opacity-50"
          href="https://github.com/pgagnidze/ena-web"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub size={24} />
        </a>
      </div>
    </div>
  );
};
