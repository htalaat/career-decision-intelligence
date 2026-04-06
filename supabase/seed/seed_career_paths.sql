-- seed_career_paths.sql
-- 30 career paths across 10 domains (3 per domain)
-- Run after schema migrations

insert into public.career_paths
  (slug, title, domain, summary, education_path, typical_duration_years, income_potential, tags, active)
values

-- ─── TECHNOLOGY ──────────────────────────────────────────────────────────────
(
  'software-engineer',
  'Software Engineer',
  'Technology',
  'Designs, builds, and maintains software systems ranging from mobile apps to large-scale distributed platforms. Works across the full development lifecycle, from requirements through deployment.',
  'Bachelor''s degree in Computer Science, Software Engineering, or related field; bootcamp paths also viable.',
  4,
  'very_high',
  array['technical','analytical','problem_solving','creative'],
  true
),
(
  'data-scientist',
  'Data Scientist',
  'Technology',
  'Extracts insights from large datasets using statistical modelling, machine learning, and data visualisation to inform business strategy and product decisions.',
  'Bachelor''s or Master''s degree in Statistics, Mathematics, Computer Science, or Data Science.',
  5,
  'very_high',
  array['analytical','research','technical','quantitative'],
  true
),
(
  'cybersecurity-analyst',
  'Cybersecurity Analyst',
  'Technology',
  'Monitors networks and systems for security threats, investigates breaches, and implements protective controls to safeguard organisational data and infrastructure.',
  'Bachelor''s degree in Cybersecurity, Computer Science, or IT; certifications such as CompTIA Security+, CISSP valuable.',
  4,
  'high',
  array['technical','analytical','problem_solving','attention_to_detail'],
  true
),

-- ─── FINANCE ─────────────────────────────────────────────────────────────────
(
  'financial-analyst',
  'Financial Analyst',
  'Finance',
  'Evaluates investment opportunities, builds financial models, and produces reports to guide corporate or portfolio decisions. Works in banking, asset management, or corporate finance.',
  'Bachelor''s degree in Finance, Economics, or Accounting; CFA designation often pursued.',
  4,
  'high',
  array['analytical','quantitative','research','strategic'],
  true
),
(
  'accountant',
  'Accountant',
  'Finance',
  'Prepares and audits financial statements, manages tax compliance, and ensures organisations adhere to accounting standards and regulatory requirements.',
  'Bachelor''s degree in Accounting; CPA licensure typically required for public accounting.',
  4,
  'medium',
  array['analytical','attention_to_detail','organizational','quantitative'],
  true
),
(
  'fintech-product-manager',
  'Fintech Product Manager',
  'Finance',
  'Owns the roadmap for financial technology products, bridging customer needs, regulatory constraints, and engineering capability to ship compliant, user-centric features.',
  'Bachelor''s degree in Finance, CS, or Business; MBA or product management experience preferred.',
  5,
  'very_high',
  array['strategic','technical','leadership','analytical'],
  true
),

-- ─── HEALTHCARE ──────────────────────────────────────────────────────────────
(
  'physician',
  'Physician',
  'Healthcare',
  'Diagnoses and treats medical conditions, orders and interprets tests, and develops care plans for patients across a broad range of clinical specialties.',
  'Bachelor''s degree, then Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO); residency 3–7 years.',
  11,
  'very_high',
  array['scientific','analytical','empathy','problem_solving'],
  true
),
(
  'nurse-practitioner',
  'Nurse Practitioner',
  'Healthcare',
  'Provides primary and specialty healthcare including diagnosis, treatment, and prescriptions, often serving as a primary care provider in underserved communities.',
  'Bachelor''s in Nursing (BSN), then Master''s of Science in Nursing (MSN) with NP specialisation; licensure required.',
  6,
  'high',
  array['empathy','scientific','helping_others','communication'],
  true
),
(
  'health-informatics-specialist',
  'Health Informatics Specialist',
  'Healthcare',
  'Manages healthcare data systems and electronic health records to improve clinical workflows, data quality, and patient outcomes through technology-driven solutions.',
  'Bachelor''s or Master''s degree in Health Informatics, Information Systems, or related field.',
  4,
  'high',
  array['technical','analytical','organizational','helping_others'],
  true
),

-- ─── DESIGN ──────────────────────────────────────────────────────────────────
(
  'ux-designer',
  'UX Designer',
  'Design',
  'Researches user behaviour, designs interaction flows, and creates wireframes and prototypes that result in intuitive and accessible digital experiences.',
  'Bachelor''s degree in Design, HCI, or Psychology; portfolio-driven; bootcamps widely accepted.',
  4,
  'high',
  array['creative','empathy','research','artistic'],
  true
),
(
  'product-designer',
  'Product Designer',
  'Design',
  'Shapes the end-to-end user experience of digital products, integrating visual design, interaction design, and product thinking to drive engagement and usability.',
  'Bachelor''s degree in Graphic Design, Interaction Design, or HCI; strong portfolio essential.',
  4,
  'high',
  array['creative','artistic','strategic','empathy'],
  true
),
(
  'brand-strategist',
  'Brand Strategist',
  'Design',
  'Develops brand identity, positioning, and messaging frameworks that differentiate organisations and connect with target audiences across channels.',
  'Bachelor''s degree in Marketing, Design, or Communications; MBA or brand management experience beneficial.',
  4,
  'high',
  array['creative','strategic','writing','research'],
  true
),

-- ─── BUSINESS ────────────────────────────────────────────────────────────────
(
  'management-consultant',
  'Management Consultant',
  'Business',
  'Partners with organisations to solve complex business problems, improve operations, and execute strategic change initiatives across industries.',
  'Bachelor''s degree in Business, Economics, or Engineering; MBA strongly preferred for top-tier firms.',
  5,
  'very_high',
  array['analytical','strategic','communication','leadership'],
  true
),
(
  'operations-manager',
  'Operations Manager',
  'Business',
  'Oversees day-to-day business processes, optimises supply chains and workflows, and leads cross-functional teams to meet organisational performance targets.',
  'Bachelor''s degree in Business Administration, Operations, or Industrial Engineering; PMP or Six Sigma certification valued.',
  4,
  'high',
  array['leadership','organizational','strategic','teamwork'],
  true
),
(
  'entrepreneur',
  'Entrepreneur',
  'Business',
  'Identifies market opportunities, builds ventures from the ground up, manages risk, and assembles the resources and teams needed to scale a business.',
  'No fixed requirement; Bachelor''s in Business or relevant field common; experience and networks often outweigh credentials.',
  4,
  'very_high',
  array['entrepreneurial','leadership','strategic','resilience'],
  true
),

-- ─── LAW / POLICY ────────────────────────────────────────────────────────────
(
  'corporate-lawyer',
  'Corporate Lawyer',
  'Law/Policy',
  'Advises businesses on legal matters including mergers and acquisitions, contracts, corporate governance, and regulatory compliance.',
  'Bachelor''s degree, then Juris Doctor (JD); bar exam required for licensure; specialisation in corporate law.',
  7,
  'very_high',
  array['analytical','writing','attention_to_detail','negotiation'],
  true
),
(
  'policy-analyst',
  'Policy Analyst',
  'Law/Policy',
  'Researches and evaluates public policies, drafts recommendations for government or non-profit clients, and communicates findings to stakeholders and policymakers.',
  'Bachelor''s degree in Political Science, Economics, or Public Policy; Master''s in Public Policy (MPP) often preferred.',
  5,
  'medium',
  array['research','writing','analytical','advocacy'],
  true
),
(
  'compliance-officer',
  'Compliance Officer',
  'Law/Policy',
  'Ensures that organisations meet legal, regulatory, and ethical standards by designing compliance programmes, conducting audits, and training staff.',
  'Bachelor''s degree in Law, Business, or Finance; Certified Compliance & Ethics Professional (CCEP) credential valued.',
  4,
  'high',
  array['analytical','attention_to_detail','organizational','advocacy'],
  true
),

-- ─── EDUCATION ───────────────────────────────────────────────────────────────
(
  'teacher',
  'Teacher',
  'Education',
  'Designs and delivers curriculum to K-12 or post-secondary students, adapting instruction to diverse learning needs and fostering academic and personal growth.',
  'Bachelor''s degree in Education or subject specialisation; state teaching licensure required; Master''s increasingly common.',
  4,
  'medium',
  array['teaching','empathy','communication','social'],
  true
),
(
  'edtech-developer',
  'EdTech Developer',
  'Education',
  'Builds educational technology platforms, tools, and content that improve learning outcomes, blending instructional design expertise with software engineering.',
  'Bachelor''s degree in Computer Science, Education, or Instructional Design; portfolio of learning products valued.',
  4,
  'high',
  array['technical','creative','teaching','analytical'],
  true
),
(
  'academic-researcher',
  'Academic Researcher',
  'Education',
  'Conducts original research within a discipline, publishes findings in peer-reviewed journals, applies for grants, and contributes to knowledge that advances their field.',
  'Master''s degree minimum; Doctor of Philosophy (PhD) typically required for independent research and faculty positions.',
  9,
  'medium',
  array['research','analytical','writing','scientific'],
  true
),

-- ─── MEDIA / COMMS ───────────────────────────────────────────────────────────
(
  'journalist',
  'Journalist',
  'Media/Comms',
  'Investigates, writes, and publishes news stories across print, broadcast, and digital platforms, upholding accuracy and public accountability.',
  'Bachelor''s degree in Journalism or Communications; portfolio and internship experience critical.',
  4,
  'medium',
  array['writing','research','communication','advocacy'],
  true
),
(
  'content-strategist',
  'Content Strategist',
  'Media/Comms',
  'Plans and governs content across digital channels, aligning editorial calendars, tone of voice, and distribution with business and audience goals.',
  'Bachelor''s degree in Communications, Marketing, or English; experience with SEO and content management platforms valued.',
  4,
  'high',
  array['writing','strategic','creative','analytical'],
  true
),
(
  'pr-manager',
  'PR Manager',
  'Media/Comms',
  'Manages an organisation''s public image through media relations, crisis communications, and stakeholder engagement strategies.',
  'Bachelor''s degree in Public Relations, Communications, or Journalism; APR certification beneficial.',
  4,
  'high',
  array['communication','writing','strategic','social'],
  true
),

-- ─── ENTREPRENEURSHIP ────────────────────────────────────────────────────────
(
  'startup-founder',
  'Startup Founder',
  'Entrepreneurship',
  'Conceives, launches, and scales a technology or product-driven startup, raising capital, building teams, and iterating on product-market fit under conditions of high uncertainty.',
  'No fixed requirement; technical or business background common; track record and networks often decisive.',
  4,
  'very_high',
  array['entrepreneurial','leadership','resilience','strategic'],
  true
),
(
  'venture-capital-analyst',
  'Venture Capital Analyst',
  'Entrepreneurship',
  'Evaluates early-stage investment opportunities, conducts due diligence, supports portfolio companies, and develops theses on emerging technology and market trends.',
  'Bachelor''s degree in Finance, Business, or Engineering; MBA or startup experience increasingly valued.',
  5,
  'very_high',
  array['analytical','research','strategic','entrepreneurial'],
  true
),
(
  'franchise-operator',
  'Franchise Operator',
  'Entrepreneurship',
  'Licenses and operates a franchise business unit within an established brand system, managing staff, local marketing, and day-to-day operations to meet franchisor standards.',
  'No fixed degree requirement; business or management background helpful; franchisor training programmes provided.',
  2,
  'high',
  array['leadership','organizational','entrepreneurial','teamwork'],
  true
),

-- ─── ENGINEERING ─────────────────────────────────────────────────────────────
(
  'civil-engineer',
  'Civil Engineer',
  'Engineering',
  'Plans, designs, and oversees construction of infrastructure projects such as roads, bridges, water systems, and buildings, ensuring safety and regulatory compliance.',
  'Bachelor''s degree in Civil Engineering; Professional Engineer (PE) licensure typically required for independent practice.',
  4,
  'high',
  array['analytical','technical','problem_solving','hands_on'],
  true
),
(
  'mechanical-engineer',
  'Mechanical Engineer',
  'Engineering',
  'Designs and develops mechanical systems, devices, and machines, applying principles of physics and materials science to create products across automotive, aerospace, and manufacturing sectors.',
  'Bachelor''s degree in Mechanical Engineering; PE licensure valuable; graduate study common for R&D roles.',
  4,
  'high',
  array['technical','analytical','creative','hands_on'],
  true
),
(
  'environmental-engineer',
  'Environmental Engineer',
  'Engineering',
  'Develops solutions to environmental problems including pollution control, waste management, and sustainable infrastructure, working at the intersection of engineering and ecological science.',
  'Bachelor''s degree in Environmental Engineering or Civil Engineering with environmental specialisation; PE licensure beneficial.',
  4,
  'high',
  array['scientific','analytical','problem_solving','advocacy'],
  true
);
