export const generateConfigId = (): string => {
  return Math.random().toString(36).substring(7);
};
