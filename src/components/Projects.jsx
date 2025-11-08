import { useRef, useState, useCallback } from "react";
import { gsap } from "@/utils/gsapConfig";
import { projectsData } from "@/data/projectsData";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";

const Projects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const detailsRefs = useRef([]);
  const animatingRef = useRef(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useIntroAnimation(sectionRef, containerRef);

  const handleProjectClick = useCallback(
    (index) => {
      if (animatingRef.current) return;

      animatingRef.current = true;

      if (expandedIndex === index) {
        // Close current
        gsap.to(detailsRefs.current[index], {
          height: 0,
          opacity: 0,
          duration: 0.9,
          ease: "power2.inOut",
          onComplete: () => {
            setExpandedIndex(null);
            animatingRef.current = false;
          },
        });
      } else {
        const closeAndOpen = () => {
          // Open new
          setExpandedIndex(index);
          gsap.fromTo(
            detailsRefs.current[index],
            { height: 0, opacity: 0 },
            {
              height: "auto",
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              onComplete: () => {
                animatingRef.current = false;
              },
            }
          );
        };

        // Close previous if exists
        if (expandedIndex !== null) {
          gsap.to(detailsRefs.current[expandedIndex], {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: closeAndOpen,
          });
        } else {
          closeAndOpen();
        }
      }
    },
    [expandedIndex]
  );

  return (
    <section ref={sectionRef} className="relative w-screen overflow-hidden bg-bg text-text py-12 px-4">
      <div ref={containerRef} className="relative">
        <div className="grid grid-cols-5 max-md:grid-cols-2 mb-2">
          <div className="flex items-center">
            <h2>Projects</h2>
            <div className="w-full h-px bg-text ms-2"></div>
          </div>
          <div className="flex items-center max-md:hidden">
            <div className="w-full h-px bg-text me-2"></div>
            <h2>Client</h2>
          </div>
          <div className="flex items-center max-md:hidden">
            <div className="w-full h-px bg-text mx-2"></div>
            <h2>Category</h2>
          </div>
          <div className="flex items-center max-md:hidden">
            <div className="w-full h-px bg-text mx-2"></div>
            <h2>Status</h2>
          </div>
          <div className="flex items-center">
            <div className="w-full h-px bg-text mx-2 max-md:ms-0"></div>
            <h2>Year</h2>
          </div>
        </div>

        <div className="flex flex-col">
          {projectsData().map((project, index) => (
            <div key={index} className={`border-b border-main ${index === 0 ? "border-t" : ""}`}>
              <div
                onClick={() => handleProjectClick(index)}
                className={`group py-1.5 cursor-pointer hover:bg-text hover:text-bg duration-100 ${expandedIndex === index ? "bg-text text-bg" : ""
                  }`}>
                <div className="grid grid-cols-5 justify-between items-center text-right">
                  <h3 className="truncate group-hover:translate-x-4 duration-300 max-md:col-span-4 text-left">
                    {project.title}
                  </h3>
                  <h3 className="truncate group-hover:translate-x-4 duration-300 max-md:hidden">{project.client}</h3>
                  <h3 className="truncate group-hover:translate-x-4 duration-300 max-md:hidden">{project.category}</h3>
                  <h3 className="truncate group-hover:translate-x-4 duration-300 max-md:hidden">{project.status}</h3>
                  <h3 className="truncate group-hover:-translate-x-4 duration-300 max-md:col-span-1">{project.year}</h3>
                </div>
              </div>

              <div
                ref={(el) => (detailsRefs.current[index] = el)}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}>
                <div className="px-4 py-6 border-t border-main">
                  <div className="grid md:grid-cols-5 gap-6">
                    <div className="space-y-4 col-span-2 max-w-md">
                      <div>
                        <p className="text-sm opacity-60 mb-1">Title</p>
                        <p className="text-base">{project.title}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-60 mb-1">Description</p>
                        <p className="text-base">{project.description}</p>
                      </div>

                      {project.ft && (
                        <div>
                          <p className="text-sm opacity-60 mb-1">Featuring</p>
                          <p className="text-base">{project.ft}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-sm opacity-60 mb-1">Credits</p>
                        <p className="text-base">{project.credits}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {project.mediaUrl && (
                        <div>
                          <p className="text-sm opacity-60 mb-2">Media</p>
                          <a
                            href={project.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 border border-b-0 border-main hover:bg-text hover:text-bg duration-200 text-sm">
                            Watch on {project.mediaType} →
                          </a>
                        </div>
                      )}

                      {project.spotifyLink && (
                        <div>
                          <p className="text-sm opacity-60 mb-2">Listen</p>
                          <a
                            href={project.spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 border border-b-0 border-main hover:bg-text hover:text-bg duration-200 text-sm">
                            Listen on Spotify →
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="col-span-2">
                      {project.mediaUrl && project.mediaType === "Youtube" && (
                        <div>
                          <p className="text-xs text-main mb-2">Preview</p>
                          <div className="aspect-video bg-bg overflow-hidden">
                            <iframe
                              src={project.mediaUrl.replace("watch?v=", "embed/")}
                              className="w-full h-full"
                              allowFullScreen
                              title={`${project.title} video`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
