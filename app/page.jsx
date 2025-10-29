import Image from "next/image"

// Import components
import Intro from "@/components/Intro"

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <div>
        <Image
          src="./tny_logo.svg"
          width={175}
          height={39.81}
          alt="The New Yorker Logo"
          style={{ width: "174px", height: "auto" }}
        />
      </div>
      <Intro />
    </div>
  )
}
