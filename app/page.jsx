import {
  irvin,
  caslon,
  caslonItalic,
  graphik,
  neutrafaceNewYorker,
} from "./ui/fonts/fonts"
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <div>
        <Image
          src="./tny_logo.svg"
          width={175}
          height={39.81}
          alt="The New Yorker Logo"
        />
      </div>
      <p className={`${irvin.className}`}>Irvin</p>
      <p className={`${caslon.className}`}>Caslon</p>
      <p className={`${caslonItalic.className}`}>Caslon Italic</p>
      <p className={`${graphik.className}`}>Graphik</p>
      <p className={`${neutrafaceNewYorker.className}`}>
        Neutraface New Yorker
      </p>
    </div>
  )
}
