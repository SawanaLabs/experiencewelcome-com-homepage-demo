import type { NavbarCopy } from "@/components/navbar";

export interface HomepageHeaderCopy {
  previewAlt: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  subtitle: string;
  title: string;
}

export interface HomepageTestimonialCopy {
  author: string;
  company: string;
  logoAlt: string;
  quote: string;
  role: string;
}

export interface HomepageCustomerStoriesCopy {
  nextStoryLabel: string;
  previousStoryLabel: string;
  testimonials: HomepageTestimonialCopy[];
  title: string;
}

export interface HomepageFooterCopy {
  copyright: string;
  legalLinks: Array<{
    label: string;
  }>;
  logoAlt: string;
  navigation: Array<{
    links: Array<{
      label: string;
    }>;
    title: string;
  }>;
  socialLinks: Array<{
    label: string;
  }>;
}

export interface HomepageCopy {
  customerStories: HomepageCustomerStoriesCopy;
  footer: HomepageFooterCopy;
  header: HomepageHeaderCopy;
  navbar: NavbarCopy;
}

type Translate = (key: string) => string;

interface HomepageCopyTranslators {
  customerStories: Translate;
  footer: Translate;
  header: Translate;
  navbar: Translate;
}

export function createHomepageCopy({
  customerStories,
  footer,
  header,
  navbar,
}: HomepageCopyTranslators): HomepageCopy {
  return {
    customerStories: {
      nextStoryLabel: customerStories("nextStoryLabel"),
      previousStoryLabel: customerStories("previousStoryLabel"),
      testimonials: ["salesforce", "bitwise", "dribbble"].map(
        (testimonialKey) => ({
          author: customerStories(`testimonials.${testimonialKey}.author`),
          company: customerStories(`testimonials.${testimonialKey}.company`),
          logoAlt: customerStories(`testimonials.${testimonialKey}.logoAlt`),
          quote: customerStories(`testimonials.${testimonialKey}.quote`),
          role: customerStories(`testimonials.${testimonialKey}.role`),
        })
      ),
      title: customerStories("title"),
    },
    footer: {
      copyright: footer("copyright"),
      legalLinks: [
        { label: footer("legalLinks.privacyPolicy") },
        { label: footer("legalLinks.termsOfService") },
      ],
      logoAlt: footer("logoAlt"),
      navigation: [
        {
          links: [
            { label: footer("navigation.product.links.features") },
            { label: footer("navigation.product.links.pricing") },
            { label: footer("navigation.product.links.bookDemo") },
          ],
          title: footer("navigation.product.title"),
        },
        {
          links: [
            { label: footer("navigation.explore.links.events") },
            { label: footer("navigation.explore.links.blog") },
          ],
          title: footer("navigation.explore.title"),
        },
        {
          links: [
            { label: footer("navigation.company.links.aboutUs") },
            { label: footer("navigation.company.links.contactUs") },
          ],
          title: footer("navigation.company.title"),
        },
      ],
      socialLinks: [
        { label: footer("socialLinks.youtube") },
        { label: footer("socialLinks.twitter") },
        { label: footer("socialLinks.linkedin") },
      ],
    },
    header: {
      previewAlt: header("previewAlt"),
      primaryCtaLabel: header("primaryCtaLabel"),
      secondaryCtaLabel: header("secondaryCtaLabel"),
      subtitle: header("subtitle"),
      title: header("title"),
    },
    navbar: {
      accountNavigation: [
        { href: "#support", label: navbar("accountNavigation.support") },
        { href: "#login", label: navbar("accountNavigation.login") },
      ],
      brandAriaLabel: navbar("brandAriaLabel"),
      demoLabel: navbar("demoLabel"),
      languageLabel: navbar("languageLabel"),
      primaryNavigation: [
        { href: "#features", label: navbar("primaryNavigation.features") },
        { href: "#pricing", label: navbar("primaryNavigation.pricing") },
        { href: "#events", label: navbar("primaryNavigation.events") },
        { href: "#about", label: navbar("primaryNavigation.about") },
        { href: "#blog", label: navbar("primaryNavigation.blog") },
      ],
    },
  };
}
