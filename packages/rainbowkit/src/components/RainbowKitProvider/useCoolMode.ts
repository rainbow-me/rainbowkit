import { useContext, useEffect, useRef } from 'react';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import { CoolModeContext } from './CoolModeContext';

interface Particle {
  direction: number;
  element: HTMLElement;
  left: number;
  size: number;
  speedHorz: number;
  speedUp: number;
  spinSpeed: number;
  spinVal: number;
  top: number;
}

export const useCoolMode = (imageUrl: string | (() => Promise<string>)) => {
  const ref = useRef<HTMLElement>(null);
  const coolModeEnabled = useContext(CoolModeContext);
  const resolvedImageUrl = useAsyncImage(imageUrl);

  useEffect(() => {
    if (coolModeEnabled && ref.current && resolvedImageUrl) {
      return makeElementCool(ref.current, resolvedImageUrl);
    }
  }, [coolModeEnabled, resolvedImageUrl]);

  return ref;
};

const getContainer = () => {
  const id = '_rk_coolMode';
  const existingContainer = document.getElementById(id);

  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement('div');
  container.setAttribute('id', id);
  container.setAttribute(
    'style',
    [
      'overflow:hidden',
      'position:fixed',
      'height:100%',
      'top:0',
      'left:0',
      'right:0',
      'bottom:0',
      'pointer-events:none',
      'z-index:2147483647',
    ].join(';')
  );

  document.body.appendChild(container);

  return container;
};

let instanceCounter = 0;

function makeElementCool(element: HTMLElement, imageUrl: string): () => void {
  instanceCounter++;

  const sizes = [15, 20, 25, 35, 45];
  const limit = 35;

  let particles: Particle[] = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;

  const container = getContainer();

  function createParticle() {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = Math.random() * 10;
    const speedUp = Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement('div');
    particle.innerHTML = `<img src="${imageUrl}" width="${size}" height="${size}" style="border-radius: 25%">`;
    particle.setAttribute(
      'style',
      [
        'position:absolute',
        'will-change:transform',
        `top:${top}px`,
        `left:${left}px`,
        `transform:rotate(${spinVal}deg)`,
      ].join(';')
    );

    container.appendChild(particle);

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    });
  }

  function updateParticles() {
    particles.forEach(p => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (
        p.top >=
        Math.max(window.innerHeight, document.body.clientHeight) + p.size
      ) {
        particles = particles.filter(o => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        'style',
        [
          'position:absolute',
          'will-change:transform',
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
        ].join(';')
      );
    });
  }

  let animationFrame: number | undefined;

  function loop() {
    if (autoAddParticle && particles.length < limit) {
      createParticle();
    }

    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  loop();

  const isTouchInteraction =
    'ontouchstart' in window ||
    // @ts-expect-error
    navigator.msMaxTouchPoints;

  const tap = isTouchInteraction ? 'touchstart' : 'mousedown';
  const tapEnd = isTouchInteraction ? 'touchend' : 'mouseup';
  const move = isTouchInteraction ? 'touchmove' : 'mousemove';

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: false });
  element.addEventListener(tap, tapHandler);
  element.addEventListener(tapEnd, disableAutoAddParticle);
  element.addEventListener('mouseleave', disableAutoAddParticle);

  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener('mouseleave', disableAutoAddParticle);

    // Cancel animation loop once animations are done
    let interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);

        // Clean up container if this is the last instance
        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
}
