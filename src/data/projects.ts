export type Project = {
  id: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  imageUrl: string;
  type: 'experience' | 'academic';
};

export const projects: Project[] = [
  {
    id: 'geospatial-visualization',
    title: 'Geospatial Visualization Platform',
    role: 'Lead Developer',
    duration: '2021 – 2023',
    description: 'Built a scalable platform for visualizing and analyzing geospatial data using OpenLayer, GeoServer, and PostGIS.',
    achievements: [
      'Enabled real-time geospatial data analysis for agriculture and manufacturing sectors',
      'Integrated advanced mapping and visualization features',
    ],
    technologies: ['OpenLayer', 'GeoServer', 'PostGIS', 'React', 'Node.js'],
    imageUrl: '/images/projects/geospatial.png',
    type: 'academic',
  },
  {
    id: 'ai-disease-detection',
    title: 'AI-driven Disease Detection',
    role: 'Data Scientist',
    duration: '2020 – 2021',
    description: 'Developed machine learning models for early detection of crop diseases using TensorFlow and OpenCV.',
    achievements: [
      'Improved crop disease detection accuracy by 30%',
      'Deployed models in production for real-time inference',
    ],
    technologies: ['TensorFlow', 'OpenCV', 'Python', 'Pandas'],
    imageUrl: '/images/projects/disease-detection.png',
    type: 'academic',
  },
  {
    id: 'automated-petition-system',
    title: 'Automated Petition System',
    role: 'Full-Stack Engineer',
    duration: '2019 – 2020',
    description: 'Designed and implemented a full-stack system for automating petition workflows, reducing manual effort and turnaround time.',
    achievements: [
      'Reduced petition processing time by 50%',
      'Automated notifications and document management',
    ],
    technologies: ['Django', 'React', 'PostgreSQL', 'AWS'],
    imageUrl: '/images/projects/petition-system.png',
    type: 'experience',
  },
  {
    id: 'team-lead',
    title: 'Data Scientist & Team Lead',
    role: 'Team Lead',
    duration: '2018 – Present',
    description: 'Led AI-driven disease detection, geospatial visualization, and automated petition systems for agriculture, manufacturing, and power sectors.',
    achievements: [
      'Achieved significant efficiency gains and cost reductions',
      'Managed cross-functional teams and project delivery',
    ],
    technologies: ['Python', 'React', 'AWS', 'GCP', 'PostgreSQL'],
    imageUrl: '/images/projects/team-lead.png',
    type: 'experience',
  },
]; 