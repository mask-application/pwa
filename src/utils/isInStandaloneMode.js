export const isInStandaloneMode = () =>
  ('standalone' in window.navigator && window.navigator.standalone) ||
  matchMedia('(display-mode: standalone)').matches;
