import Image from "next/image";

const primaryNavigation = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

const accountNavigation = [
  { label: "Support", href: "#support" },
  { label: "Login", href: "#login" },
];

const linkFocusClasses =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4";

export function HomepageHeader() {
  return (
    <header className="w-full bg-[#000000] text-[#ffffff]">
      <div className="relative mx-auto hidden h-[min(1142px,79.306vw)] w-full max-w-[1440px] overflow-hidden bg-[#000000] lg:block">
        <div
          className="absolute top-0 left-0 z-50 h-[min(69.8px,4.847vw)] w-full border-[rgba(255,255,255,0.1)] border-b bg-[rgba(0,0,0,0.8)]"
          data-figma-layer="header/nav"
        >
          <a
            aria-label="Welcome home"
            className={`absolute top-[min(18px,1.25vw)] left-[min(80px,5.556vw)] flex items-center gap-[min(8px,0.556vw)] transition-opacity hover:opacity-80 ${linkFocusClasses}`}
            href="#top"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-[min(32px,2.222vw)] w-[min(28px,1.944vw)]"
              height={120}
              priority
              src="/homepage/footer/welcome-mark.svg"
              width={105}
            />
            <span className="font-semibold text-[min(20px,1.389vw)] leading-[min(24px,1.667vw)]">
              welcome
            </span>
          </a>

          <nav aria-label="Primary navigation">
            <ul className="absolute top-[min(27px,1.875vw)] left-[min(549px,38.125vw)] flex items-center gap-[min(32px,2.222vw)]">
              {primaryNavigation.map((link) => (
                <li key={link.label}>
                  <a
                    className={`font-normal text-[min(14px,0.972vw)] leading-[min(17px,1.181vw)] transition-opacity hover:opacity-70 ${linkFocusClasses}`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Account navigation">
            <ul className="absolute top-[min(11px,0.764vw)] right-[min(80px,5.556vw)] flex items-center gap-[min(24px,1.667vw)]">
              {accountNavigation.map((link) => (
                <li key={link.label}>
                  <a
                    className={`font-normal text-[min(14px,0.972vw)] leading-[min(17px,1.181vw)] transition-opacity hover:opacity-70 ${linkFocusClasses}`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  className={`flex h-[min(47px,3.264vw)] min-w-[min(90px,6.25vw)] items-center justify-center rounded-full bg-[#5865ff] px-[min(24px,1.667vw)] font-normal text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)] transition-opacity hover:opacity-90 ${linkFocusClasses}`}
                  href="#demo"
                >
                  Demo
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          aria-hidden="true"
          className="absolute top-[min(283.81px,19.709vw)] left-[max(-280px,-19.444vw)] z-0 h-[min(823.73px,57.204vw)] w-[min(2000px,138.889vw)]"
          data-figma-layer="header/home-hero-blur"
        >
          <Image
            alt=""
            className="h-full w-full object-fill"
            height={659}
            priority
            src="/homepage/header/home-hero-blur.png"
            width={1600}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute top-[min(403.42px,28.015vw)] left-[min(41.6px,2.889vw)] z-10 h-[min(656.34px,45.579vw)] w-[min(1356.8px,94.222vw)]"
          data-figma-layer="header/home-hero-mockup"
        >
          <Image
            alt=""
            className="h-full w-full object-fill"
            height={774}
            priority
            src="/homepage/header/home-hero-mockup.png"
            width={1600}
          />
        </div>

        <div
          className="absolute top-[min(406.1px,28.201vw)] left-[min(172.8px,12vw)] z-20 h-[min(606.55px,42.122vw)] w-[min(1088px,75.556vw)] rounded-[min(16px,1.111vw)] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.002)]"
          data-figma-layer="header/hero-card"
        >
          <Image
            alt="Launch day webinar preview"
            className="absolute top-[-6.76%] left-[-10.29%] h-[126.12%] w-[114.52%] max-w-none object-fill"
            height={765}
            priority
            src="/homepage/header/home-hero-card.png"
            width={1246}
          />
        </div>

        <div
          className="absolute top-[min(16px,1.111vw)] left-[min(80px,5.556vw)] z-40 h-[min(289.38px,20.096vw)] w-[min(1280px,88.889vw)]"
          data-figma-layer="header/content"
        >
          <h1 className="absolute top-[min(80px,5.556vw)] left-0 w-full text-center font-normal text-[min(100px,6.944vw)] leading-[min(108px,7.5vw)] tracking-[0]">
            Captivate &amp; Convert
          </h1>
          <p className="absolute top-[min(207px,14.375vw)] left-1/2 w-[min(610px,42.361vw)] -translate-x-1/2 text-center font-normal text-[min(24px,1.667vw)] text-[rgba(255,255,255,0.65)] leading-[min(30px,2.083vw)] tracking-[0]">
            A webinar platform designed for marketers to host jaw-dropping
            experiences that drive revenue.
          </p>

          <div
            className="absolute top-[min(283.38px,19.679vw)] left-1/2 flex h-[min(50px,3.472vw)] -translate-x-1/2 items-center gap-[min(8px,0.556vw)]"
            data-figma-layer="header/content/cta"
          >
            <a
              className={`flex h-full items-center justify-center rounded-full bg-[#5865ff] px-[min(24px,1.667vw)] font-normal text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)] transition-opacity hover:opacity-90 ${linkFocusClasses}`}
              href="#demo"
            >
              Demo
            </a>
            <a
              className={`flex h-full items-center justify-center gap-[min(12px,0.833vw)] rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(0,0,0,0.2)] px-[min(24px,1.667vw)] font-normal text-[min(16px,1.111vw)] leading-[min(20px,1.389vw)] transition-opacity hover:opacity-80 ${linkFocusClasses}`}
              href="#how-it-works"
            >
              <span
                aria-hidden="true"
                className="h-0 w-0 border-y-[min(5px,0.347vw)] border-y-transparent border-l-[#ffffff] border-l-[min(8px,0.556vw)]"
              />
              How it works
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-5 pt-5 pb-16 lg:hidden">
        <div className="relative z-20 flex items-center justify-between border-[rgba(255,255,255,0.1)] border-b pb-5">
          <a
            aria-label="Welcome home"
            className={`flex items-center gap-2 transition-opacity hover:opacity-80 ${linkFocusClasses}`}
            href="#top"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-8 w-7"
              height={120}
              priority
              src="/homepage/footer/welcome-mark.svg"
              width={105}
            />
            <span className="font-semibold text-[20px] leading-6">welcome</span>
          </a>
          <a
            className={`rounded-full bg-[#5865ff] px-5 py-3 font-normal text-[16px] leading-5 ${linkFocusClasses}`}
            href="#demo"
          >
            Demo
          </a>
        </div>

        <div className="relative z-20 mx-auto mt-10 max-w-[640px] text-center">
          <h1 className="font-normal text-[56px] leading-[60px] tracking-[0] sm:text-[72px] sm:leading-[78px]">
            Captivate &amp; Convert
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] font-normal text-[20px] text-[rgba(255,255,255,0.65)] leading-[26px] tracking-[0]">
            A webinar platform designed for marketers to host jaw-dropping
            experiences that drive revenue.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              className={`flex h-[50px] items-center justify-center rounded-full bg-[#5865ff] px-6 font-normal text-[16px] leading-5 ${linkFocusClasses}`}
              href="#demo"
            >
              Demo
            </a>
            <a
              className={`flex h-[50px] items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(0,0,0,0.2)] px-6 font-normal text-[16px] leading-5 ${linkFocusClasses}`}
              href="#how-it-works"
            >
              <span
                aria-hidden="true"
                className="h-0 w-0 border-y-[5px] border-y-transparent border-l-[#ffffff] border-l-[8px]"
              />
              How it works
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 max-w-[760px]">
          <Image
            alt="Launch day webinar preview"
            className="relative z-20 h-auto w-full"
            height={765}
            priority
            src="/homepage/header/home-hero-card.png"
            width={1246}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="absolute top-[-12%] left-1/2 z-0 h-auto w-[145%] max-w-none -translate-x-1/2"
            height={659}
            priority
            src="/homepage/header/home-hero-blur.png"
            width={1600}
          />
        </div>
      </div>
    </header>
  );
}
