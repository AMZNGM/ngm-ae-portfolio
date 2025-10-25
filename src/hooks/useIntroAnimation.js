import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";

export const useIntroAnimation = (sectionRef, contentRef) => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.fromTo(
      sectionRef.current,
      {
        backgroundColor: "#ffffff",
        clipPath: "inset(0 100% 0 0)",
      },
      {
        backgroundColor: "#ffffff",
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
      }
    );
    tl.to(sectionRef.current, {
      backgroundColor: "var(--color-bg)",
      clipPath: "inset(0 0% 0 100%)",
      duration: 1.2,
    });
    tl.to(sectionRef.current, {
      clipPath: "inset(0 0% 0 0%)",
      duration: 0.8,
    });
    tl.fromTo(contentRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, []);
};
