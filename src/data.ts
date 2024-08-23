import microsoftLogo from '../public/microsoft_logo.jpg'
import lightpointGlobalLogo from '../public/lightpoint_global_logo.jpg'
import bntuLogo from '../public/bntu_logo.jpg'
import caspelLogo from '../public/caspel_logo.jpg'
import type * as t from './types'
import { date } from './helpers/date'
import { } from 'helpers/string'
import { getTechnologies } from './helpers/technologies'

export const mapTechnology = (
  expSource: string,
  group: t.TechnologyGroup,
  name: string,
  expYears: number,
  lastDateUsed: Date): t.Technology => ({
    name,
    expYears,
    lastDateUsed,
    group,
    expSource,
    patternIndex: 1
  })

export const mapProjectTechnology = (
  expSource: string,
  group: t.TechnologyGroup,
  name: string,
  expYears?: number,
  lastDateUsed?: Date): t.ProjectTechnology => ({
    name,
    expYears,
    lastDateUsed,
    group,
    expSource
  })

const groups = {
  backend: {
    name: 'Backend Development',
    shortName: 'Backend'
  },
  database: {
    name: 'Database Management',
    shortName: 'Database'
  },
  frontend: {
    name: 'Frontend Development',
    shortName: 'Frontend'
  },
  cloud: {
    name: 'Cloud'
  },
  security: {
    name: 'Security'
  },
  testing: {
    name: 'Testing & QA'
  },
  versionControl: {
    name: 'Version Control & Collaboration',
    shortName: 'Version Control'
  },
  algorithms: {
    name: 'Problem Solving & Algorithms',
    shortName: 'Algorithms'
  },
  devops: {
    name: 'DevOps and Deployment',
    shortName: 'DevOps'
  }
}

const expSources = {
  production: 'production',
  selfTaught: 'self-taught'
}

export const data: t.Data = {
  fullName: 'Dmitry Zhukovsky',
  phoneNumber: '+48 730 725 476',
  linkedInUrl: 'www.linkedin.com/in/dmitry-zhukovsky',
  email: 'dmitry.zhukovsky@outlook.com',
  lookingForPosition: '.NET Software Engineer',
  location: 'Gdansk, Poland',
  locationShort: 'Gdansk, PL',
  contractTypes: ['Hybrid', 'Remote'],
  summary: `
      I am a highly motivated and inquisitive .NET Software Engineer with over 9 years of experience, including 5 years in production environments.
      - Developed and maintained high-performance web applications using C#, ASP.NET Core, and .NET.
      - Designed and implemented RESTful APIs and microservices architecture to facilitate efficient communication between different application components.
      - Utilized Dapper and Entity Framework for data access management, ensuring data integrity and efficient database interactions.
      - Collaborated with cross-functional teams to gather and analyze requirements.
      - Integrated third-party libraries and controls, such as Fluent UI, to enhance application functionality and user experience.
      - Implemented authentication and authorization mechanisms to ensure secure access to application features.
      - Leveraged Azure for the deployment, management, and scaling of applications in a reliable and cost-effective manner.
      - Utilized third-party APIs from HubSpot and various payment providers to integrate and enhance application functionality.
      - Worked with version control systems, particularly Git, Subversion, and TfVC, to enable efficient code collaboration and version management.
      - Participated in code reviews, providing constructive feedback and maintaining code quality standards.
      - Actively participated in Agile/Scrum processes for planning, tracking, and delivering software iterations on schedule.
      - Measured system performance on multi-user platforms through test scenarios using automated testing software, providing analysis results and recommendations.
    `,
  languages: [
    {
      name: 'English',
      level: 'B2'
    },
    {
      name: 'Polish',
      level: 'A1'
    },
    {
      name: 'Russian',
      level: 'Native speaker'
    }
  ],
  technologies: [
    mapTechnology(expSources.selfTaught, groups.frontend, 'Blazor', 1, date('2020')),
    mapTechnology(expSources.selfTaught, groups.backend, 'C#', 4, date('2024')),
    mapTechnology(expSources.selfTaught, groups.backend, '.NET', 3, date('2024')),
    mapTechnology(expSources.selfTaught, groups.backend, 'Roslyn Analyzers', 1, date('2023')),
    mapTechnology(expSources.selfTaught, groups.backend, 'Python 3', 2, date('2021')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'WPF', 4, date('2021')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'UWP', 1.5, date('2022')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'WinUI 3', 1, date('2024')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'React', 2, date('2024')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'SCSS', 1, date('2024')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'TypeScript', 2, date('2024')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'Azure DevOps SDK', 1, date('2023')),
    mapTechnology(expSources.selfTaught, groups.frontend, 'Microsoft Fluent 2', 1, date('2024')),
    mapTechnology(expSources.selfTaught, groups.devops, 'YAML', 1, date('2024')),
    mapTechnology(expSources.selfTaught, groups.devops, 'YML', 1, date('2023')),
    mapTechnology(expSources.selfTaught, groups.devops, 'Azure DevOps', 1, date('2024')),
    mapTechnology(expSources.selfTaught, groups.devops, 'GitHub', 2, date('2024')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure Graph API', 0.5, date('2020')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure SQL Databases', 0.5, date('2020')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure App Service', 1, date('2023')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure Monitor', 1, date('2023')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure Functions', 0.5, date('2023')),
    mapTechnology(expSources.selfTaught, groups.cloud, 'Azure ML Studio', 0.5, date('2023')),
    mapTechnology(expSources.selfTaught, groups.versionControl, 'Git', 1, date('2024'))
  ],
  projects: [
    {
      name: "Multi-purpose Software Solutions for Media and Subscription Businesses",
      position: '.NET Software Engineer II',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: lightpointGlobalLogo,
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
      myRole: `
                Spearheaded the generation of backlog items, designed new features, and managed the product roadmap to ensure timely and efficient delivery of high-quality software solutions.
                Architected and implemented the overall product architecture, ensuring scalability, maintainability, and performance optimization.
                Designed and implemented robust database schemas to support complex business requirements and enhance data integrity.
                Established and maintained CI/CD pipelines to streamline the development process and facilitate continuous integration and deployment.
                Analyzed and interpreted technical specifications to ensure accurate implementation and compliance with client requirements.
                Developed and executed comprehensive unit and integration tests to ensure software reliability, performance, and security.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET Framework'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET MVC'),
        mapProjectTechnology(expSources.production, groups.backend, 'Entity Framework'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(expSources.production, groups.frontend, 'JavaScript'),
        mapProjectTechnology(expSources.production, groups.versionControl, 'Git'),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(expSources.production, groups.devops, 'Azure DevOps'),
        mapProjectTechnology(expSources.production, groups.testing, 'MS Test'),
      ]

    },
    {
      name: 'ePayment Solution',
      position: '.NET Software Engineer II',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: lightpointGlobalLogo,
      startDate: new Date('2022-11-01'),
      endDate: new Date('2024-02-29'),
      areasOfActivity: ['Fintech'],
      description: `
                A non-card payment system utilized by over 100 authorized banks worldwide, including major clients like Adidas, Reebok, and Uber. This system allows consumers to purchase in their own currencies without risking personal or financial information.
                It offers businesses the ability to transact rapidly, securely, and inexpensively. Delivered as a multi-component electronic payment system, it includes integrations with APIs for banks, databases, and tertiary services, as well as a web app for payment management and control.
                Integrated with SAP, the system enables automated workflows, reducing human labor and potential errors. It functions without requiring personal or financial data, providing protection against identity theft, chargeback, and fraud.
            `,
      myRole: `
                Key contributor to the development of a multi-component electronic payment system, focusing on transactional optimization for speed, security, and cost-efficiency.
                Played a pivotal role in integrating our APIs with those of various banks and tertiary services, enhancing the functionality and efficiency of the system.
                Tasked with managing efficient data processes within the electronic payment system, ensuring streamlined data handling and retrieval.
                Actively engaged in conceptualizing and implementing new features, contributing to the improvement of the overall product architecture.
                Provided consistent support for the project, addressing technical issues and collaborating with the team to maintain system stability and performance.
                Conducted comprehensive unit testing of backend components to validate functionality and identify areas for optimization.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET Framework'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET'),
        mapProjectTechnology(expSources.production, groups.database, 'Redis'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.backend, 'WCF'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET Core'),
        mapProjectTechnology(expSources.production, groups.backend, 'Dapper'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(expSources.production, groups.versionControl, 'SVN'),
        mapProjectTechnology(expSources.production, groups.testing, 'xUnit'),
        mapProjectTechnology(expSources.production, groups.testing, 'Moq'),
        mapProjectTechnology(expSources.production, groups.testing, 'JMeter', 1),
        mapProjectTechnology(expSources.production, groups.testing, 'Sumo Logic', 1),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(expSources.production, groups.devops, 'Azure DevOps'),
        mapProjectTechnology(expSources.production, groups.devops, 'PowerShell')
      ]
    },
    {
      name: 'Customer Engagement Platform',
      position: '.NET Software Engineer I',
      company: 'Lightpoint Global',
      companyUrl: 'https://lightpointglobal.com',
      companyIconUrl: lightpointGlobalLogo,
      startDate: new Date('2020-02-01'),
      endDate: new Date('2022-10-01'),
      areasOfActivity: ['Publishing', 'Martech'],
      description: `
                Designed for leading publishers like The New York Times, Chicago Tribune, and USA Today, this project introduced a customizable multi-module engagement platform. Each module is tailored to address distinct aspects of the business flow, ranging from initial user engagement and subscription conversion to unsubscription and analytics.
                The platform empowers publishers to manage subscriptions efficiently, optimize pricing, and maximize revenue. It also allows for subscription upgrades and more. A key feature of the system is its ability to track user behavior, recommend relevant content, predict user's next steps, and offer optimal subscription options, making the interaction as user-friendly as possible.
                Distinct teams, focusing on implementation and development, drive the project. The implementation team handles the system's connection and configuration for new clients, including updates and new feature additions. A significant goal is the automation of these processes.
                The project encompasses extensive integrations, including with Vindicia CashBox, various Payment Providers (like PayPal, ApplePay, Edgil, Matrix, Stripe, Braintree), and Google Analytics.
            `,
      myRole: `
                Contributed significantly to the implementation of automated feature updates, achieving a 20% reduction in development time for new functionalities.
                Developed essential modules for the platform, targeting key business operations from user engagement to subscription conversion.
                Actively participated in the development of a comprehensive platform that enhances subscription management, pricing optimization, and revenue generation for publishers.
                Provided consistent technical support for the project, tackling challenges and collaborating with cross-functional teams to ensure system stability and performance.
                Adapted to client feedback and evolving market demands, effectively implementing timely enhancements and updates to the platform.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET Core'),
        mapProjectTechnology(expSources.production, groups.backend, 'Entity Framework'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET Framework'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET'),
        mapProjectTechnology(expSources.production, groups.backend, 'Node.js', 1),
        mapProjectTechnology(expSources.production, groups.database, 'Redis'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.database, 'SSAS', 2),
        mapProjectTechnology(expSources.production, groups.backend, 'Dapper', 1),
        mapProjectTechnology(expSources.production, groups.frontend, 'React', 1),
        mapProjectTechnology(expSources.production, groups.frontend, 'Angular', 0.5),
        mapProjectTechnology(expSources.production, groups.frontend, 'TypeScript'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'SCSS'),
        mapProjectTechnology(expSources.production, groups.versionControl, 'TfVC'),
        mapProjectTechnology(expSources.production, groups.testing, 'xUnit'),
        mapProjectTechnology(expSources.production, groups.cloud, 'Google BigQuery', 0.5),
        mapProjectTechnology(expSources.production, groups.devops, 'IIS'),
        mapProjectTechnology(expSources.production, groups.devops, 'Azure DevOps')
      ]
    },
    {
      name: 'Rental Accounting System',
      position: '.NET Full-stack Developer',
      company: 'Caspel LLC',
      companyUrl: 'https://caspel.com',
      companyIconUrl: caspelLogo,
      startDate: new Date('2019-08-01'),
      endDate: new Date('2020-01-01'),
      areasOfActivity: ['Rent', 'Management', 'Reporting'],
      description: `
                The Rental Accounting System is tailored for the management and reporting of workspace rentals. It integrates a suite of tools including a designer for accounting rental space, CRM, cash register, reporting module, warehouse, and logistics. This system is designed to streamline rental management processes, enhance reporting accuracy, and improve overall operational efficiency.
            `,
      myRole: `
                Contributed significantly to the development of the system, focusing on the integration of features and functionalities vital for workspace rental management.
                Involved in designing and implementing the project's architecture, ensuring a scalable and efficient software development process.
                Developed a comprehensive database structure to facilitate intricate calculations and data management for rental space accounting.
                Collaborated closely with stakeholders to understand their needs and priorities, ensuring these were effectively addressed in the project development.
                Conducted thorough unit testing of backend components, guaranteeing the reliability and performance stability of the software.
                Played a key role in optimizing the system for rental space management, leading to enhanced operational efficiency and streamlined rental processes.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET MVC'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET Framework'),
        mapProjectTechnology(expSources.production, groups.database, 'MS-SQL'),
        mapProjectTechnology(expSources.production, groups.database, 'SSRS'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(expSources.production, groups.versionControl, 'Git'),
        mapProjectTechnology(expSources.production, groups.devops, 'Azure DevOps'),
        mapProjectTechnology(expSources.production, groups.testing, 'NUnit')
      ]
    },
    {
      name: 'Customer Manufacturing Platform',
      position: '.NET Full-stack Developer',
      company: 'Caspel LLC',
      companyUrl: 'https://caspel.com',
      companyIconUrl: caspelLogo,
      startDate: new Date('2019-02-01'),
      endDate: new Date('2019-07-01'),
      areasOfActivity: ['Manufacture', 'Reporting'],
      description: `
                This project supports a furniture manufacturing organization, providing assembly services and material supplies to other dealers. Key features include a sophisticated system for calculating material cutting dimensions, managing material usage, work performance, and salary computations. The platform integrates various modules like a material cutting designer, CRM, cash register, reporting module, warehouse, and logistics to meet the comprehensive needs of the organization.
            `,
      myRole: `
                Personally developed the material cutting designer, a crucial component of the multifaceted system that includes CRM, cash register, reporting module, warehouse, and logistics.
                Utilized strong analytical skills to solve complex business problems, implementing innovative solutions and strategic development practices.
                Actively engaged in both backend and frontend development, ensuring seamless feature integration across the platform.
                Created robust backend solutions for data processing and storage, while also focusing on an intuitive and user-friendly frontend design.
                Regularly communicated directly with clients, gathering requirements and feedback to continuously refine and improve the platform's functionality.
            `,
      technologies: [
        mapProjectTechnology(expSources.production, groups.backend, 'C#'),
        mapProjectTechnology(expSources.production, groups.backend, 'ASP.NET MVC'),
        mapProjectTechnology(expSources.production, groups.backend, '.NET Framework'),
        mapProjectTechnology(expSources.production, groups.backend, 'Entity Framework'),
        mapProjectTechnology(expSources.production, groups.database, 'MySQL'),
        mapProjectTechnology(expSources.production, groups.frontend, 'JavaScript'),
        mapProjectTechnology(expSources.production, groups.frontend, 'HTML'),
        mapProjectTechnology(expSources.production, groups.frontend, 'CSS'),
        mapProjectTechnology(expSources.production, groups.versionControl, 'Git'),
        mapProjectTechnology(expSources.production, groups.devops, 'Azure DevOps'),
        mapProjectTechnology(expSources.production, groups.testing, 'NUnit')
      ]
    }
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      issuingOrganization: 'Microsoft',
      issuingOrganizationIconUrl: microsoftLogo,
      issueDate: new Date('2023-11-01'),
      credentialId: 'C4BD0FCD8D69A8C1',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/C4BD0FCD8D69A8C1'
    },
    {
      name: 'Microsoft Certified: Azure AI Fundamentals',
      issuingOrganization: 'Microsoft',
      issuingOrganizationIconUrl: microsoftLogo,
      issueDate: new Date('2023-09-01'),
      credentialId: 'E2CBCF6AEE7B238E',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/E2CBCF6AEE7B238E'
    }
  ],
  educations: [
    {
      school: 'Belarusian National Technical University',
      degree: "Bachelor's degree",
      fieldOfStudy: 'Information Technology',
      startDate: new Date('2017-09-01'),
      endDate: new Date('2021-08-01'),
      schoolUrl: 'https://bntu.by/en',
      schoolIconUrl: bntuLogo
    }
  ],
  softSkills: [
    {
      name: 'Critical Thinking',
      description: `
                Serving in the role of a DevOps engineer, I anticipated a significant deployment challenge before it became apparent to the team. Understanding the potential future complexities, I proactively developed a custom extension for Azure DevOps to manage multiple release definitions simultaneously. This initiative was a result of my foresight and passion for the project. By the time the issue was recognized and discussed by senior members and leaders, I already had a ready-made solution to offer.
                This solution proved to be so effective and user-friendly that it was subsequently applied to another project. There, it instantly solved a similar issue, significantly reducing the time and effort required for configuring release definitions and minimizing the human factor.
            `
    },
    {
      name: 'Reliability',
      description: `
            Starting with reliable development can save substantial resources in the long run. It's a known fact that writing completely bug-free code is not possible, but aiming for the highest quality is crucial. Ensuring a strong first impression is vital, as it sets the tone for future interactions and perceptions.
            Even in junior roles, our responsibility extends beyond ourselves to our team, the entire project, and the client. Remember, you never get a second chance to make a first impression. Transparency about existing problems is essential. Over-reliance on oneself can be limiting. Teamwork often proves to be a lifeline, especially during tough times. This collaborative approach can not only preserve but potentially enhance the client's impression through timely and effective problem resolution.
            `
    },
    {
      name: 'Perseverance',
      description: `
                On a challenging project I was part of, we encountered a significant problem with data stream loss. This was especially critical as the project relied heavily on data analysis, handling vast volumes of data. We undertook a multifaceted approach to diagnose the issue, gathering log statistics, analyzing time-specific charts, and conducting an in-depth investigation of the code. Despite these efforts, the solution remained elusive.
                Realizing the complexity of the situation, we decided to create two detailed diagrams: one representing the algorithm's functioning as per the existing code, and the other depicting how it was intended to operate. The enormity of the project made this task particularly daunting. However, guided by the belief that persistence leads to success, we pressed on.
                Our determination eventually bore fruit. Through teamwork and a steadfast belief in our capabilities, we overcame the challenges and successfully rectified the problem. This experience underscored the importance of never losing hope and the power of perseverance in overcoming even the most challenging obstacles.
            `
    }
    // {
    //   name: 'Motivation',
    //   description: `
    //         Since my school days, I have been captivated by programming. The moment I first delved into it, I realized it was a boundless world where I could be the creator. My journey as a programmer began with Unity, followed by system administration and coding in Visual Basic, and then C# for web development. After school, I expanded my expertise by mastering a multitude of new technologies, including Python, Java, Prolog, and Assembly, continually pushing the boundaries of my knowledge and skills.
    //         I've always set lofty goals for myself, believed in my abilities, and remained true to my ambitions, persistently pursuing them to the end. My key rule is to perceive failures not as defeats, but as valuable experiences that pave the way for future success. It's crucial to not fear stumbling over obstacles but to boldly move forward, achieving all set goals.
    //     `
    // },
    // {
    //   name: 'Openness',
    //   description: `
    //         Understanding that those who never try, never achieve, I recognize the importance of experimentation. Making mistakes is not a crime; not everything new is necessarily better, but progress is constant and we must keep pace with the times. The ongoing efforts of innovators, like Microsoft with its myriad of business solutions, continue to simplify our lives and make work more enjoyable. In the same spirit, we too strive to create what will be useful for others in the future, possibly having an impact already. There's no need to fear trying new things; we should boldly forge ahead, leaving a trail of evolution in our wake.
    //     `
    // }
  ]
}

export const allTechnologies: t.Technology[] = [
  ...getTechnologies(data.projects?.slice().reverse() ?? []),
  ...data.technologies ?? []
]

export const formatDates = (startDate: Date, endDate?: Date | 'Present') => [
  startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
  typeof endDate === 'string'
    ? endDate
    : endDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
].filter(x => x).join(' - ')