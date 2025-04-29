import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/data/projects');

export function getSortedProjectsData() {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory).filter(fileName => 
    fileName.endsWith('.md') || fileName.endsWith('.mdx')
  );
  
  const allProjectsData = fileNames.map((fileName) => {
    // Remove ".md" or ".mdx" from file name to get id
    const id = fileName.replace(/\.(md|mdx)$/, '');

    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort projects by date
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllProjectIds() {
  const fileNames = fs.readdirSync(projectsDirectory).filter(fileName => 
    fileName.endsWith('.md') || fileName.endsWith('.mdx')
  );
  
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.(md|mdx)$/, ''),
      },
    };
  });
}

export async function getProjectData(id) {
  let fullPath = path.join(projectsDirectory, `${id}.md`);
  
  // Check if .md file exists, if not try .mdx
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(projectsDirectory, `${id}.mdx`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the project metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  };
}

export function getFeaturedProjects() {
  const allProjects = getSortedProjectsData();
  return allProjects.filter(project => project.featured);
}
