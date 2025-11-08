import { useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";
import { projectsData } from "@/data/projectsData";
import FloatingEffect from "@/components/ui/effect/FloatingEffect";
import TargetCursor from "@/components/ui/effect/TargetCursor";
import Noise from "@/components/ui/effect/Noise";

const Hero = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const shapeRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: window.innerWidth > 640 ? "bottom center" : "bottom 90%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        rotate: 180,
        yPercent: 500,
        ease: "none",
      });

      tl.to(
        shapeRef.current,
        {
          opacity: 0,
          yPercent: 500,
          ease: "none",
        },
        0
      );
    },
    { scope: sectionRef }
  );

  useIntroAnimation(sectionRef, containerRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-bg text-text font-fake text-[15px] py-24 px-4">
      <div
        ref={containerRef}
        className="size-full flex flex-col justify-between items-center max-sm:items-center max-xl:items-start max-xl:overflow-hidden">
        <div />

        <div className="max-sm:hidden">
          <TargetCursor containerRef={sectionRef} />
        </div>
        <FloatingEffect intensity={8} className="relative size-full flex justify-center items-center">
          <div
            ref={textRef}
            className="cursor-target relative overflow-hidden max-w-sm border border-main z-10 p-1 space-y-2">
            <Noise />

            <h2>Abdelrahman NGM</h2>
            <p>
              Audio Engineer/Producer with over 10 years of experience in recording, producing, mixing, mastering, and
              sound designing. Worked with major brands such as Nike (Burj Khalifa commercial). Skilled in analog &
              digital consoles, microphones, and studio systems. Currently recording Riyad as-Salihin and White Nights
              audiobook. Seeking to transition into Live Dialogue Sound engineering.
            </p>

            <div className="flex flex-wrap justify-end mt-3">
              {["Pro Tools", "Ableton Live", "Reaper", "FL Studio"].map((tool) => (
                <span key={tool} className="text-[11px] px-2 border-x border-main/60">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </FloatingEffect>

        <div ref={shapeRef} className="flex flex-col gap-2 z-0 max-md:rotate-180">
          <div className="flex items-center gap-2">
            <h6>Projects</h6>
            <div className="w-full h-px bg-main"></div>
            <h6>Projects</h6>
            <div className="w-full h-px bg-main"></div>
            <h6>Projects</h6>
            <div className="w-full h-px bg-main"></div>
            <h6>Projects</h6>
          </div>

          <div className="flex">
            {projectsData().map((project, index) => (
              <div key={index} className="group border-y border-main py-1.5 select-none">
                <h3>{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
