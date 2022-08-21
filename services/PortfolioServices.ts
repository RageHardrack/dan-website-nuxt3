import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import {
  ContentBlock,
  IProject,
  ISkill,
  ProjectResponse,
  SkillResponse,
} from "~~/interfaces";
import {
  projectPropertiesTransformer,
  skillPropertiesTransformer,
} from "~~/utils";

class PortfolioServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAllChildDatabases(): Promise<ContentBlock[]> {
    const blocks = await this.NotionClient.getPageContent<ContentBlock[]>(
      this.databaseId
    );

    return blocks;
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
}

export const PortfolioService = new PortfolioServices(
  Notion,
  DATABASES_ID.PORTFOLIO_ID
);
