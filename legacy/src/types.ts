export type LanguageLevel =
	| "A1"
	| "A2"
	| "B1"
	| "B2"
	| "C1"
	| "C2"
	| "Native speaker";

export interface Data {
	fullName: string;
	portfolioUrl?: string;
	linkedInUrl?: string;
	phoneNumber?: string;
	email?: string;
	lookingForPosition: string;
	summary?: string;
	address: Address;
	contractTypes: string[];
	languages?: Language[];
	technologies?: Technology[];
	projects?: Project[];
	certifications?: Certification[];
	educations?: Education[];
	softSkills?: SoftSkill[];
}

export interface Address {
	country: string;
	countryCode: string;
	locality: string;
}

export interface Language {
	name: string;
	code: string;
	level: LanguageLevel;
}

export interface TechnologyGroup {
	name: string;
	shortName?: string;
}

export interface Technology {
	name: string;
	expYears: number;
	expSource: string;
	lastDateUsed: Date;
	group: TechnologyGroup;
	patternIndex?: number;
}

export type ProjectTechnology = Omit<Technology, "lastDateUsed" | "expYears"> &
	Partial<Pick<Technology, "lastDateUsed" | "expYears">>;

export interface Project {
	name: string;
	company: string;
	companyUrl?: string;
	companyIconUrl?: string;
	position: string;
	areasOfActivity: string[];
	description?: string;
	startDate: Date;
	endDate?: Date;
	contribution?: string;
	technologies?: ProjectTechnology[];
}

export interface Certification {
	name: string;
	code: string;
	issuingOrganization: string;
	issuingOrganizationIconUrl: string;
	competencyRequired: string;
	issueDate: Date;
	credentialId: string;
	credentialUrl: string;
	expirationDate?: Date;
}

export interface Education {
	school: string;
	schoolUrl: string;
	schoolIconUrl: string;
	degree: string;
	fieldOfStudy: string;
	startDate: Date;
	endDate?: Date;
}

export interface SoftSkill {
	name: string;
	description: string;
}
