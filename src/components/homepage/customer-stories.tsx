import Image from "next/image";

const testimonials = [
  {
    author: "Ally Masi",
    avatar: "/homepage/customer-stories/ally-masi-avatar.png",
    cardLayer: "customer-stories/card-salesforce",
    company: "Salesforce",
    logo: {
      alt: "Salesforce",
      height: 162,
      src: "/homepage/customer-stories/salesforce-logo.png",
      width: 240,
    },
    quote:
      '"We chose Welcome because it’s intuitive, beautifully designed, and made for attendee interaction, making it the perfect way to uplevel our experiences. The Slack-like chat, on-stage Q&A, and polling has increased audience engagement."',
    role: "Director of Industries Events Marketing",
  },
  {
    author: "Talisha Brantley",
    avatar: "/homepage/customer-stories/talisha-brantley-avatar.png",
    cardLayer: "customer-stories/card-bitwise",
    company: "Bitwise",
    logo: {
      alt: "Bitwise",
      height: 64,
      src: "/homepage/customer-stories/bitwise-logo.png",
      width: 241,
    },
    quote:
      "“Before Welcome, I had to get a switcher, use Ecamm, OBS and always needed this or that to make it all work. Now, one or two people can run our virtual events easily without any special equipment. With just one platform, we can do everything we want.”",
    role: "VP of Events",
  },
  {
    author: "Madeleine Sava",
    avatar: "/homepage/customer-stories/madeleine-sava-avatar.png",
    cardLayer: "customer-stories/card-dribbble",
    company: "Dribbble",
    logo: {
      alt: "Dribbble",
      height: 61,
      src: "/homepage/customer-stories/dribbble-logo.png",
      width: 240,
    },
    quote:
      '"The Welcome experience has been 10 out of 10. When our sponsors like Facebook are considering sponsoring our events, Welcome is our "secret weapon"',
    role: "Program Manager",
  },
];

const linkFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4";

export function HomepageCustomerStories() {
  return (
    <section
      className="w-full bg-[#000000] text-[#ffffff]"
      id="customer-stories"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div
        className="relative mx-auto hidden h-[min(1015.11px,70.493vw)] w-full max-w-[1440px] overflow-hidden bg-[#000000] lg:block"
        data-figma-layer="customer-stories/section"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover"
          data-figma-layer="customer-stories/background"
          fill
          priority
          sizes="1440px"
          src="/homepage/customer-stories/customer-stories-background.jpg"
        />

        <h2
          className="absolute top-[min(150px,10.417vw)] left-[min(80px,5.556vw)] h-[min(231px,16.042vw)] w-[min(430.48px,29.894vw)] font-normal text-[#000000] text-[min(121px,8.403vw)] leading-[min(115.2px,8vw)] tracking-[-5px]"
          data-figma-layer="customer-stories/title"
        >
          Loved &amp; trusted
        </h2>

        <div
          className="absolute top-[min(318px,22.083vw)] right-[min(80px,5.556vw)] flex h-[min(64px,4.444vw)] items-center gap-[min(16px,1.111vw)]"
          data-figma-layer="customer-stories/controls"
        >
          <button
            aria-label="Previous customer story"
            className={`relative h-[min(64px,4.444vw)] w-[min(64px,4.444vw)] transition-opacity hover:opacity-70 ${linkFocusClasses}`}
            type="button"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-full w-full"
              height={128}
              src="/homepage/customer-stories/arrow-left.png"
              width={128}
            />
          </button>
          <button
            aria-label="Next customer story"
            className={`relative h-[min(64px,4.444vw)] w-[min(64px,4.444vw)] transition-opacity hover:opacity-70 ${linkFocusClasses}`}
            type="button"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-full w-full"
              height={128}
              src="/homepage/customer-stories/arrow-right.png"
              width={128}
            />
          </button>
        </div>

        <div
          className="absolute top-[min(454px,31.528vw)] left-[min(80px,5.556vw)] flex h-[min(416px,28.889vw)] w-[min(1907px,132.431vw)] gap-[min(32px,2.222vw)]"
          data-figma-layer="customer-stories/carousel"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.cardLayer} {...testimonial} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden px-5 pt-16 pb-20 lg:hidden">
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover"
          fill
          sizes="(max-width: 1023px) 100vw, 0px"
          src="/homepage/customer-stories/customer-stories-background.jpg"
        />
        <div className="relative z-10 mx-auto max-w-[640px]">
          <div className="flex items-end justify-between gap-5">
            <h2 className="max-w-[320px] font-normal text-[#000000] text-[64px] leading-[60px] tracking-[-2px] sm:text-[84px] sm:leading-[80px]">
              Loved &amp; trusted
            </h2>
            <div className="mb-2 flex shrink-0 gap-2">
              <button
                aria-label="Previous customer story"
                className={`relative h-11 w-11 ${linkFocusClasses}`}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full"
                  height={128}
                  src="/homepage/customer-stories/arrow-left.png"
                  width={128}
                />
              </button>
              <button
                aria-label="Next customer story"
                className={`relative h-11 w-11 ${linkFocusClasses}`}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full"
                  height={128}
                  src="/homepage/customer-stories/arrow-right.png"
                  width={128}
                />
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-10">
            {testimonials.map((testimonial) => (
              <TestimonialCardMobile
                key={testimonial.cardLayer}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  author: string;
  avatar: string;
  cardLayer: string;
  company: string;
  logo: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  quote: string;
  role: string;
}

function TestimonialCard({
  author,
  avatar,
  cardLayer,
  company,
  logo,
  quote,
  role,
}: TestimonialCardProps) {
  return (
    <article
      className="h-full w-[min(615px,42.708vw)] shrink-0 rounded-tr-[min(32px,2.222vw)] border-[#ffffff] border-t border-r pt-[min(45px,3.125vw)]"
      data-figma-layer={cardLayer}
    >
      <p
        className="font-normal text-[min(23px,1.597vw)] leading-[min(31px,2.153vw)] tracking-[0]"
        data-figma-layer={`${cardLayer}/quote`}
      >
        {quote}
      </p>

      <div
        className="mt-[min(40px,2.778vw)] flex items-center"
        data-figma-layer={`${cardLayer}/author`}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="h-[min(64px,4.444vw)] w-[min(64px,4.444vw)] rounded-full object-cover"
          height={97}
          src={avatar}
          width={97}
        />
        <div className="ml-[min(15px,1.042vw)]">
          <p className="font-normal text-[min(19px,1.319vw)] leading-[min(23px,1.597vw)]">
            {author}
          </p>
          <p className="mt-[min(5px,0.347vw)] max-w-[min(380px,26.389vw)] font-normal text-[min(15px,1.042vw)] text-[rgba(255,255,255,0.65)] leading-[min(21px,1.458vw)]">
            {role}
            <br />
            {company}
          </p>
        </div>
      </div>

      <Image
        alt={logo.alt}
        className="mt-[min(33px,2.292vw)] h-auto w-[min(120px,8.333vw)]"
        data-figma-layer={`${cardLayer}/logo`}
        height={logo.height}
        src={logo.src}
        style={{ height: "auto" }}
        width={logo.width}
      />
    </article>
  );
}

function TestimonialCardMobile({
  author,
  avatar,
  cardLayer,
  company,
  logo,
  quote,
  role,
}: TestimonialCardProps) {
  return (
    <article
      className="rounded-tr-[32px] border-[#ffffff] border-t border-r pt-8 pr-6"
      data-figma-layer={`${cardLayer}/mobile`}
    >
      <p className="font-normal text-[20px] leading-[28px] tracking-[0]">
        {quote}
      </p>
      <div className="mt-8 flex items-center">
        <Image
          alt=""
          aria-hidden="true"
          className="h-14 w-14 rounded-full object-cover"
          height={97}
          src={avatar}
          width={97}
        />
        <div className="ml-4">
          <p className="font-normal text-[18px] leading-[22px]">{author}</p>
          <p className="mt-1 text-[14px] text-[rgba(255,255,255,0.65)] leading-[20px]">
            {role}
            <br />
            {company}
          </p>
        </div>
      </div>
      <Image
        alt={logo.alt}
        className="mt-8 h-auto w-[120px]"
        height={logo.height}
        src={logo.src}
        style={{ height: "auto" }}
        width={logo.width}
      />
    </article>
  );
}
