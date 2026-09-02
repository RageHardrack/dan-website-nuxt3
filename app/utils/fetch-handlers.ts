import type {
  ContentBlock,
  ISkill,
  IExperience,
  PortfolioPageApiResponse,
  IPost,
  ILink,
} from '~/interfaces';

export interface AboutPageData {
  about: ContentBlock[];
  skills: ISkill[];
  experiences: IExperience[];
}

export const fetchAboutPage = async (): Promise<AboutPageData> => {
  const baseUrl = useApiBase();

  const [about, skills, experiences] = await Promise.all([
    $fetch<ContentBlock[]>(`${baseUrl}/about-me`),
    $fetch<ISkill[]>(`${baseUrl}/skills`),
    $fetch<IExperience[]>(`${baseUrl}/experience`),
  ]);

  return {
    about: about || [],
    skills: skills || [],
    experiences: experiences || [],
  };
};

export const fetchBlogPage = async () => {
  const baseUrl = useApiBase();
  return $fetch<{ posts: IPost[] }>(`${baseUrl}/blog`);
};

export const fetchPortfolioPage = async () => {
  const baseUrl = useApiBase();
  return $fetch<PortfolioPageApiResponse>(`${baseUrl}/portfolio`);
};

export const fetchLinksPage = async (): Promise<ILink[]> => {
  const baseUrl = useApiBase();
  return $fetch<ILink[]>(`${baseUrl}/links`);
};
