import Image from "next/image"

import Opener from "@/components/Opener"
import Intro from "@/components/Intro"

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      {/* Site logo */}
      <a href="https://www.newyorker.com/">
        <Image
          src="./images/tny_logo.svg"
          width={175}
          height={39.81}
          alt="The New Yorker Logo"
          loading="eager"
          className="absolute inset-0 z-1 mx-auto w-[120px] py-4 md:w-[174px]"
          style={{ width: "174px", height: "auto" }}
        />
      </a>
      <article className="w-full">
        <Opener />
        <Intro />
      </article>
    </div>
  )
}
