import Image from "next/image";
import Link from "next/link";

interface ProjectSectionProps {
  projectRef: React.RefObject<HTMLDivElement | null>;
  circleProjectRef: React.RefObject<HTMLDivElement | null>;
  projectCardRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProjectSection2({
  projectRef,
  circleProjectRef,
  projectCardRef,
}: ProjectSectionProps) {
  return (
    <>
      {/* BACKGROUND */}
      <section
        ref={projectRef}
        className="fixed inset-0 z-[80] opacity-0 pointer-events-none"
      >
        <Image
          src="/assets/images/project-1/project-3.webp"
          alt="Project Background"
          fill
          priority
          className="object-cover"
        />

        {/* RIGHT FLOATING CARD */}
        <div
          ref={projectCardRef}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            w-[340px] sm:w-[360px]
            bg-white  shadow-xl
            ponter-events-none
            overflow-hidden
          "
        >
          {/* Card Image */}
          <div className="relative w-full h-[300px]">
            <Image
              src="/assets/images/cards/edmont.webp"
              alt="One Marina"
              fill
              className="object-cover"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 py-3">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Text */}
          <div className="px-6 pb-6 text-center">
            <h3 className="text-xl font-light text-black tracking-widest">
              EDMONT
            </h3>
            <p className="text-xs tracking-[0.3em] mt-1 text-gray-500">
              KANDIVALI WEST
            </p>

            <Link href="/projects"> <button className="mt-6 text-sm tracking-widest text-blue-700 hover:underline  pointer-events-auto">
              VIEW PROJECT
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ENTRY CIRCLE */}
      <div
        ref={circleProjectRef}
        className="fixed inset-0 z-[85] pointer-events-none opacity-0"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          backgroundColor: "#FEF7F0",
        }}
      />
    </>
  );
}
