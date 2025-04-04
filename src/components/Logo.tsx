import Image from "next/image";
import { FC } from "react";
import LogoImage from "@/assets/logo.png";

const Logo: FC = () => {
  return (
    <div>
      <Image src={LogoImage} alt="jz-mart-logo" priority />
    </div>
  );
};

export default Logo;
