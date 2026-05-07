export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export type TechGroup =
	| "Backend"
	| "Frontend"
	| "Data"
	| "Cloud"
	| "DevOps";

export interface Tech {
	name: string;
	group: TechGroup;
	years?: number;
	source: "production" | "self-taught";
	lastUsed?: number;
}

export interface Project {
	name: string;
	company: string;
	companyUrl: string;
	companyLogo: string;
	position: string;
	start: string;
	end?: string;
	areas: string[];
	description: string;
	contributions: string[];
	tech: Tech[];
}

export interface Certification {
	name: string;
	code: string;
	issuer: string;
	issuerLogo: string;
	about: string;
	issued: string;
	expires?: string;
	credentialId: string;
	credentialUrl: string;
}

export interface Education {
	school: string;
	schoolUrl: string;
	schoolLogo: string;
	degree: string;
	field: string;
	start: string;
	end?: string;
}

export interface SoftSkill {
	name: string;
	description: string;
}

export interface Language {
	name: string;
	code: string;
	level: LanguageLevel;
}

export interface CV {
	fullName: string;
	shortName: string;
	position: string;
	location: { city: string; country: string; countryCode: string };
	contractTypes: string[];
	email: string;
	linkedIn: string;
	github: string;
	portfolio: string;
	summary: string;
	highlights: string[];
	languages: Language[];
	technologies: Tech[];
	projects: Project[];
	certifications: Certification[];
	education: Education[];
	softSkills: SoftSkill[];
}

const t = (
	name: string,
	group: TechGroup,
	source: Tech["source"] = "production",
	years?: number,
	lastUsed?: number,
): Tech => ({ name, group, source, years, lastUsed });

export const cv: CV = {
	fullName: "Dmitry Zhukovsky",
	shortName: "DZ",
	position: ".NET Software Engineer",
	location: { city: "Warsaw", country: "Poland", countryCode: "PL" },
	contractTypes: ["Remote"],
	email: "dmitry.zhukovsky@outlook.com",
	linkedIn: "linkedin.com/in/dmitry-zhukovsky",
	github: "github.com/dzhukovsky",
	portfolio: "cv.dzhukovsky.me",
	summary:
		"Highly motivated and inquisitive .NET Software Engineer with over 9 years of experience, including 6+ years in production. Specializing in high-performance web applications using C#, ASP.NET Core, .NET, and React. Proficient in designing and implementing RESTful APIs and microservices architecture for scalable systems.",
	highlights: [
		"Leveraging Azure for cloud services, deployment, management, and scaling",
		"Managing data access using Dapper and Entity Framework",
		"Integrating third-party libraries, APIs, and payment providers",
		"Implementing authentication and authorization mechanisms",
		"Working with Git, Subversion, and TfVC for version control",
		"Active participant in Agile/Scrum, code reviews, performance testing",
	],
	languages: [
		{ code: "en", name: "English", level: "B2" },
		{ code: "pl", name: "Polish", level: "A1" },
		{ code: "ru", name: "Russian", level: "Native" },
	],
	technologies: [
		t("C#", "Backend", "production", 9, 2026),
		t(".NET", "Backend", "production", 9, 2026),
		t("ASP.NET Core", "Backend", "production", 6, 2026),
		t("Entity Framework", "Backend", "production", 6, 2026),
		t("Dapper", "Backend", "production", 3, 2024),
		t("SignalR", "Backend", "production", 1, 2026),
		t("Python 3", "Backend", "self-taught", 2, 2025),
		t("Node.js", "Backend", "production", 1, 2022),
		t("Roslyn Analyzers", "Backend", "self-taught", 1, 2023),
		t("React", "Frontend", "production", 3, 2026),
		t("TypeScript", "Frontend", "production", 3, 2026),
		t("SCSS", "Frontend", "production", 2, 2024),
		t("Blazor", "Frontend", "self-taught", 1, 2020),
		t("WPF", "Frontend", "self-taught", 4, 2021),
		t("WinUI 3", "Frontend", "self-taught", 1, 2024),
		t("Microsoft Fluent 2", "Frontend", "self-taught", 1, 2024),
		t("Azure DevOps SDK", "Frontend", "self-taught", 1, 2023),
		t("MS-SQL", "Data", "production", 9, 2026),
		t("Redis", "Data", "production", 4, 2026),
		t("KQL", "Data", "production", 1, 2026),
		t("MySQL", "Data", "production", 1, 2019),
		t("SSAS", "Data", "production", 2, 2022),
		t("SSRS", "Data", "production", 1, 2020),
		t("Azure App Service", "Cloud", "production", 3, 2026),
		t("Azure Service Bus", "Cloud", "production", 2, 2026),
		t("Azure Functions", "Cloud", "self-taught", 1, 2024),
		t("Azure Storage", "Cloud", "production", 2, 2026),
		t("Application Insights", "Cloud", "production", 2, 2026),
		t("Microsoft Fabric", "Cloud", "production", 1, 2026),
		t("Kubernetes", "Cloud", "production", 2, 2026),
		t("Azure API Management", "Cloud", "production", 1, 2026),
		t("Azure Static Web Apps", "Cloud", "self-taught", 1, 2024),
		t("Azure ML Studio", "Cloud", "self-taught", 0.5, 2023),
		t("Helm", "DevOps", "production", 2, 2026),
		t("Azure DevOps", "DevOps", "production", 6, 2026),
		t("GitHub", "DevOps", "production", 3, 2026),
		t("PowerShell", "DevOps", "production", 3, 2024),
		t("YAML", "DevOps", "production", 3, 2026),
		t("IIS", "DevOps", "production", 4, 2024),
		t("xUnit", "Backend", "production", 6, 2026),
		t("Moq", "Backend", "production", 4, 2024),
		t("NUnit", "Backend", "production", 1, 2020),
		t("JMeter", "DevOps", "production", 1, 2024),
		t("Sumo Logic", "Cloud", "production", 1, 2024),
		t("Git", "DevOps", "production", 6, 2026),
		t("SVN", "DevOps", "production", 1, 2024),
		t("TfVC", "DevOps", "production", 2, 2022),
	],
	projects: [
		{
			name: "Cloud Contact-Center & Communications Platform",
			company: "Fotando Global",
			companyUrl: "https://www.fotando.global",
			companyLogo: "/fotando_global_logo.jpg",
			position: "Senior .NET Backend Engineer",
			start: "2024-11",
			areas: ["Telecom", "Cloud Communications"],
			description:
				"Enterprise SaaS ecosystem for unified customer communications and digital telephony. Integrates voice, messaging, workflow automation, compliance controls, and analytics into Microsoft-based business environments. Focus on secure operations, interoperability, and scalable customer engagement at global enterprise level.",
			contributions: [
				"Established a reputation as a reliable engineer through strong ownership and attention to detail, becoming responsible for planning and executing production deployments.",
				"Developed core infrastructure NuGet packages to standardize baseline configuration across .NET microservices, significantly reducing misconfigurations and setup effort.",
				"Architected a secure Power BI integration (KQL per-tenant shortcuts and a dedicated connector) enabling customers to work directly with their data in a multi-tenant environment.",
				"Implemented a custom EF Core migrations management tool that enabled independent CI/CD for database schema changes.",
				"Drove major improvements to CI/CD by shaping Helm templates and Azure DevOps pipelines, centralizing configuration in Azure DevOps Library.",
			],
			tech: [
				t("C#", "Backend"),
				t(".NET", "Backend"),
				t("ASP.NET Core", "Backend"),
				t("Entity Framework", "Backend"),
				t("SignalR", "Backend"),
				t("MS-SQL", "Data"),
				t("KQL", "Data"),
				t("Redis", "Data"),
				t("Kubernetes", "Cloud"),
				t("Helm", "DevOps"),
				t("Application Insights", "Cloud"),
				t("Azure App Service", "Cloud"),
				t("Azure Service Bus", "Cloud"),
				t("Microsoft Fabric", "Cloud"),
				t("Azure DevOps", "DevOps"),
				t("xUnit", "Backend"),
				t("Git", "DevOps"),
			],
		},
		{
			name: "Enterprise Tax Allocation Platform",
			company: "Exadel",
			companyUrl: "https://exadel.com",
			companyLogo: "/exadel_logo.png",
			position: "Senior .NET Backend Engineer",
			start: "2024-11",
			areas: ["Fintech"],
			description:
				"Distributed backend platform for automated financial allocations and rules-driven calculations. Processes structured datasets, applies configurable business logic, and generates standardized reporting outputs for enterprise use. Emphasizes performance, accuracy, and maintainability for long-term scalability in regulated environments.",
			contributions: [
				"Developed the core data import functionality that became the foundation of the service, meeting strict performance requirements while keeping the system easy to extend.",
				"Built a reputation as a reliable engineer with a low defect rate and minimal post-development effort on new features.",
				"Quickly became a go-to person for knowledge and support on the project despite holding a standard developer role.",
				"Demonstrated strong ownership and team support, actively participating in key architectural discussions.",
			],
			tech: [
				t("C#", "Backend"),
				t(".NET", "Backend"),
				t("ASP.NET Core", "Backend"),
				t("Entity Framework", "Backend"),
				t("Python 3", "Backend"),
				t("MS-SQL", "Data"),
				t("Redis", "Data"),
				t("Kubernetes", "Cloud"),
				t("Helm", "DevOps"),
				t("Application Insights", "Cloud"),
				t("Azure API Management", "Cloud"),
				t("Azure Service Bus", "Cloud"),
				t("GitHub", "DevOps"),
				t("xUnit", "Backend"),
				t("Git", "DevOps"),
			],
		},
		{
			name: "Software Solutions for Media & Subscription Businesses",
			company: "Lightpoint Global",
			companyUrl: "https://lightpointglobal.com",
			companyLogo: "/lightpoint_global_logo.jpg",
			position: "Senior .NET Software Engineer",
			start: "2024-03",
			end: "2024-07",
			areas: ["Digital Publishing"],
			description:
				"Flexible software for subscription management, audience analytics, and monetization, with self-service portals and advertising sales workflows. Pre-built integrations with widely used CRMs, marketing tools, and payment providers (Salesforce, HubSpot, Verifone, Google Ad Manager), plus comprehensive APIs and a plugin/widget architecture.",
			contributions: [
				"Spearheaded the generation of backlog items, designed new features, and managed the product roadmap.",
				"Architected and implemented the overall product architecture, ensuring scalability, maintainability, and performance.",
				"Engineered robust database schemas to support complex business requirements and enhance data integrity.",
				"Established and maintained CI/CD pipelines to streamline development and continuous deployment.",
				"Developed comprehensive unit and integration tests to ensure software reliability and security.",
			],
			tech: [
				t("C#", "Backend"),
				t(".NET Framework", "Backend"),
				t("ASP.NET MVC", "Backend"),
				t("Entity Framework", "Backend"),
				t("MS-SQL", "Data"),
				t("HTML", "Frontend"),
				t("CSS", "Frontend"),
				t("JavaScript", "Frontend"),
				t("IIS", "DevOps"),
				t("Azure DevOps", "DevOps"),
				t("MS Test", "Backend"),
				t("Git", "DevOps"),
			],
		},
		{
			name: "ePayment Solution",
			company: "Lightpoint Global",
			companyUrl: "https://lightpointglobal.com",
			companyLogo: "/lightpoint_global_logo.jpg",
			position: "Middle .NET Software Engineer",
			start: "2022-11",
			end: "2024-02",
			areas: ["Fintech"],
			description:
				"Non-card payment platform used by 100+ authorized banks worldwide, allowing consumers to pay in local currencies without exposing personal or financial data. Integrates with bank APIs, SAP, internal databases, and third-party services for fast, secure, cost-efficient transactions.",
			contributions: [
				"Played a crucial role in developing a multi-component electronic payment system focused on speed, security, and cost-efficiency.",
				"Instrumental in integrating APIs with various banks and tertiary services, significantly enhancing system functionality.",
				"Tasked with managing efficient data processes within the electronic payment system.",
				"Actively participated in conceptualizing and implementing new features.",
				"Conducted comprehensive unit testing of backend components.",
			],
			tech: [
				t("C#", "Backend"),
				t(".NET Framework", "Backend"),
				t(".NET", "Backend"),
				t("ASP.NET Core", "Backend"),
				t("WCF", "Backend"),
				t("Dapper", "Backend"),
				t("MS-SQL", "Data"),
				t("Redis", "Data"),
				t("HTML", "Frontend"),
				t("CSS", "Frontend"),
				t("SVN", "DevOps"),
				t("xUnit", "Backend"),
				t("Moq", "Backend"),
				t("JMeter", "DevOps"),
				t("Sumo Logic", "Cloud"),
				t("IIS", "DevOps"),
				t("Azure DevOps", "DevOps"),
				t("PowerShell", "DevOps"),
			],
		},
		{
			name: "Customer Engagement Platform",
			company: "Lightpoint Global",
			companyUrl: "https://lightpointglobal.com",
			companyLogo: "/lightpoint_global_logo.jpg",
			position: "Junior .NET Software Engineer",
			start: "2020-02",
			end: "2022-10",
			areas: ["Publishing", "Martech"],
			description:
				"Customizable multi-module engagement platform for leading publishers (NYT, Chicago Tribune, USA Today), covering the full subscription lifecycle from acquisition and conversion to retention, churn prevention, and analytics. Extensive integrations with billing/payment providers and Google Analytics.",
			contributions: [
				"Drove the implementation of automated feature updates, resulting in a 20% reduction in development time for new functionalities.",
				"Developed essential modules targeting key business operations from user engagement to subscription conversion.",
				"Actively participated in development of a comprehensive platform enhancing subscription management, pricing optimization, and revenue generation.",
				"Provided consistent technical support, tackling challenges and collaborating with cross-functional teams.",
			],
			tech: [
				t("C#", "Backend"),
				t("ASP.NET", "Backend"),
				t("ASP.NET Core", "Backend"),
				t("Entity Framework", "Backend"),
				t(".NET Framework", "Backend"),
				t(".NET", "Backend"),
				t("Node.js", "Backend"),
				t("Dapper", "Backend"),
				t("MS-SQL", "Data"),
				t("Redis", "Data"),
				t("SSAS", "Data"),
				t("React", "Frontend"),
				t("Angular", "Frontend"),
				t("TypeScript", "Frontend"),
				t("SCSS", "Frontend"),
				t("HTML", "Frontend"),
				t("Google BigQuery", "Cloud"),
				t("TfVC", "DevOps"),
				t("xUnit", "Backend"),
				t("IIS", "DevOps"),
				t("Azure DevOps", "DevOps"),
			],
		},
		{
			name: "Rental Accounting System",
			company: "Caspel LLC",
			companyUrl: "https://caspel.com",
			companyLogo: "/caspel_logo.jpg",
			position: "Junior .NET Full-Stack Developer",
			start: "2019-08",
			end: "2020-01",
			areas: ["Rent", "Management", "Reporting"],
			description:
				"Tailored for management and reporting of workspace rentals. Integrates a designer for accounting rental space, CRM, cash register, reporting module, warehouse, and logistics. Streamlines rental processes, enhances reporting accuracy, improves operational efficiency.",
			contributions: [
				"Instrumental in developing the system, integrating key features for workspace rental management.",
				"Designed and implemented the project architecture for scalable, efficient development.",
				"Developed comprehensive database structure for intricate calculations and rental space accounting.",
				"Collaborated closely with stakeholders to align with priorities.",
				"Conducted thorough unit testing of backend components.",
			],
			tech: [
				t("C#", "Backend"),
				t("ASP.NET MVC", "Backend"),
				t(".NET Framework", "Backend"),
				t("MS-SQL", "Data"),
				t("SSRS", "Data"),
				t("HTML", "Frontend"),
				t("CSS", "Frontend"),
				t("Git", "DevOps"),
				t("Azure DevOps", "DevOps"),
				t("NUnit", "Backend"),
			],
		},
		{
			name: "Customer Manufacturing Platform",
			company: "Caspel LLC",
			companyUrl: "https://caspel.com",
			companyLogo: "/caspel_logo.jpg",
			position: "Junior .NET Full-Stack Developer",
			start: "2019-02",
			end: "2019-07",
			areas: ["Manufacture", "Reporting"],
			description:
				"Furniture manufacturing organization platform with assembly services and material supplies. Sophisticated system for material cutting dimensions, material usage, work performance, and salary computations. Includes CRM, cash register, reporting, warehouse, and logistics.",
			contributions: [
				"Personally developed the material cutting designer — a crucial component of the multifaceted system.",
				"Solved complex business problems with innovative solutions and strategic development practices.",
				"Engaged in both backend and frontend development, ensuring seamless feature integration.",
				"Created robust backend solutions for data processing and storage with intuitive frontend.",
				"Communicated directly with clients to refine the platform's functionality.",
			],
			tech: [
				t("C#", "Backend"),
				t("ASP.NET MVC", "Backend"),
				t(".NET Framework", "Backend"),
				t("Entity Framework", "Backend"),
				t("MySQL", "Data"),
				t("JavaScript", "Frontend"),
				t("HTML", "Frontend"),
				t("CSS", "Frontend"),
				t("Git", "DevOps"),
				t("Azure DevOps", "DevOps"),
				t("NUnit", "Backend"),
			],
		},
	],
	certifications: [
		{
			name: "Microsoft Certified: Azure Developer Associate",
			code: "AZ-204",
			issuer: "Microsoft",
			issuerLogo: "/microsoft_logo.jpg",
			about:
				"Build end-to-end solutions in Microsoft Azure: Azure Functions, web apps, storage solutions, and more.",
			issued: "2025-11",
			expires: "2026-11",
			credentialId: "D47FFA664405C85C",
			credentialUrl:
				"https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/D47FFA664405C85C",
		},
		{
			name: "Microsoft Certified: Azure Fundamentals",
			code: "AZ-900",
			issuer: "Microsoft",
			issuerLogo: "/microsoft_logo.jpg",
			about: "Understanding of Azure fundamentals.",
			issued: "2023-11",
			credentialId: "C4BD0FCD8D69A8C1",
			credentialUrl:
				"https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/C4BD0FCD8D69A8C1",
		},
		{
			name: "Microsoft Certified: Azure AI Fundamentals",
			code: "AI-900",
			issuer: "Microsoft",
			issuerLogo: "/microsoft_logo.jpg",
			about: "Understanding of Azure AI solutions.",
			issued: "2023-09",
			credentialId: "E2CBCF6AEE7B238E",
			credentialUrl:
				"https://learn.microsoft.com/api/credentials/share/en-us/dzhukovsky/E2CBCF6AEE7B238E",
		},
	],
	education: [
		{
			school: "Belarusian National Technical University",
			schoolUrl: "https://bntu.by/en",
			schoolLogo: "/bntu_logo.jpg",
			degree: "Bachelor's degree",
			field: "Information Technology",
			start: "2017-09",
			end: "2021-08",
		},
	],
	softSkills: [
		{
			name: "Critical Thinking",
			description:
				"Serving as a DevOps engineer, I anticipated a significant deployment challenge before it became apparent to the team. I proactively developed a custom Azure DevOps extension to manage multiple release definitions simultaneously. By the time the issue was recognized by senior members, I already had a ready-made solution. It later proved so effective that it was reused on another project, instantly solving a similar issue.",
		},
		{
			name: "Reliability",
			description:
				"Reliable development saves substantial resources long-term. While bug-free code is impossible, aiming for the highest quality is crucial. Even in junior roles, responsibility extends beyond ourselves to the team, project, and client. Transparency about existing problems is essential. Teamwork can preserve and enhance the client's impression through timely problem resolution.",
		},
		{
			name: "Perseverance",
			description:
				"On a challenging project, we encountered a significant problem with data stream loss — critical given the project's heavy reliance on data analysis. We undertook a multifaceted approach: log statistics, time-specific charts, in-depth code investigation. We created two detailed diagrams: one of the algorithm as coded, one as intended. Through teamwork and steadfast belief in our capabilities, we successfully rectified the problem.",
		},
	],
};

export const yearsOfExperience = (): number => {
	const start = new Date("2016-01-01");
	const ms = Date.now() - start.getTime();
	return Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25));
};

export const formatPeriod = (start: string, end?: string): string => {
	const fmt = (d: string) => {
		const [y, m] = d.split("-").map(Number);
		return new Date(y, (m ?? 1) - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};
	return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
};

export const monthsBetween = (start: string, end?: string): number => {
	const [sy, sm] = start.split("-").map(Number);
	const endDate = end
		? (() => {
				const [ey, em] = end.split("-").map(Number);
				return new Date(ey, (em ?? 1) - 1);
			})()
		: new Date();
	const startDate = new Date(sy, (sm ?? 1) - 1);
	return (
		(endDate.getFullYear() - startDate.getFullYear()) * 12 +
		(endDate.getMonth() - startDate.getMonth())
	);
};

export const formatDuration = (start: string, end?: string): string => {
	const m = monthsBetween(start, end);
	const y = Math.floor(m / 12);
	const mm = m % 12;
	if (y === 0) return `${mm} mo`;
	if (mm === 0) return `${y} yr`;
	return `${y} yr ${mm} mo`;
};
