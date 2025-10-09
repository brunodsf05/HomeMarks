enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

type ClearKeyNavFunction = () => void;
type Position = { x: number; y: number; };
type KeyName = KeyboardEvent["key"];

type KeyNavSettings = {
  keymap?: Record<KeyName, Direction>;
};

/**
 * Get all focusable elements in the document.
 */
function getFocusableElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`
    a[href],
    button,
    input,
    textarea,
    select,
    [tabindex]:not([tabindex="-1"])
  `)).filter(el => !el.hasAttribute("disabled"));
}

/**
 * Compute the center position of an element.
 */
function getCenter(el: HTMLElement): Position {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Compute a weighted directional distance between elements.
 *
 * Explanation:
 * - Filters out elements that are not in the desired direction.
 * - Calculates Euclidean distance between centers.
 * - Applies angular penalty:
 *    1. ¿Why?
 *       - Because two `targets` might be equally distant, but one is more aligned with `current`.
 *       - We always prefer the `target` more aligned with the intended direction.
 *       - Example: If our `direction` is Right (X-axis), we prefer the element horizontally aligned
 *         with `current` instead of one placed diagonally down-right.
 *
 *    2. ¿How it works?
 *       - A penalty is calculated based on angular deviation.
 *       - The more penalty the more bigger the returned distance will be.
 *
 * @param current - Currently focused element.
 * @param target - Candidate element to move focus to.
 * @param direction - Direction of intended movement.
 * 
 * @returns The distance (with penalty applied). Can return `Infinity` if `target` is not located in the intended `direction`.
 */
function directionalDistance(current: HTMLElement, target: HTMLElement, direction: Direction): number {
  const c = getCenter(current);
  const t = getCenter(target);
  const dx = t.x - c.x;
  const dy = t.y - c.y;
  let isVertical = false;

  switch (direction) {
    case Direction.UP:
      isVertical = true;
      if (dy >= 0) return Infinity;
      break;

    case Direction.DOWN:
      isVertical = true;
      if (dy <= 0) return Infinity;
      break;

    case Direction.LEFT:
      if (dx >= 0) return Infinity;
      break;

    case Direction.RIGHT:
      if (dx <= 0) return Infinity;
      break;
  }

  const distance = Math.sqrt(dx * dx + dy * dy);
  const anglePenalty = isVertical ? Math.abs(dx) / distance : Math.abs(dy) / distance;
  return distance * (1 + anglePenalty);
}

/**
 * Initialize keyboard navigation with optional settings.
 *
 * @param settings - Optional configuration object.
 *
 * `settings.keymap` uses arrows keys as the default.
 *
 * @returns Cleanup function to remove the event listener.
 */
export function initKeyNav(settings: KeyNavSettings = {}): ClearKeyNavFunction {
  // Configuration
  const defaultKeyMap: Record<KeyName, Direction> = {
    ArrowUp: Direction.UP,
    ArrowDown: Direction.DOWN,
    ArrowLeft: Direction.LEFT,
    ArrowRight: Direction.RIGHT,
  };

  const keymap = { ...defaultKeyMap, ...settings.keymap };

  // Focus logic
  const handler = (e: KeyboardEvent) => {
    const direction = keymap[e.key];
    if (direction === undefined) return;

    // List elements to consider focusing
    const focusable = getFocusableElements();
    const current = document.activeElement as HTMLElement | null;
    if (!current || !focusable.includes(current)) return;

    // Search the next element to focus based on direction and distance
    let closest: HTMLElement | null = null;
    let minScore = Infinity;

    for (const el of focusable) {
      if (el === current) continue;

      const score = directionalDistance(current, el, direction);
      if (score < minScore) {
        minScore = score;
        closest = el;
      }
    }

    // Focus
    if (closest) {
      closest.focus();
      e.preventDefault();
    }
  };

  // Event creation/destruction
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}
