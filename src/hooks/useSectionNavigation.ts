import { useCallback, useEffect, useState } from "react";
import {
  isPortfolioSectionId,
  type PortfolioSectionId,
} from "@/content/sections";

function readSectionFromHash(): PortfolioSectionId {
  const value = window.location.hash.slice(1);
  return isPortfolioSectionId(value) ? value : "home";
}

function useSectionNavigation() {
  const [activeSection, setActiveSection] =
    useState<PortfolioSectionId>(readSectionFromHash);

  useEffect(() => {
    const syncSection = () => {
      const hashValue = window.location.hash.slice(1);

      if (hashValue && !isPortfolioSectionId(hashValue)) {
        window.history.replaceState(null, "", "#home");
      }

      setActiveSection(readSectionFromHash());
    };

    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);

  const navigateTo = useCallback((section: PortfolioSectionId) => {
    if (window.location.hash === `#${section}`) {
      setActiveSection(section);
      return;
    }

    window.location.hash = section;
  }, []);

  return { activeSection, navigateTo };
}

export default useSectionNavigation;
