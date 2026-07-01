import Image from "next/image";

const footerNavigation = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Book a demo", href: "#book-a-demo" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Events", href: "#events" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about-us" },
      { label: "Contact us", href: "#contact-us" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Terms of Service", href: "#terms-of-service" },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "#youtube",
    icon: "/homepage/footer/youtube.svg",
    width: 17,
    height: 12,
  },
  {
    label: "Twitter",
    href: "#twitter",
    icon: "/homepage/footer/twitter.svg",
    width: 15,
    height: 13,
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: "/homepage/footer/linkedin.svg",
    width: 15,
    height: 15,
  },
];

export function HomepageFooter() {
  return (
    <footer className="w-full bg-[#000000] text-[#ffffff]">
      <div className="mx-auto flex min-h-[457px] w-full max-w-[1440px] flex-col px-5 pt-16 pb-16 md:flex-row md:items-start md:px-10 lg:h-[457px] lg:px-[80px] lg:pt-[112px] lg:pb-0">
        <div className="h-[120px] w-[105px] shrink-0">
          <Image
            alt="Welcome"
            height={120}
            priority
            src="/homepage/footer/welcome-mark.svg"
            width={105}
          />
        </div>

        <nav
          aria-label="Footer navigation"
          className="mt-14 grid gap-10 md:mt-0 md:ml-24 md:grid-cols-3 lg:ml-[243px] lg:grid-cols-[120px_120px_140px] lg:gap-[202px]"
        >
          {footerNavigation.map((group) => (
            <section className="flex flex-col" key={group.title}>
              <h2 className="font-normal text-[18px] text-[rgba(255,255,255,0.65)] leading-[22px]">
                {group.title}
              </h2>
              <ul className="mt-[22px] flex flex-col gap-[19px]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="font-normal text-[#ffffff] text-[18px] leading-[22px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>

      <div className="border-[rgba(255,255,255,0.1)] border-t">
        <div className="mx-auto flex min-h-[78px] w-full max-w-[1440px] flex-col gap-8 px-5 py-7 md:flex-row md:items-center md:gap-0 md:px-10 md:py-0 lg:h-[78px] lg:px-[80px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
            <p className="font-normal text-[14px] text-[rgba(255,255,255,0.65)] leading-[17px]">
              &copy; 2022 Welcome. All right reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 md:ml-10 md:gap-x-7">
              {legalLinks.map((link) => (
                <a
                  className="font-normal text-[14px] text-[rgba(255,255,255,0.65)] leading-[17px] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 md:ml-auto">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="flex h-[20px] w-[20px] items-center justify-center transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-4"
                href={link.href}
                key={link.label}
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  height={link.height}
                  src={link.icon}
                  width={link.width}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
