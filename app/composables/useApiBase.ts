export const useApiBase = (): string => {
  const config = useRuntimeConfig();
  if (import.meta.server) {
    return (config.apiBaseUrl as string) || config.public.apiBaseUrl;
  }
  return config.public.apiBaseUrl;
};
