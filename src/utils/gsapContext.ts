import gsap from 'gsap'

export function withGSAPContext(
  scope: HTMLElement,
  fn: () => void
) {
  const ctx = gsap.context(fn, scope)
  return () => ctx.revert()
}
