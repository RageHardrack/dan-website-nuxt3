import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import {
  ChildDatabase,
  ContentBlock,
  IPageContent,
  IProject,
  ISkill,
  ProjectResponse,
  RawContentBlock,
  SkillResponse,
} from "~~/interfaces";
import {
  blockChildrenTransformer,
  projectPropertiesTransformer,
  skillPropertiesTransformer,
} from "~~/utils";

class PortfolioServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAllChildDatabases(): Promise<ChildDatabase[]> {
    const blocks = await this.NotionClient.getPageContent<RawContentBlock[]>(
      this.databaseId
    );

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
    >(blockId);

    const projects = projectsDatabase.map((project) => {
      return {
        object: project.object,
        id: project.id,
        properties: projectPropertiesTransformer(project.properties),
      };
    });

    return projects;
  }

  async getProjectContent(projectId: string): Promise<IPageContent[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      ContentBlock[]
    >(projectId, {
      page_size: 100,
    });

    return listBlockChildren
      .filter((block: ContentBlock) => block.type !== "child_database")
      .map((block: ContentBlock) => {
        return blockChildrenTransformer(block);
      });
  }

  async findSkills(blockId: string): Promise<ISkill[]> {
    const skillsDatabase = await this.NotionClient.getDatabase<SkillResponse[]>(
      blockId
    );

    const skills = skillsDatabase.map((skill) => {
      return {
        object: skill.object,
        id: skill.id,
        properties: skillPropertiesTransformer(skill.properties),
      };
    });

    return skills;
  }

  async getPortfolioContent(): Promise<IPageContent[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      ContentBlock[]
    >(this.databaseId, {
      page_size: 100,
    });

    return listBlockChildren
      .filter((block: ContentBlock) => block.type !== "child_database")
      .map((block: ContentBlock) => {
        return blockChildrenTransformer(block);
      });
  }
}

export const PortfolioService = new PortfolioServices(
  Notion,
  DATABASES_ID.PORTFOLIO_ID
);
