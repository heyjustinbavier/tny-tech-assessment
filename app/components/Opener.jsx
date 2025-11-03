import {
  irvin,
  irvinHeading,
  caslonItalic,
  neutrafaceNewYorker,
  graphik,
} from "@/ui/fonts/fonts"

import post from "@/lib/post"

import ShareIcon from "@/components/ShareIcon"
import Spotlights from "@/components/Spotlights"
import Clouds from "@/components/Clouds"
import Stars from "@/components/Stars"

export default function Opener() {
  return (
    <header
      className="opener-wrapper relative mb-34 flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-38 md:mb-48 md:min-h-screen md:pt-0"
      style={{
        backgroundImage: `url("./images/background.png")`,
      }}
    >
      <div
        className={`z-1 flex h-full max-w-xs flex-col items-center justify-between gap-y-8 border border-white px-8 pt-13 pb-12 text-white md:max-w-md md:px-12`}
      >
        {/* Rubric */}
        <a
          href="https://www.newyorker.com/books/page-turner"
          className={`${irvin.className} tracking text-[12px] leading-3 uppercase hover:underline`}
        >
          {post.rubric}
        </a>
        {/* Headline */}
        <h1
          className={`${irvinHeading.className} flex flex-col gap-y-0 text-center font-normal uppercase`}
        >
          <span className="text-headline-mobile md:text-headline-desktop block">
            {post.headline.slice(0, 7)}
          </span>
          <span className="text-subline-mobile md:text-subline-desktop block">
            {post.headline.slice(8, 14)}
          </span>
          <span className="text-headline-mobile md:text-headline-desktop block">
            {post.headline.slice(15, 24)}
          </span>
          <span className="text-headline-mobile md:text-headline-desktop block">
            {post.headline.slice(25, 31)}
          </span>
        </h1>
        {/* Dek */}
        <h2
          className={`${caslonItalic.className} text-dek-mobile md:text-dek-desktop px-4 text-center italic md:px-0`}
        >
          {post.dek}
        </h2>
        <div className="flex flex-col gap-y-4 text-center">
          {/* Byline */}
          <a
            href="https://www.newyorker.com/contributors/rachel-syme"
            className={`${neutrafaceNewYorker.className} text-byline-mobile md:text-byline-desktop hover:underline`}
          >
            {post.byline}
          </a>
          {/* Publish Date */}
          <p
            className={`${graphik.className} text-date-mobile md:text-date-desktop font-medium`}
          >
            <time>{post.publishDate}</time>
          </p>
        </div>
        {/* Social Icons */}
        <div className="bg-red-504 flex items-center justify-center">
          <ShareIcon
            width={10}
            height={18}
            imgSrc={"./images/icons/facebook.svg"}
            altText="Facebook Icon"
            shareLink="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnewyorker.com"
            shareLabel="Share on Facebook"
          />
          <ShareIcon
            width={19}
            height={15}
            imgSrc="./images/icons/twitter.svg"
            altText="Twitter Icon"
            shareLink="https://twitter.com/intent/tweet?url=https%3A%2F%2Fnewyorker.com&text=The%20Art%20of%20the%20Hollywood%20Memoir"
            shareLabel="Share on Twitter"
          />
          <ShareIcon
            width={19}
            height={15}
            imgSrc="./images/icons/mail.svg"
            altText="Email Icon"
            shareLink="mailto:?subject=The%20Art%20of%20the%20Hollywood%20Memoir&amp;body=Read%20the%20full%20story%20on%20http://newyorker.com."
            shareLabel="Share via Email"
          />
        </div>
      </div>
      <Spotlights />
      <Stars />
      {/* Gradient Overlay for page transition */}
      <div
        className="absolute inset-0 h-full w-full md:inset-px"
        style={{
          background:
            "linear-gradient(#000000 0%, transparent 20%, transparent 80%, #000000)",
        }}
      ></div>
      <Clouds />
    </header>
  )
}
