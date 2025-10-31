import { irvin, caslon } from "@/ui/fonts/fonts"

import post from "@/lib/post"

export default function Intro() {
  function renderParagraphs() {
    return post.paragraphs.map((paragraph, index) => {
      return <p key={index}>{paragraph}</p>
    })
  }

  return (
    <div className="z-1 m-auto flex w-full items-center justify-center">
      <div className="mx-4 mb-24 flex max-w-[968px] flex-col gap-y-10 px-6 text-white md:border md:p-20">
        <p
          className={`${irvin.className} text-center text-[14px] leading-3.5 tracking-[1px]`}
        >
          INTRODUCTION
        </p>
        <div
          className={`${caslon.className} text-paragraph-mobile md:text-paragraph-desktop flex flex-col gap-y-10`}
        >
          {renderParagraphs()}
        </div>
      </div>
    </div>
  )
}
