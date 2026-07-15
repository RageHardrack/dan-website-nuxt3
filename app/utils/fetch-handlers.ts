import type {
  ApiResponseContentBlock,
  ISkill,
  IExperience,
  PortfolioPageApiResponse,
  IPost,
} from '~/interfaces';

export const fetchAboutPage = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  const [about, skills, experiences] = await Promise.all([
    $fetch<ApiResponseContentBlock>(`${baseUrl}/about-me`),
    $fetch<ISkill[]>(`${baseUrl}/skills`),
    $fetch<IExperience[]>(`${baseUrl}/experience`),
  ]);

  return {
    about,
    skills,
    experiences,
  };
};

export const fetchBlogPage = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  return $fetch<{ posts: IPost[] }>(`${baseUrl}/blog`);
};

export const fetchPortfolioPage = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  return $fetch<PortfolioPageApiResponse>(`${baseUrl}/portfolio`);
};
