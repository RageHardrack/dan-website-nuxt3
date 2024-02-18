import { Notion, NotionClient } from "~~/vendors";
import type {
  ChildDatabase,
  ContentBlock,
  ExperienceNotionResponse,
  IExperience,
  IPageContent,
  IProject,
  ISkill,
  ProjectResponse,
  RawContentBlock,
  SkillResponse,
} from "~~/interfaces";
import { PropertiesTransformer } from "~~/utils";
import { blockContentAdapter } from "~~/adapters";

const { portfolioPage } = useRuntimeConfig();

class PortfolioServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAllChildDatabases(): Promise<ChildDatabase[]> {
    const blocks = await this.NotionClient.getPageContent<RawContentBlock[]>(
      this.databaseId
    );

    // TODO: Corregir tipo
    const childDatabases: ChildDatabase[] = blocks.map((block) => {
      if (block.type === "child_database")
        return {
          object: block.object,
          id: block.id,
          type: block.type,
          title: block["child_database"].title,
        };
    });

    return childDatabases;
  }

  async findProjects(blockId: string): Promise<IProject[]> {
    const projectsDatabase = await this.NotionClient.getDatabase<
      ProjectResponse[]
    >(blockId, {
      sorts: [{ property: "Orden", direction: "ascending" }],
    });

    const projects = projectsDatabase.map((project) => {
      return {
        object: project.object,
        id: project.id,
        properties: PropertiesTransformer.GetProjectProperties(
          project.properties
        ),
      };
    });

    return projects;
  }

  async getProjectContent(projectId: string): Promise<ContentBlock[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      RawContentBlock[]
    >(projectId, {
      page_size: 100,
    });

    return listBlockChildren
      .filter((block: RawContentBlock) => block.type !== "child_database")
      .map((block: RawContentBlock) => {
        return blockContentAdapter(block);
      });
  }

  async findSkills(blockId: string): Promise<ISkill[]> {
    const skillsDatabase = await this.NotionClient.getDatabase<SkillResponse[]>(
      blockId,
      { sorts: [{ property: "Orden", direction: "ascending" }] }
    );

    const skills = skillsDatabase.map((skill) => {
      return {
        object: skill.object,
        id: skill.id,
        properties: PropertiesTransformer.GetSkillProperties(skill.properties),
      };
    });

    return skills;
  }

  async findExperience(blockId: string): Promise<IExperience[]> {
    const experienceDatabase = await this.NotionClient.getDatabase<
      ExperienceNotionResponse[]
    >(blockId, { sorts: [{ property: "Orden", direction: "ascending" }] });

    const experience = experienceDatabase.map((xp) => {
      return {
        object: xp.object,
        id: xp.id,
        properties: PropertiesTransformer.GetExperienceProperties(
          xp.properties
        ),
      };
    });

    return experience;
  }

  async getPortfolioContent(): Promise<ContentBlock[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      RawContentBlock[]
    >(this.databaseId, {
      page_size: 100,
    });

    return listBlockChildren
      .filter((block: RawContentBlock) => block.type !== "child_database")
      .map((block: RawContentBlock) => {
        return blockContentAdapter(block);
      });
  }
}

export const PortfolioService = new PortfolioServices(Notion, portfolioPage);
