import type * as t from './types';
import { date } from './helpers/date';
import { getTechnologies } from './helpers/technologies';
import './utils/string';
import { distinctByProperty } from './utils/object';
import { tryAddHttps } from './utils/url';

export const mapTechnology = (
  expSource: string,
  group: t.TechnologyGroup,
  name: string,
  expYears: number,
  lastDateUsed: Date,
): t.Technology => ({
  name,
  expYears,
  lastDateUsed,
  group,
  expSource,
  patternIndex: 1,
});

export const mapProjectTechnology = (
  expSource: string,
  group: t.TechnologyGroup,
  name: string,
  expYears?: number,
  lastDateUsed?: Date,
): t.ProjectTechnology => ({
  name,
  expYears,
  lastDateUsed,
  group,
  expSource,
});

const groups = {
  backend: {
    name: 'Backend Development',
    shortName: 'Backend',
  },
  database: {
    name: 'Database Management',
    shortName: 'Database',
  },
  frontend: {
    name: 'Frontend Development',
    shortName: 'Frontend',
  },
  cloud: {
    name: 'Cloud',
  },
  security: {
    name: 'Security',
  },
  testing: {
    name: 'Testing & QA',
  },
  versionControl: {
    name: 'Version Control & Collaboration',
    shortName: 'Version Control',
  },
  algorithms: {
    name: 'Problem Solving & Algorithms',
    shortName: 'Algorithms',
  },
  devops: {
    name: 'DevOps and Deployment',
    shortName: 'DevOps',
  },
};

const expSources = {
  production: 'production',
  selfTaught: 'self-taught',
};

export const data: t.Data = {
  fullName: 'Dmitry Zhukovsky',
  phoneNumber: '+48 730 725 476',
  linkedInUrl: 'www.linkedin.com/in/dmitry-zhukovsky',
  email: 'dmitry.zhukovsky@outlook.com',
  lookingForPosition: '.NET Software Engineer',
  address: {
    country: 'Poland',
    countryCode: 'PL',
    locality: 'Gdansk',
    postalCode: '80-311',
  },
  contractTypes: ['Remote'],
  summary: `
      Highly motivated and inquisitive .NET Software Engineer with over 9 years of experience, including 6+ years in production environments. Specializing in developing high-performance web applications using C#, ASP.NET Core, .NET, and React. Proficient in designing and implementing RESTful APIs and microservices architecture for scalable systems.
      Demonstrated expertise across multiple areas of software development, including:
      - Leveraging Azure for cloud services, deployment, management, and scaling.
      - Managing data access using Dapper and Entity Framework for efficient database interactions.
      - Integrating third-party libraries and APIs from various platforms and payment providers to enhance functionality.
      - Implementing authentication and authorization mechanisms to ensure secure access to application features.
      - Working with version control systems, including Git, Subversion, and TfVC, for efficient code collaboration and version management.
      - Participating in Agile/Scrum processes, collaborating with cross-functional teams to deliver software iterations on schedule.
      - Actively participating in code reviews, ensuring adherence to high-quality coding standards.
      - Measuring system performance in multi-user platforms through test scenarios using automated testing tools, providing analysis and recommendations for performance improvements.
      Thrives in dynamic, collaborative environments, solving complex challenges and delivering robust and high-quality software solutions.
    `,
  languages: [
    {
      code: 'en',
      name: 'English',
      level: 'B2',
    },
    {
      code: 'pl',
      name: 'Polish',
      level: 'A1',
    },
    {
      code: 'ru',
      name: 'Russian',
      level: 'Native speaker',
    },
  ],
  technologies: [
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'Blazor',
      1,
      date('2020'),
    ),
    mapTechnology(expSources.selfTaught, groups.backend, 'C#', 4, date('2024')),
    mapTechnology(
      expSources.selfTaught,
      groups.backend,
      '.NET',
      3,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.backend,
      'Roslyn Analyzers',
      1,
      date('2023'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.backend,
      'Python 3',
      2,
      date('2021'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'WPF',
      4,
      date('2021'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'UWP',
      1.5,
      date('2022'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'WinUI 3',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'React',
      2,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'SCSS',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'TypeScript',
      2,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'Azure DevOps SDK',
      1,
      date('2023'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.frontend,
      'Microsoft Fluent 2',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.devops,
      'YAML',
      1,
      date('2024'),
    ),
    mapTechnology(expSources.selfTaught, groups.devops, 'YML', 1, date('2023')),
    mapTechnology(
      expSources.selfTaught,
      groups.devops,
      'GitHub',
      2,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure Graph API',
      0.5,
      date('2020'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure SQL Databases',
      0.5,
      date('2020'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure App Service',
      1,
      date('2023'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure Static App',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure Storage',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Applications Insights',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure Functions',
      1,
      date('2024'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.cloud,
      'Azure ML Studio',
      0.5,
      date('2023'),
    ),
    mapTechnology(
      expSources.selfTaught,
      groups.versionControl,
      'Git',
      1,
      date('2024'),
    ),
  ],
  projects: [
    {
      name: 'Enterprise-grade data processing platform',
      position: '.NET Software Engineer III',
      company: 'Under NDA',
      companyUrl: undefined,
      companyIconUrl: undefined,
      startDate: new Date('2024-11-01'),
      endDate: undefined,
      areasOfActivity: ['High-throughput', 'Data Processing'],
      description: `
                Distributed platform for processing and transforming large volumes of data in real time.
                Developed scalable backend services with a focus on automation, integrations, and high system reliability. Involved in API development, background processing, and system optimization using modern .NET stack.
            `,
      contribution: `
                Built microservices using .NET (C#), ASP.NET Core, and Entity Framework Core
                Developed REST APIs and background jobs for data ingestion and processing
                Integrated with third-party systems via HTTP, messaging queues, and scheduled tasks
                Applied Clean Architecture, SOLID principles, and DDD practices
                Ensured reliability and observability through unit tests, structured logging, and monitoring tools
                Deployed and maintained services in a cloud-based environment (Azure)
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET Core',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Entity Framework',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'Git',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'xUnit'),
        mapProjectTechnology(expSources.production, groups.cloud, 'Kubernetes'),
        mapProjectTechnology(expSources.production, groups.cloud, 'Helm'),
        mapProjectTechnology(
          expSources.production,
          groups.cloud,
          'Applications Insights',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.cloud,
          'Azure App Service',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.cloud,
          'Azure Service Bus',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.cloud,
          'Azure SQL Databases',
        ),
      ],
    },
    {
      name: 'Multi-purpose Software Solutions for Media and Subscription Businesses',
      position: '.NET Software Engineer II',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: 'lightpoint_global_logo.jpg',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-07-31'),
      areasOfActivity: ['Digital Publishing'],
      description: `
                This project provides publishers with versatile and customizable software for subscription management, audience analytics, and monetization. This includes self-service features implementation, selling ads, and more. The primary aim is to ensure seamless integration of their solutions into the client's IT ecosystem.
                To achieve this:
                - They have pre-built integrations with widely-used CRMs, marketing tools, and payment solutions, including Salesforce, HubSpot, Verifone, and Google Ad Manager.
                - They provide a comprehensive set of APIs for clients to build their own custom integrations.
                - They utilize a plugin/widget architecture to maximize ease of third-party integrations.
                Clients can either implement the purchased solutions independently or hire a tech team from Lightpoint Global to handle the implementation. 
            `,
      contribution: `
                Spearheaded the generation of backlog items, designed new features, and managed the product roadmap to ensure timely and efficient delivery of high-quality software solutions.
                Architected and implemented the overall product architecture, ensuring scalability, maintainability, and performance optimization.
                Engineered and implemented robust database schemas to support complex business requirements and enhance data integrity.
                Established and maintained CI/CD pipelines to streamline the development process and facilitate continuous integration and deployment.
                Analyzed and interpreted technical specifications to ensure accurate implementation and compliance with client requirements.
                Developed and executed comprehensive unit and integration tests to ensure software reliability, performance, and security.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          '.NET Framework',
        ),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET MVC',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Entity Framework',
        ),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(
          expSources.production,
          groups.frontend,
          'JavaScript',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'Git',
        ),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'MS Test'),
      ],
    },
    {
      name: 'ePayment Solution',
      position: '.NET Software Engineer II',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: 'lightpoint_global_logo.jpg',
      startDate: new Date('2022-11-01'),
      endDate: new Date('2024-02-29'),
      areasOfActivity: ['Fintech'],
      description: `
                A non-card payment system utilized by over 100 authorized banks worldwide, including major clients like Adidas, Reebok, and Uber. This system allows consumers to purchase in their own currencies without risking personal or financial information.
                It offers businesses the ability to transact rapidly, securely, and inexpensively. Delivered as a multi-component electronic payment system, it includes integrations with APIs for banks, databases, and tertiary services, as well as a web app for payment management and control.
                Integrated with SAP, the system enables automated workflows, reducing human labor and potential errors. It functions without requiring personal or financial data, providing protection against identity theft, chargeback, and fraud.
            `,
      contribution: `
                Played a crucial role in developing a multi-component electronic payment system, with a focus on optimizing transactions for speed, security, and cost-efficiency.
                Instrumental in integrating our APIs with those of various banks and tertiary services, significantly enhancing the system's functionality and efficiency.
                Tasked with managing efficient data processes within the electronic payment system, ensuring streamlined data handling and retrieval.
                Actively participated in conceptualizing and implementing new features, enhancing the overall product architecture.
                Provided consistent support for the project, addressing technical issues and collaborating with the team to maintain system stability and performance.
                Conducted comprehensive unit testing of backend components to validate functionality and identify areas for optimization.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          '.NET Framework',
        ),
        mapProjectTechnology(expSources.production, groups.backend, '.NET'),
        mapProjectTechnology(expSources.production, groups.database, 'Redis'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.backend, 'WCF'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET Core',
        ),
        mapProjectTechnology(expSources.production, groups.backend, 'Dapper'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'SVN',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'xUnit'),
        mapProjectTechnology(expSources.production, groups.testing, 'Moq'),
        mapProjectTechnology(
          expSources.production,
          groups.testing,
          'JMeter',
          1,
        ),
        mapProjectTechnology(
          expSources.production,
          groups.testing,
          'Sumo Logic',
          1,
        ),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'PowerShell',
        ),
      ],
    },
    {
      name: 'Customer Engagement Platform',
      position: '.NET Software Engineer I',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: 'lightpoint_global_logo.jpg',
      startDate: new Date('2020-02-01'),
      endDate: new Date('2022-10-01'),
      areasOfActivity: ['Publishing', 'Martech'],
      description: `
                Designed for leading publishers like The New York Times, Chicago Tribune, and USA Today, this project introduced a customizable multi-module engagement platform. Each module is tailored to address distinct aspects of the business flow, ranging from initial user engagement and subscription conversion to unsubscription and analytics.
                The platform empowers publishers to manage subscriptions efficiently, optimize pricing, and maximize revenue. It also allows for subscription upgrades and more. A key feature of the system is its ability to track user behavior, recommend relevant content, predict user's next steps, and offer optimal subscription options, making the interaction as user-friendly as possible.
                Distinct teams, focusing on implementation and development, drive the project. The implementation team handles the system's connection and configuration for new clients, including updates and new feature additions. A significant goal is the automation of these processes.
                The project encompasses extensive integrations, including with Vindicia CashBox, various Payment Providers (like PayPal, ApplePay, Edgil, Matrix, Stripe, Braintree), and Google Analytics.
            `,
      contribution: `
                Successfully drove the implementation of automated feature updates, resulting in a 20% reduction in development time for new functionalities.
                Developed essential modules for the platform, targeting key business operations from user engagement to subscription conversion.
                Actively participated in the development of a comprehensive platform that enhances subscription management, pricing optimization, and revenue generation for publishers.
                Provided consistent technical support for the project, tackling challenges and collaborating with cross-functional teams to ensure system stability and performance.
                Adapted to client feedback and evolving market demands, effectively implementing timely enhancements and updates to the platform.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET Core',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Entity Framework',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          '.NET Framework',
        ),
        mapProjectTechnology(expSources.production, groups.backend, '.NET'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Node.js',
          1,
        ),
        mapProjectTechnology(expSources.production, groups.database, 'Redis'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.database, 'SSAS', 2),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Dapper',
          1,
        ),
        mapProjectTechnology(
          expSources.production,
          groups.frontend,
          'React',
          1,
        ),
        mapProjectTechnology(
          expSources.production,
          groups.frontend,
          'Angular',
          0.5,
        ),
        mapProjectTechnology(
          expSources.production,
          groups.frontend,
          'TypeScript',
        ),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'SCSS'),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'TfVC',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'xUnit'),
        mapProjectTechnology(
          expSources.production,
          groups.cloud,
          'Google BigQuery',
          0.5,
        ),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
      ],
    },
    {
      name: 'Rental Accounting System',
      position: '.NET Full-stack Developer',
      company: 'Caspel LLC',
      companyUrl: 'https://caspel.com',
      companyIconUrl: 'caspel_logo.jpg',
      startDate: new Date('2019-08-01'),
      endDate: new Date('2020-01-01'),
      areasOfActivity: ['Rent', 'Management', 'Reporting'],
      description: `
                The Rental Accounting System is tailored for the management and reporting of workspace rentals. It integrates a suite of tools including a designer for accounting rental space, CRM, cash register, reporting module, warehouse, and logistics. This system is designed to streamline rental management processes, enhance reporting accuracy, and improve overall operational efficiency.
            `,
      contribution: `
                Was instrumental in developing the system, focusing on integrating key features and functionalities essential for workspace rental management.
                Involved in designing and implementing the project's architecture, ensuring a scalable and efficient software development process.
                Developed a comprehensive database structure to facilitate intricate calculations and data management for rental space accounting.
                Collaborated closely with stakeholders to understand their needs and priorities, ensuring these were effectively addressed in the project development.
                Conducted thorough unit testing of backend components, guaranteeing the reliability and performance stability of the software.
                Focused on optimizing the system for rental space management, which led to enhanced operational efficiency and streamlined rental processes.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET MVC',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          '.NET Framework',
        ),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.database, 'SSRS'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'Git',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'NUnit'),
      ],
    },
    {
      name: 'Customer Manufacturing Platform',
      position: '.NET Full-stack Developer',
      company: 'Caspel LLC',
      companyUrl: 'https://caspel.com',
      companyIconUrl: 'caspel_logo.jpg',
      startDate: new Date('2019-02-01'),
      endDate: new Date('2019-07-01'),
      areasOfActivity: ['Manufacture', 'Reporting'],
      description: `
                This project supports a furniture manufacturing organization, providing assembly services and material supplies to other dealers. Key features include a sophisticated system for calculating material cutting dimensions, managing material usage, work performance, and salary computations. The platform integrates various modules like a material cutting designer, CRM, cash register, reporting module, warehouse, and logistics to meet the comprehensive needs of the organization.
            `,
      contribution: `
                Personally developed the material cutting designer, a crucial component of the multifaceted system that includes CRM, cash register, reporting module, warehouse, and logistics.
                Utilized strong analytical skills to solve complex business problems, implementing innovative solutions and strategic development practices.
                Actively engaged in both backend and frontend development, ensuring seamless feature integration across the platform.
                Created robust backend solutions for data processing and storage, while also focusing on an intuitive and user-friendly frontend design.
                Regularly communicated directly with clients, gathering requirements and feedback to continuously refine and improve the platform's functionality.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'ASP.NET MVC',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          '.NET Framework',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.backend,
          'Entity Framework',
        ),
        mapProjectTechnology(expSources.production, groups.database, 'MySQL'),
        mapProjectTechnology(
          expSources.production,
          groups.frontend,
          'JavaScript',
        ),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(
          expSources.production,
          groups.versionControl,
          'Git',
        ),
        mapProjectTechnology(
          expSources.production,
          groups.devops,
          'Azure DevOps',
        ),
        mapProjectTechnology(expSources.production, groups.testing, 'NUnit'),
      ],
    },
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Azure Developer Associate',
      code: 'AZ-204',
      competencyRequired:
        'Build end-to-end solutions in Microsoft Azure to create Azure Functions, implement and manage web apps, develop solutions utilizing Azure storage, and more',
      issuingOrganization: 'Microsoft',
      issuingOrganizationIconUrl: 'microsoft_logo.jpg',
      issueDate: new Date('2025-11-02'),
      expirationDate: new Date('2026-11-03'),
      credentialId: 'D47FFA664405C85C',
      credentialUrl:
        'https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/D47FFA664405C85C',
    },
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      code: 'AZ-900',
      competencyRequired: 'Understanding of Azure fundamentals',
      issuingOrganization: 'Microsoft',
      issuingOrganizationIconUrl: 'microsoft_logo.jpg',
      issueDate: new Date('2023-11-01'),
      credentialId: 'C4BD0FCD8D69A8C1',
      credentialUrl:
        'https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/C4BD0FCD8D69A8C1',
    },
    {
      name: 'Microsoft Certified: Azure AI Fundamentals',
      code: 'AI-900',
      competencyRequired: 'Understanding of Azure AI solutions',
      issuingOrganization: 'Microsoft',
      issuingOrganizationIconUrl: 'microsoft_logo.jpg',
      issueDate: new Date('2023-09-01'),
      credentialId: 'E2CBCF6AEE7B238E',
      credentialUrl:
        'https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/E2CBCF6AEE7B238E',
    },
  ],
  educations: [
    {
      school: 'Belarusian National Technical University',
      degree: "Bachelor's degree",
      fieldOfStudy: 'Information Technology',
      startDate: new Date('2017-09-01'),
      endDate: new Date('2021-08-01'),
      schoolUrl: 'https://bntu.by/en',
      schoolIconUrl: 'bntu_logo.jpg',
    },
  ],
  softSkills: [
    {
      name: 'Critical Thinking',
      description: `
                Serving in the role of a DevOps engineer, I anticipated a significant deployment challenge before it became apparent to the team. Understanding the potential future complexities, I proactively developed a custom extension for Azure DevOps to manage multiple release definitions simultaneously. This initiative was a result of my foresight and passion for the project. By the time the issue was recognized and discussed by senior members and leaders, I already had a ready-made solution to offer.
                This solution proved to be so effective and user-friendly that it was subsequently applied to another project. There, it instantly solved a similar issue, significantly reducing the time and effort required for configuring release definitions and minimizing the human factor.
            `,
    },
    {
      name: 'Reliability',
      description: `
            Starting with reliable development can save substantial resources in the long run. It's a known fact that writing completely bug-free code is not possible, but aiming for the highest quality is crucial. Ensuring a strong first impression is vital, as it sets the tone for future interactions and perceptions.
            Even in junior roles, our responsibility extends beyond ourselves to our team, the entire project, and the client. Remember, you never get a second chance to make a first impression. Transparency about existing problems is essential. Over-reliance on oneself can be limiting. Teamwork often proves to be a lifeline, especially during tough times. This collaborative approach can not only preserve but potentially enhance the client's impression through timely and effective problem resolution.
            `,
    },
    {
      name: 'Perseverance',
      description: `
                On a challenging project I was part of, we encountered a significant problem with data stream loss. This was especially critical as the project relied heavily on data analysis, handling vast volumes of data. We undertook a multifaceted approach to diagnose the issue, gathering log statistics, analyzing time-specific charts, and conducting an in-depth investigation of the code. Despite these efforts, the solution remained elusive.
                Realizing the complexity of the situation, we decided to create two detailed diagrams: one representing the algorithm's functioning as per the existing code, and the other depicting how it was intended to operate. The enormity of the project made this task particularly daunting. However, guided by the belief that persistence leads to success, we pressed on.
                Our determination eventually bore fruit. Through teamwork and a steadfast belief in our capabilities, we overcame the challenges and successfully rectified the problem. This experience underscored the importance of never losing hope and the power of perseverance in overcoming even the most challenging obstacles.
            `,
    },
  ],
};

export const metadata = {
  siteName: `Portfolio · ${data.fullName}`,
  title: `${data.fullName} - ${data.lookingForPosition}`,
  description: `${data.fullName}, ${data.lookingForPosition} with 5+ years of experience in developing high-performance web applications using C#, ASP.NET Core, .NET. Skilled in RESTful APIs, microservices, and Azure. Seeking opportunities in Hybrid or Remote roles.`,
  keywords: `${data.fullName}, ${data.lookingForPosition}, C#, ASP.NET Core, Microservices, Azure, Azure DevOps, RESTful APIs, Software Development, ${data.address.locality}, ${data.address.country}, ${data.contractTypes.join(', ')}, .NET Developer, Software Engineer, .NET Full-stack Developer, .NET Software Engineer`,
  author: data.fullName,
  url: 'https://cv.dzhukovsky.me',
};

export const allTechnologies: t.Technology[] = [
  ...getTechnologies(data.projects?.slice().reverse() ?? []),
  ...(data.technologies ?? []),
];

export const allProdTechnologies: t.Technology[] = allTechnologies.filter(
  (x) => x.expSource === expSources.production,
);

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@id': '#author',
    '@type': 'Person',
    name: data.fullName,
    image: 'me.jpg',
    jobTitle: data.lookingForPosition,
    email: `mailto:${data.email}`,
    telephone: data.phoneNumber,
    url: metadata.url,
    sameAs: [tryAddHttps(data.linkedInUrl)],
    description: metadata.description,
    affiliation: distinctByProperty(data.projects ?? [], 'company').map(
      (project) => ({
        '@type': 'Organization',
        name: project.company,
        url: project.companyUrl,
      }),
    ),
    hasOccupation: data.projects?.map((project) => ({
      '@type': 'Role',
      roleName: project.position,
      startDate: project.startDate.toISOString().split('T')[0],
      endDate: project.endDate?.toISOString().split('T')[0],
      description: project.contribution?.trim(),
      identifier: project.company,
      worksFor: {
        '@type': 'Organization',
        name: project.company,
        url: project.companyUrl,
      },
    })),
    knowsLanguage: data.languages?.map((x) => x.code.toLowerCase()),
    alumniOf: data.educations?.map((education) => ({
      '@type': 'CollegeOrUniversity',
      name: education.school,
      url: education.schoolUrl,
      startDate: education.startDate.toISOString().split('T')[0],
      endDate: education.endDate?.toISOString().split('T')[0],
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.address.locality,
      addressCountry: data.address.countryCode,
      postalCode: data.address.postalCode,
    },
    hasCredential: [
      ...(data.educations?.map((education) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: education.degree,
        educationalLevel: education.fieldOfStudy,
        recognizedBy: {
          '@type': 'Organization',
          name: education.school,
          url: education.schoolUrl,
        },
      })) ?? []),
      ...(data.certifications
        ?.filter((x) => !x.expirationDate || x.expirationDate >= new Date())
        ?.map((certification) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certificate',
          educationalLevel: certification.code,
          competencyRequired: certification.competencyRequired,
          recognizedBy: {
            '@type': 'Organization',
            name: certification.issuingOrganization,
          },
          identifier: certification.credentialId,
          url: certification.credentialUrl,
        })) ?? []),
    ],
  },
  // hasPart: [
  //   {
  //     '@type': 'Article',
  //     headline: 'Things to see in NJ',
  //     url: 'https://example.com/things-to-see-nj',
  //     datePublished: '2014-02-23T18:34:00Z',
  //     author: { '@id': '#author' },
  //   },
  // ],
};

export const formatDates = (startDate: Date, endDate?: Date) =>
  [
    startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    endDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    }) ?? 'Present',
  ]
    .filter((x) => x)
    .join(' - ');
