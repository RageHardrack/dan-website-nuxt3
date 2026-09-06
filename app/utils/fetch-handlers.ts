import type {
  ContentBlock,
  ISkill,
  IExperience,
  PortfolioPageApiResponse,
  IPost,
  ILink,
} from '~/interfaces';

export interface ResilientResult {
  hasError?: boolean;
}

export interface AboutPageData extends ResilientResult {
  about: ContentBlock[];
  skills: ISkill[];
  experiences: IExperience[];
}

export interface BlogPageData extends ResilientResult {
  posts: IPost[];
}

export interface PortfolioPageData
  extends ResilientResult, PortfolioPageApiResponse {}

export const fetchAboutPage = async (): Promise<AboutPageData> => {
  try {
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
  } catch (err) {
    console.warn('Failed to fetch about page data:', err);
    return {
      about: [],
      skills: [],
      experiences: [],
      hasError: true,
    };
  }
};

export const fetchBlogPage = async (): Promise<BlogPageData> => {
  try {
    const baseUrl = useApiBase();
    return await $fetch<{ posts: IPost[] }>(`${baseUrl}/blog`);
  } catch (err) {
    console.warn('Failed to fetch blog page data:', err);
    return {
      posts: [],
      hasError: true,
    };
  }
};

export const fetchPortfolioPage = async (): Promise<PortfolioPageData> => {
  try {
    const baseUrl = useApiBase();
    return await $fetch<PortfolioPageApiResponse>(`${baseUrl}/portfolio`);
  } catch (err) {
    console.warn('Failed to fetch portfolio page data:', err);
    return {
      content: [],
      projects: [],
      hasError: true,
    };
  }
};

export const fetchLinksPage = async (): Promise<ILink[]> => {
  try {
    const baseUrl = useApiBase();
    return (await $fetch<ILink[]>(`${baseUrl}/links`)) || [];
  } catch (err) {
    console.warn('Failed to fetch links page data:', err);
    return [];
  }
};
