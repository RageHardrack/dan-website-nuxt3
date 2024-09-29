const { prodEnv, devEnv, environment } = useRuntimeConfig();

export const getEnvironmentId = (): string =>
  environment === "dev" ? devEnv : prodEnv;
