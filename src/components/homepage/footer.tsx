import Image from "next/image";
import type { HomepageFooterCopy } from "@/i18n/homepage-copy";

const footerNavigation = [
  {
    links: [
      { href: "#features" },
      { href: "#pricing" },
      { href: "#book-a-demo" },
    ],
  },
  {
    links: [{ href: "#events" }, { href: "#blog" }],
  },
  {
    links: [{ href: "#about-us" }, { href: "#contact-us" }],
  },
];

const legalLinks = [{ href: "#privacy-policy" }, { href: "#terms-of-service" }];

const socialLinks = [
  {
    href: "#youtube",
    icon: "/homepage/footer/youtube.svg",
    width: 17,
    height: 12,
  },
  {
    href: "#twitter",
    icon: "/homepage/footer/twitter.svg",
    width: 15,
    height: 13,
  },
  {
    href: "#linkedin",
    icon: "/homepage/footer/linkedin.svg",
    width: 15,
    height: 15,
  },
];

interface HomepageFooterProps {
  copy: HomepageFooterCopy;
}

function assertCopyLength(
  label: string,
  expectedLength: number,
  receivedLength: number
) {
  if (expectedLength !== receivedLength) {
    throw new Error(
      `HomepageFooter expected ${expectedLength} ${label}, received ${receivedLength}.`
    );
  }
}

function getCopyItem<T>(items: T[], index: number, label: string): T {
  const item = items[index];

  if (item === undefined) {
    throw new Error(`HomepageFooter missing ${label} at index ${index}.`);
  }

  return item;
}

function getNavigation(copy: HomepageFooterCopy) {
  assertCopyLength(
    "navigation groups",
    footerNavigation.length,
    copy.navigation.length
  );

  return footerNavigation.map((group, groupIndex) => {
    const groupCopy = getCopyItem(
      copy.navigation,
      groupIndex,
      "navigation group"
    );

    assertCopyLength(
      `links for navigation group "${groupCopy.title}"`,
      group.links.length,
      groupCopy.links.length
    );

    return {
      links: group.links.map((link, linkIndex) => {
        const linkCopy = getCopyItem(
          groupCopy.links,
          linkIndex,
          `link in navigation group "${groupCopy.title}"`
        );

        return {
          ...link,
          label: linkCopy.label,
        };
      }),
      title: groupCopy.title,
    };
  });
}

function getLegalLinks(copy: HomepageFooterCopy) {
  assertCopyLength("legal links", legalLinks.length, copy.legalLinks.length);

  return legalLinks.map((link, index) => ({
    ...link,
    label: getCopyItem(copy.legalLinks, index, "legal link").label,
  }));
}

function getSocialLinks(copy: HomepageFooterCopy) {
  assertCopyLength("social links", socialLinks.length, copy.socialLinks.length);

  return socialLinks.map((link, index) => ({
    ...link,
    label: getCopyItem(copy.socialLinks, index, "social link").label,
  }));
}

export function HomepageFooter({ copy }: HomepageFooterProps) {
  const navigation = getNavigation(copy);
  const legal = getLegalLinks(copy);
  const social = getSocialLinks(copy);

  return (
    <footer className="w-full bg-[#000000] text-[#ffffff]">
      <div className="mx-auto flex min-h-[457px] w-full max-w-[1440px] flex-col px-5 pt-16 pb-16 md:flex-row md:items-start md:px-10 lg:h-[457px] lg:px-[80px] lg:pt-[112px] lg:pb-0">
        <div className="h-[120px] w-[105px] shrink-0">
          <Image
            alt={copy.logoAlt}
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
          {navigation.map((group) => (
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
              {copy.copyright}
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 md:ml-10 md:gap-x-7">
              {legal.map((link) => (
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
            {social.map((link) => (
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
