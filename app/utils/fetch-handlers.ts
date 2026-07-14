import type {
  ApiResponseContentBlock,
  ISkill,
  IExperience,
  PortfolioPageApiResponse,
  IPost,
} from "~/interfaces";

export const fetchAboutPage = async () => {
  const [about, skills, experiences] = await Promise.all([
    $fetch<ApiResponseContentBlock>("/api/about-me"),
    $fetch<ISkill[]>("/api/skills"),
    $fetch<IExperience[]>("/api/experience"),
  ]);

  return {
    about,
    skills,
    experiences,
  };
};

export const fetchBlogPage = async () => {
  return $fetch<{ posts: IPost[] }>("/api/blog");
};

export const fetchPortfolioPage = async () => {
  return $fetch<PortfolioPageApiResponse>("/api/portfolio");
};
