import Link from "next/link";
import Image from "next/image";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";

export default function NotFound() {
  return (
    <main className='flex items-center justify-center h-[calc(100vh-var(--header-height))] px-4'>
      <div className='flex flex-col items-center justify-center gap-6 w-[663px] sm:w-full h-full'>
        <section className='text-center'>
          <h1 className='text-[40px] leading-[54.62px] 2xl:text-[56px] 2xl:leading-[76.5px] xl:text-5xl xl:leading-[60px] font-extrabold text-center'>
            404
          </h1>

          <section className='flex flex-col gap-2 sm:gap-4 text-sm font-medium md:text-base md:font-semibold 2xl:text-lg 2xl:font-semibold text-center pt-2'>
            <p>Page not found</p>
            <p className=''>
              But maybe we found a new Transcript Reviewer? <span className='sm:hidden whitespace-nowrap'>(we mean you!)</span>
              <br />
              <span className='hidden sm:flex text-center items-center justify-center'>(We mean you!)</span>
            </p>
          </section>
        </section>

        <section className='max-w-[326px] max-h-[276.56px] sm:max-w-[550px] sm:max-h-[450px] relative h-full w-full'>
          <Image src='/images/not-found-img.png' alt='not found image' fill className=' object-contain' />
        </section>

        <section className='flex flex-col sm:flex-row gap-6 w-full items-center justify-center'>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 font-semibold text-base leading-[22px] 2xl:text-lg 2xl:font-semibold text-white py-[17px] sm:py-5 2xl:py-6 bg-orange-custom-100 rounded-full w-full sm:w-[50%] sm:max-w-[298.5px] max-w-full h-14 sm:h-full text-nowrap'
          >
            <ArrowLinkRight className='text-white w-6 max-md:w-5 rotate-180' />
            Return Home
          </Link>
          <Link
            href='https://review.btctranscripts.com/'
            target='_blank'
            className='flex items-center justify-center gap-2 text-base font-semibold 2xl:text-lg text-black py-[17px] sm:py-5 2xl:py-6 bg-transparent border-2 border-black rounded-full w-full sm:w-[50%] h-14 sm:h-full sm:max-w-[298.5px] max-w-full text-nowrap'
          >
            Review Transcripts
            <ArrowLinkRight className='text-black w-6 max-md:w-5' />
          </Link>
        </section>
      </div>
    </main>
  );
}
