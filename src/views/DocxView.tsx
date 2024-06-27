import { AlignmentType, Document, ExternalHyperlink, HeadingLevel, Packer, Paragraph, ParagraphChild, TabStopPosition, TabStopType, TextRun } from 'docx'
import { FileChild } from 'docx/build/file/file-child';
import { saveAs } from 'file-saver';
import React from 'react'
import { allTechnologies, formatDates } from './../data';
import { Data, Technology } from './../types'
import { mapStackedTechnologies, sortStackedTechnologies } from './../components/Sections/Technologies';
import { sum } from './../components/Sections/TechnologiesRadar';
import { toDateDiffFullWords, yearsToDateDiff } from './../helpers/date';

const WINDOW_URL = `${window.location.host}${window.location.pathname}`.trimChar('/')
const NBSP = '\u00A0'
const SPACING = {
    HALF: 6 * 20, // 6 pt
    SINGLE: 12 * 20, // 12 pt
    ONE_AND_HALF: 18 * 20, // 18 pt
    DOUBLE: 24 * 20, // 24 pt
    TRIPLE: 36 * 20, // 36 pt
};

export const downloadDocx = async (data: Data, title: string) => {
    const doc = createDocument(data);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title}.docx`);
}

const createDocument = (data: Data) => new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: 'Segoe UI',
                },
                paragraph: {
                    spacing: { after: SPACING.HALF },
                    alignment: AlignmentType.JUSTIFIED,
                }
            },
            heading1: {
                run: {
                    bold: true,
                    allCaps: true,
                    size: 16 * 2,
                },
                paragraph: {
                    spacing: {
                        before: SPACING.DOUBLE,
                    },
                    keepNext: true,
                    alignment: AlignmentType.LEFT,
                }
            },
            heading2: {
                run: {
                    bold: true,
                    size: 12 * 2,
                },
                paragraph: {
                    spacing: {
                        before: SPACING.ONE_AND_HALF,
                    },
                    alignment: AlignmentType.LEFT,
                    keepNext: true
                }
            },
            heading3: {
                run: {
                    font: 'Segoe UI SemiBold',
                    size: 10 * 2,
                },
                paragraph: {
                    spacing: {
                        before: SPACING.SINGLE,
                    },
                    alignment: AlignmentType.LEFT,
                    keepNext: true
                }
            }
        },
    },
    sections: [
        {
            children: [
                new Paragraph({
                    text: data.fullName,
                    heading: HeadingLevel.TITLE
                }),
                createContactInfo(data),
                ...createSummary(data),
                ...createTechnologies(allTechnologies),
                ...createExperience(data),
                ...createLanguages(data),
                ...createCertifications(data),
                ...createEducations(data),
                ...createSoftSkills(data),
                createHeading1("References"),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'This CV was generated in real-time from my personal website ',
                        }),
                        createHyperlink(formatUrl(WINDOW_URL), WINDOW_URL),
                        new TextRun({
                            text: '.',
                        }),
                    ]
                }),
            ].filter(x => !!x).map(x => x as FileChild),
        }
    ],
})

const createContactInfo = (data: Data) => {

    const phone = data.phoneNumber?.replace(/[\s()]/g, '');
    const phoneNumber = !!data.phoneNumber ? [
        new TextRun({ text: `Mobile:${NBSP}` }),
        createHyperlink(`tel:${phone}`, phone, false),
    ] : []

    const email = !!data.email ? [
        new TextRun({ text: `Email:${NBSP}` }),
        createHyperlink(`mailto:${data.email}`, data.email, false),
    ] : []

    const location = !!data.location ? [
        new TextRun({ text: `Location:${NBSP}${data.locationShort}` }),
    ] : []

    const linkedInUrl = !!data.linkedInUrl ? [
        new TextRun({ text: `LinkedIn:${NBSP}` }),
        createHyperlink(formatUrl(data.linkedInUrl), data.linkedInUrl),
    ] : []

    const portfolioUrl = !!data.portfolioUrl ? [
        new TextRun({ text: `Portfolio:${NBSP}` }),
        createHyperlink(formatUrl(data.portfolioUrl), data.portfolioUrl),
    ] : []

    const items = [
        phoneNumber,
        email,
        location,
        linkedInUrl,
        portfolioUrl
    ].filter(x => x.length)

    const children: ParagraphChild[] = []

    if (!items.length) return null

    let skip = 0
    let size = items.length == 4 ? 2 : 3

    while (skip < items.length) {
        const diff = items.length - skip;
        const take = diff > size ? size : diff;
        if (skip > 0) children.push(new TextRun({ break: 1 }))

        items.slice(skip, skip + take).forEach((x, i, arr) => {
            children.push(...x)
            if (i < arr.length - 1) children.push(new TextRun({ text: ' | ' }))
        })

        skip += take
    }

    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: children
    })
}

const createSummary = (data: Data) => {
    if (!data.summary) return []

    return [
        createHeading1("Summary"),
        ...createParagraphsByLine(data.summary)
    ]
}

const createTechnologies = (technologies: Technology[]) => {
    if (!technologies?.length) return []

    const groups = sortStackedTechnologies(mapStackedTechnologies(technologies))

    return [
        createHeading1("Technologies"),
        ...groups.flatMap(group => [
            createHeading2(group.name),
            new Paragraph({
                children: group.technologies
                    .map(x => ({ name: x.name, expYears: sum(x.expYears.map(x => x.years)) }))
                    .flatMap((x, i, items) => {
                        const res = [
                            new TextRun({
                                text: x.name
                            }),
                            new TextRun({ text: ' ' }),
                            new TextRun({
                                text: `(${buildDateDiffText(x.expYears)[0]})`,
                                italics: true,
                            }),
                        ];

                        if (i < items.length - 1) res.push(new TextRun({ text: ', ' }))

                        return res
                    })
            })
        ])
    ]
}

const createExperience = (data: Data) => {
    if (!data.projects?.length) return []

    return [
        createHeading1("Experience"),
        ...data.projects.flatMap(project => [
            createHeading2(`${project.company} | ${project.name}`),
            createHeading3WithRightText(project.position, formatDates(project.startDate, project.endDate).replace(/\s/g, NBSP)),
            ...createBulletsByLine(project.myRole),
            ...!!project.technologies?.length ?
                [
                    new Paragraph({
                        children: [
                            new TextRun({
                                font: 'Segoe UI SemiBold',
                                text: 'Skills: '
                            }),
                            new TextRun({
                                text: project.technologies.map(x => x.name).sort().join(', ')
                            })
                        ],
                    })] : [],
        ])
    ]
}

const createLanguages = (data: Data) => {
    if (!data.languages?.length) return []

    return [
        createHeading1("Languages"),
        new Paragraph({
            text: data.languages.map(x => `${x.name}: ${x.level}`).join(' | '),
        })
    ]
}

const createCertifications = (data: Data) => {
    if (!data.certifications?.length) return []

    return [
        createHeading1("Licenses & certifications"),
        ...data.certifications.flatMap(certification => [
            createHeading3WithRightText(certification.name, formatDates(certification.issueDate, certification.expirationDate).replace(/\s/g, NBSP)),
            new Paragraph({
                text: `${certification.issuingOrganization} | Credential ID: ${certification.credentialId}`,
            }),
        ])
    ]
}

const createEducations = (data: Data) => {
    if (!data.educations?.length) return []

    return [
        createHeading1("Education"),
        ...data.educations.flatMap(education => [
            createHeading3WithRightText(education.school, formatDates(education.startDate, education.endDate).replace(/\s/g, NBSP)),
            new Paragraph({
                text: `${education.degree} | ${education.fieldOfStudy}`,
            }),
        ])
    ]
}

const createSoftSkills = (data: Data) => {
    if (!data.softSkills?.length) return []

    return [
        createHeading1("Soft Skills"),
        ...data.softSkills.flatMap(softSkills => [
            createHeading2(softSkills.name),
            ...createParagraphsByLine(softSkills.description)
        ])
    ]
}

const createHeading1 = (text: string) => new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
})

const createHeading2 = (text: string) => new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
})

const createHeading3 = (text: string) => new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
})

const createHeading3WithRightText = (text: string, rightText: string) => new Paragraph({
    heading: HeadingLevel.HEADING_3,
    tabStops: [{
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX
    }],
    children: [
        new TextRun({
            text: text,
        }),
        new TextRun({
            text: `\t${rightText}`,
        })
    ]
})

const createParagraphsByLine = (text?: string) =>
    text?.trim().split('\n').map(x => new Paragraph({ text: x.trim() })) ?? []


const createBulletsByLine = (text?: string) =>
    text?.trim().split('\n').map(x => new Paragraph({ text: x.trim(), bullet: { level: 0 } })) ?? []

const createHyperlink = (url: string, text?: string, underline: boolean = true) => new ExternalHyperlink({
    children: [
        new TextRun({
            text: text,
            style: "Hyperlink",
            underline: {
                type: !underline ? "none" : undefined
            }
        }),
    ],
    link: url,
})

const buildDateDiffText = (years: number): string[] => {
    const diff = yearsToDateDiff(years)
    const words = toDateDiffFullWords(diff)

    const result: string[] = []
    if (diff.years > 0) result.push(`${diff.years} ${words.years}`)
    if (diff.months > 0) result.push(`${diff.months} ${words.months}`)

    return result
}

const formatUrl = (url: string) => {
    if (!url.startsWith('http')) return `https://${url}`
    return url
}