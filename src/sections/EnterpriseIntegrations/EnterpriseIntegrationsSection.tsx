import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Users, ShoppingCart, Database, Layers, FolderOpen, Contact, Cloud } from "lucide-react";
import { SectionWrapper } from "../../components/SectionWrapper/SectionWrapper";
import { IDS } from "../../registry/ids";
import shared from "../../styles/shared.module.css";
import styles from "./EnterpriseIntegrationsSection.module.css";
import {
  integrationCards,
  type IntegrationIcon,
  type IntegrationIconName,
} from "./enterpriseIntegrationsContent";

const ICONS: Record<IntegrationIconName, IntegrationIcon> = {
  Users,
  ShoppingCart,
  Database,
  Layers,
  FolderOpen,
  Contact,
  Cloud,
};

export function EnterpriseIntegrationsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [missingLogos, setMissingLogos] = useState<Set<string>>(new Set());

  const markLogoMissing = useCallback((slug: string) => {
    setMissingLogos((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <SectionWrapper
      theme="light"
      reviewId={IDS.enterpriseIntegrations.root}
      ariaLabelledBy="integrations-heading"
    >
      <p className={shared.sectionEyebrow} data-review-id={IDS.enterpriseIntegrations.eyebrow}>
        Enterprise Integrations
      </p>

      <h2
        id="integrations-heading"
        className={shared.sectionTitle}
        data-review-id={IDS.enterpriseIntegrations.heading}
      >
        Works with the systems{" "}
        <span className={shared.highlight}>your teams already depend on.</span>
      </h2>

      <p className={shared.sectionLead} data-review-id={IDS.enterpriseIntegrations.paragraph}>
        XKogni.ai operates between document channels, operational teams, and systems of
        record—adding intelligence and orchestration without disrupting your existing stack.
      </p>

      <div
        className={styles.carouselWrap}
        data-review-id={IDS.enterpriseIntegrations.carousel}
      >
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.track}>
            {integrationCards.map((card, index) => {
              const Icon = ICONS[card.icon];
              const active = index === selectedIndex;
              return (
                <div
                  key={card.name}
                  className={styles.slide}
                  data-review-id={IDS.enterpriseIntegrations.integrationCard(index + 1)}
                >
                  <article className={styles.card} data-active={active}>
                    <div className={styles.iconRing}>
                      {missingLogos.has(card.logoSlug) ? (
                        <Icon size={20} aria-hidden="true" />
                      ) : (
                        <img
                          className={styles.brandLogo}
                          src={`/integrations/${card.logoSlug}`}
                          alt=""
                          aria-hidden="true"
                          onError={() => markLogoMissing(card.logoSlug)}
                        />
                      )}
                    </div>
                    <p className={styles.logo}>{card.name}</p>
                    <div className={styles.divider} aria-hidden="true" />
                    <p className={styles.category}>{card.category}</p>
                    <p className={styles.description}>{card.description}</p>
                    <a href="#integrations" className={styles.learnMore}>
                      Learn more
                    </a>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            data-review-id={IDS.enterpriseIntegrations.prevControl}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous integration"
          >
            <ArrowLeft size={18} />
          </button>

          <div className={styles.dots}>
            {integrationCards.map((card, index) => (
              <button
                key={card.name}
                type="button"
                className={styles.dot}
                data-review-id={IDS.enterpriseIntegrations.paginationDot(index + 1)}
                data-active={index === selectedIndex}
                aria-label={`Go to ${card.name}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.control}
            data-review-id={IDS.enterpriseIntegrations.nextControl}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next integration"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <p className={styles.closingText} data-review-id={IDS.enterpriseIntegrations.closingText}>
        Information enters through the channels teams already use and returns to the systems
        they already trust.
      </p>
    </SectionWrapper>
  );
}
