import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import {
  ChildDatabase,
  IProject,
  ISkill,
  ProjectResponse,
  RawContentBlock,
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

  async findAllChildDatabases(): Promise<ChildDatabase[]> {
    const blocks = await this.NotionClient.getPageContent<RawContentBlock[]>(
      this.databaseId
    );

    const childDatabases: ChildDatabase[] = blocks.map((block) => {
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
