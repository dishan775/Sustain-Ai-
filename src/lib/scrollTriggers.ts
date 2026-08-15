import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function createScrubTimeline(
  trigger: string | Element,
  options?: {
    start?: string;
    end?: string;
    pin?: boolean;
    markers?: boolean;
  }
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options?.start ?? 'top 80%',
      end: options?.end ?? 'bottom 20%',
      scrub: 1,
      pin: options?.pin ?? false,
      markers: options?.markers ?? false,
    },
  });
  return tl;
}
