-- seed_trait_mappings.sql
-- ~300 trait mappings for all 30 career paths
-- Run AFTER seed_career_paths.sql

-- ─── SOFTWARE ENGINEER ───────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.95, 'Core identity of the role — writing and architecting code is the primary activity'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.90, 'Debugging complex systems and designing elegant solutions is central to daily work'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.85, 'Breaking down requirements and evaluating technical trade-offs requires strong analytical thinking'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.65, 'Good engineers bring creativity to system design and problem framing'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical_skill', 0.95, 'Proficiency in languages, frameworks, and tooling is non-negotiable'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.80, 'Bugs arise from overlooked edge cases; precision matters'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.88, 'Engineers are continuously learning new technologies and solving novel problems'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'autonomy', 0.75, 'Many roles offer significant independence in choosing implementation approaches'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.70, 'Collaborating in cross-functional product teams is standard practice'
from public.career_paths where slug = 'software-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.85, 'Software engineering commands competitive salaries and equity in many markets'
from public.career_paths where slug = 'software-engineer';

-- ─── DATA SCIENTIST ──────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.95, 'Translating raw data into insight requires deep analytical reasoning'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.88, 'Designing experiments, reviewing literature, and validating models mirrors academic research'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.85, 'Proficiency in Python, SQL, and ML frameworks is essential'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'quantitative', 0.92, 'Statistics, probability, and linear algebra underpin all modelling work'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'scientific', 0.80, 'Hypothesis-driven thinking and rigorous methodology are core competencies'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.90, 'Each dataset presents unique puzzles requiring creative and rigorous approaches'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.72, 'Translating findings to non-technical stakeholders is a critical, often underrated skill'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.88, 'Distinguishing signal from noise and avoiding analytical fallacies requires rigorous critical thinking'
from public.career_paths where slug = 'data-scientist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.83, 'Data science roles are among the highest paid in the technology sector'
from public.career_paths where slug = 'data-scientist';

-- ─── CYBERSECURITY ANALYST ───────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.90, 'Deep knowledge of networks, operating systems, and attack vectors is required'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.88, 'Detecting anomalies and tracing attack chains demands systematic analytical thinking'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.85, 'Incident response is a high-stakes problem-solving exercise under time pressure'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.92, 'Missed indicators of compromise can result in serious breaches'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical_skill', 0.90, 'Hands-on skills with SIEM, pen-testing tools, and scripting are expected'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.75, 'Dealing with breaches and high-pressure incidents requires emotional resilience'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.82, 'The threat landscape evolves constantly, demanding continuous learning'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.68, 'Demand for cybersecurity professionals is high and growing across all sectors'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.80, 'New attack techniques emerge regularly, requiring constant adaptation of defences'
from public.career_paths where slug = 'cybersecurity-analyst';

-- ─── FINANCIAL ANALYST ───────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.92, 'Financial modelling and investment analysis are the core analytical activities'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'quantitative', 0.90, 'Valuation, DCF modelling, and statistical analysis demand strong quantitative skill'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.85, 'Analysts spend significant time researching companies, industries, and macroeconomic trends'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.88, 'Errors in financial models can lead to costly decisions'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.82, 'Evaluating investment theses and challenging assumptions requires sharp critical thinking'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.70, 'Presenting findings and recommendations to senior stakeholders is a key deliverable'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.85, 'Financial analysts in investment banking and asset management earn significant compensation'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.78, 'Markets are complex adaptive systems that reward deep understanding'
from public.career_paths where slug = 'financial-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'growth', 0.75, 'Strong progression path from analyst to associate to VP within financial services'
from public.career_paths where slug = 'financial-analyst';

-- ─── ACCOUNTANT ──────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.95, 'Accurate financial reporting requires meticulous attention to every figure and entry'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.82, 'Interpreting financial statements and identifying discrepancies requires sound analysis'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'quantitative', 0.85, 'Numbers and numerical relationships are the currency of accounting work'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.88, 'Managing filing deadlines, audit schedules, and client portfolios requires strong organisation'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.82, 'Accounting is a stable profession with demand across all industries and economic cycles'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'integrity', 0.90, 'Ethical standards and professional independence are foundational to the accounting profession'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'time_management', 0.80, 'Tax seasons and audit cycles create hard deadlines requiring disciplined time management'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.72, 'Identifying unusual transactions and evaluating accounting treatment decisions requires judgement'
from public.career_paths where slug = 'accountant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'work_life_balance', 0.55, 'Busy seasons can be intense, but overall work-life balance is reasonable in industry roles'
from public.career_paths where slug = 'accountant';

-- ─── FINTECH PRODUCT MANAGER ─────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.90, 'Product managers own the roadmap and must make strategic prioritisation decisions'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.85, 'Data-driven decision making and metrics interpretation drive product iteration'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.82, 'PMs lead without authority, influencing cross-functional teams toward a shared vision'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.88, 'Stakeholder alignment across engineering, design, compliance, and executives requires exceptional communication'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.70, 'Understanding APIs, system constraints, and engineering trade-offs improves decision quality'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.80, 'Fintech competes on novel financial products and improved customer experiences'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.78, 'Navigating regulation, technology, and market dynamics simultaneously is intellectually demanding'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.82, 'Regulatory changes and market shifts require rapid product pivots'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.88, 'Senior PM roles in fintech carry strong base salaries and equity upside'
from public.career_paths where slug = 'fintech-product-manager';

-- ─── PHYSICIAN ───────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'scientific', 0.90, 'Medical practice is grounded in biomedical science and evidence-based guidelines'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.88, 'Differential diagnosis and clinical reasoning require systematic analytical thinking'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'empathy', 0.85, 'Therapeutic relationships and patient communication rely heavily on empathy'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.90, 'Each patient presents a unique diagnostic and therapeutic challenge'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.92, 'The intrinsic motivation of most physicians is improving patient health and quality of life'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.85, 'Medical training and practice involve significant stress, loss, and emotional demands'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.88, 'Evaluating evidence and questioning assumptions is central to good clinical practice'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.85, 'Physicians are among the highest-compensated professionals, offsetting the long training period'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'legacy', 0.80, 'Physicians often cite long-term impact on patients and communities as a core value'
from public.career_paths where slug = 'physician';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.88, 'Medicine is a lifelong learning discipline with rapidly advancing knowledge'
from public.career_paths where slug = 'physician';

-- ─── NURSE PRACTITIONER ──────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'empathy', 0.92, 'Nurse practitioners build therapeutic relationships as a cornerstone of patient-centred care'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.90, 'Improving patient health outcomes is the primary motivator for most NPs'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'scientific', 0.78, 'Clinical decision-making is grounded in pharmacology, physiology, and evidence-based practice'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.88, 'Patient education and care coordination require clear and compassionate communication'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.82, 'NPs diagnose and treat complex conditions often as primary care providers'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.80, 'Healthcare work involves emotional stress, physically demanding environments, and difficult cases'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.82, 'Many NPs serve underserved or rural communities with limited healthcare access'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.85, 'Nursing remains one of the most in-demand professions with strong job security'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.72, 'Clinical guidelines and patient populations vary, requiring continuous adjustment'
from public.career_paths where slug = 'nurse-practitioner';

-- ─── HEALTH INFORMATICS SPECIALIST ───────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.85, 'Working with EHR systems, HL7 standards, and clinical databases requires technical depth'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.82, 'Data quality analysis and workflow optimisation rely on systematic analytical skills'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.75, 'Improving clinical data systems ultimately improves patient care outcomes'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.80, 'Managing complex implementation projects and data governance frameworks requires organisation'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.85, 'Data integrity in clinical systems directly affects patient safety'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.72, 'Translating clinical requirements to IT teams and vice versa is a key bridging function'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.75, 'Health informatics sits at the intersection of medicine and technology, creating rich complexity'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.70, 'Digital health transformation offers significant opportunity to innovate clinical workflows'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.78, 'Healthcare IT investment continues to grow, providing strong career security'
from public.career_paths where slug = 'health-informatics-specialist';

-- ─── UX DESIGNER ─────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'empathy', 0.92, 'Designing for users requires genuinely understanding their needs, frustrations, and mental models'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.85, 'Generating novel interface solutions and interaction patterns demands creative thinking'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.82, 'User research through interviews, surveys, and usability testing underpins good UX practice'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.70, 'Synthesising research findings and interpreting analytics data requires structured analysis'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.80, 'Presenting design rationale and facilitating critique sessions requires confident communication'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'artistic', 0.72, 'Visual sensibility supports the creation of aesthetically coherent design systems'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.75, 'Human behaviour and cognition offer endlessly complex puzzles for designers to explore'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.80, 'UX projects span different industries, user populations, and problem types'
from public.career_paths where slug = 'ux-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.78, 'Embedded in product squads, UX designers collaborate daily with PMs and engineers'
from public.career_paths where slug = 'ux-designer';

-- ─── PRODUCT DESIGNER ────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.90, 'Product design requires visual and conceptual creativity to deliver compelling user interfaces'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'artistic', 0.85, 'Strong visual craft in typography, colour, and layout is a core professional expectation'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'empathy', 0.85, 'User-centred design is built on understanding and advocating for the end user'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.70, 'Senior product designers connect design decisions to business outcomes and product strategy'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.78, 'Design critiques, stakeholder presentations, and documentation are regular outputs'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.82, 'Pixel-perfect execution and design system consistency require high precision'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.72, 'Balancing user needs, technical constraints, and business goals is a constant design challenge'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.75, 'The best product designers push the boundaries of interaction paradigms'
from public.career_paths where slug = 'product-designer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.80, 'Embedded within product teams, collaboration with engineers and PMs is constant'
from public.career_paths where slug = 'product-designer';

-- ─── BRAND STRATEGIST ────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.85, 'Developing distinctive brand positioning and messaging requires creative conceptual thinking'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.90, 'Brand strategy is fundamentally about making long-term positioning and differentiation decisions'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.82, 'Consumer insight, competitive analysis, and cultural trend research inform every strategy'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.80, 'Brand voice, messaging frameworks, and strategy documents require excellent writing'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.85, 'Presenting brand strategies to clients and senior leadership is a primary deliverable'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.70, 'Interpreting market data and brand tracking metrics requires analytical rigour'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.72, 'Navigating cultural contexts and consumer psychology is an intellectually rich challenge'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'recognition', 0.68, 'Successful brand work is often highly visible and attributable to the strategist'
from public.career_paths where slug = 'brand-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.78, 'Brand strategists often work across clients in different industries, providing rich variety'
from public.career_paths where slug = 'brand-strategist';

-- ─── MANAGEMENT CONSULTANT ───────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.92, 'Problem structuring and hypothesis-driven analysis are the foundation of consulting methodology'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.90, 'Consultants help clients make high-stakes strategic decisions with incomplete information'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.90, 'Client presentations, written deliverables, and stakeholder management are central to the role'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.88, 'Each engagement brings a novel, complex organisational problem to solve'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.85, 'Moving between clients, industries, and functional areas requires rapid adaptation'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.72, 'Project management and client relationship leadership develop quickly in consulting careers'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.88, 'Top-tier consulting firms offer some of the most competitive compensation packages available'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.88, 'Complex business problems across industries provide constant intellectual stimulation'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.88, 'Consulting exposes practitioners to many industries, business models, and functional areas'
from public.career_paths where slug = 'management-consultant';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'growth', 0.85, 'Consulting is renowned as an accelerated development environment for general management skills'
from public.career_paths where slug = 'management-consultant';

-- ─── OPERATIONS MANAGER ──────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.90, 'Coordinating multiple moving parts of a business requires exceptional organisation'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.85, 'Leading teams and driving performance improvement are core management responsibilities'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.78, 'Process analysis and performance metrics drive operational improvement decisions'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.82, 'Operational bottlenecks and supply chain disruptions require rapid problem-solving'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.80, 'Cross-departmental coordination and team leadership require clear communication'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.85, 'Success in operations depends on building and motivating high-performing teams'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'time_management', 0.85, 'Juggling multiple operational priorities and deadlines requires disciplined time management'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.72, 'Operations management roles exist in virtually every industry, providing career stability'
from public.career_paths where slug = 'operations-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'growth', 0.78, 'Strong operations managers progress to COO or general management positions'
from public.career_paths where slug = 'operations-manager';

-- ─── ENTREPRENEUR ────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'entrepreneurial', 0.95, 'Entrepreneurship is the direct expression of the entrepreneurial orientation'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.85, 'Entrepreneurs must inspire teams, attract talent, and lead through ambiguity'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.92, 'Failure and setback are nearly universal in entrepreneurship; resilience is a prerequisite'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.88, 'Market entry, competitive positioning, and resource allocation all demand strategic thinking'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.88, 'Entrepreneurs continuously solve novel problems without established playbooks'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'autonomy', 0.95, 'Entrepreneurship offers maximum autonomy over work, time, and direction'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.88, 'Creating new products, business models, or markets is the engine of entrepreneurship'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.90, 'Pivoting strategy in response to market feedback is a core entrepreneurial skill'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.70, 'Upside can be very large but financial outcomes are highly uncertain and variable'
from public.career_paths where slug = 'entrepreneur';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.90, 'Running a business means touching every functional area — no two days are the same'
from public.career_paths where slug = 'entrepreneur';

-- ─── CORPORATE LAWYER ────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.90, 'Legal analysis requires precise reasoning about statutes, precedents, and contractual language'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.90, 'Drafting contracts, memos, and briefs is the primary output of legal work'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.92, 'A single missed clause can expose clients to significant legal liability'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'negotiation', 0.85, 'Deal-making and dispute resolution both rely on skilled negotiation'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.88, 'Identifying legal risks and constructing persuasive arguments requires critical reasoning'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.82, 'Client advising, court appearances, and deal negotiations demand clear communication'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.90, 'Big-law associates and partners earn among the highest salaries of any profession'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.82, 'Complex transactions and evolving regulatory environments demand continuous learning'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.78, 'Long hours, high stakes, and adversarial contexts demand personal resilience'
from public.career_paths where slug = 'corporate-lawyer';

-- ─── POLICY ANALYST ──────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.90, 'Policy analysis is fundamentally a research-intensive discipline'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.88, 'Policy briefs, reports, and recommendations are the primary deliverables'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.85, 'Evaluating programme effectiveness and cost-benefit analysis require strong analytical skills'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'advocacy', 0.78, 'Policy analysts often champion evidence-based approaches with political stakeholders'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.85, 'Evaluating competing policy frameworks and unintended consequences requires critical thinking'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.80, 'Presenting findings to policymakers and public audiences is a key function'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.82, 'Public policy intersects economics, sociology, law, and politics — deeply complex territory'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.82, 'Improving public systems and outcomes for citizens is the core mission'
from public.career_paths where slug = 'policy-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.75, 'Effective policy work improves lives at scale — a powerful motivator for many analysts'
from public.career_paths where slug = 'policy-analyst';

-- ─── COMPLIANCE OFFICER ──────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.92, 'Regulatory requirements must be tracked and met precisely to avoid penalties'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.82, 'Gap analysis and risk assessment require systematic analytical thinking'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.88, 'Managing audit schedules, training programmes, and policy documentation requires organisation'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.80, 'Training staff and advising leadership on compliance matters requires clear communication'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'advocacy', 0.72, 'Compliance officers champion ethical behaviour and regulatory adherence within organisations'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.78, 'Interpreting ambiguous regulations and assessing their applicability requires careful judgement'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.80, 'Compliance is a growing function as regulatory environments become more complex'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'integrity', 0.90, 'Upholding ethical standards and acting with integrity is the purpose of the compliance function'
from public.career_paths where slug = 'compliance-officer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'time_management', 0.75, 'Regulatory filing deadlines and audit cycles require disciplined time management'
from public.career_paths where slug = 'compliance-officer';

-- ─── TEACHER ─────────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teaching', 0.95, 'Instruction and curriculum delivery are the core professional functions'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'empathy', 0.88, 'Understanding individual student needs and creating an inclusive environment depends on empathy'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.90, 'Explaining complex ideas clearly and engaging diverse learners requires excellent communication'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'social', 0.85, 'Teaching is a deeply relational profession centred on community and connection'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.90, 'Supporting student growth and development is the primary intrinsic reward of teaching'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'patience', 0.85, 'Working with learners at different developmental stages requires considerable patience'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.78, 'Planning lessons, tracking progress, and managing classrooms requires strong organisation'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.85, 'Teachers are central to local communities and often serve beyond the classroom'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'legacy', 0.82, 'Many teachers cite long-term student impact and contribution to society as a core motivation'
from public.career_paths where slug = 'teacher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'work_life_balance', 0.65, 'School calendars offer structured time off, though planning and marking create hidden workload'
from public.career_paths where slug = 'teacher';

-- ─── EDTECH DEVELOPER ────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.85, 'Building educational software platforms requires strong software engineering skills'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.78, 'Designing engaging learning experiences requires creative instructional approaches'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teaching', 0.72, 'Understanding pedagogy and learning science informs effective edtech product design'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.78, 'Improving learning outcomes for students is a core motivator in edtech'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.75, 'Learning analytics and A/B testing drive evidence-based product improvements'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.80, 'EdTech is a space where technology can fundamentally transform how people learn'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.78, 'Technical and instructional challenges arise at every stage of product development'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.75, 'Combining learning science with engineering is a rich interdisciplinary challenge'
from public.career_paths where slug = 'edtech-developer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.70, 'EdTech work often serves under-resourced schools and learners, with significant community impact'
from public.career_paths where slug = 'edtech-developer';

-- ─── ACADEMIC RESEARCHER ─────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.95, 'Original research is the entire purpose of an academic research career'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.90, 'Analysing data, evaluating evidence, and testing hypotheses is daily work'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.88, 'Publishing peer-reviewed papers and grant applications are primary career outputs'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'scientific', 0.90, 'Scientific methodology and rigour are foundational to all research practice'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.92, 'Pushing the boundaries of knowledge requires sustained deep intellectual engagement'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'autonomy', 0.82, 'Established researchers have significant freedom to pursue questions that interest them'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.80, 'Grant rejections, publication delays, and competitive pressures demand resilience'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'legacy', 0.85, 'Contributing to the permanent body of human knowledge is a powerful motivator for researchers'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teaching', 0.68, 'Academic researchers typically have some teaching responsibilities alongside their research'
from public.career_paths where slug = 'academic-researcher';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.90, 'Evaluating methodologies, questioning assumptions, and peer reviewing requires sharp critical thinking'
from public.career_paths where slug = 'academic-researcher';

-- ─── JOURNALIST ──────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.92, 'Writing clear, accurate, and compelling stories is the fundamental skill of journalism'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.88, 'Investigative reporting relies on thorough research, source development, and document review'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.85, 'Interviews, source relationships, and editorial collaboration all require strong communication'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'advocacy', 0.78, 'Journalism serves a democratic function by holding power accountable'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'critical_thinking', 0.85, 'Evaluating source credibility, verifying facts, and identifying narrative bias requires critical thinking'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.80, 'News cycles are unpredictable; journalists must rapidly adapt to breaking stories'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.75, 'Rejection, criticism, and demanding deadlines are standard features of journalism'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.78, 'Each story demands rapid expertise acquisition in a new subject area'
from public.career_paths where slug = 'journalist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.85, 'Journalists cover many beats and stories, making no two weeks identical'
from public.career_paths where slug = 'journalist';

-- ─── CONTENT STRATEGIST ──────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.88, 'Crafting content guidelines, editorial frameworks, and high-quality copy is central to the role'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.85, 'Aligning content investment with business goals and audience needs requires strategic thinking'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.78, 'Content performance metrics and audience data inform strategy and channel decisions'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.80, 'Generating original content ideas and compelling editorial angles requires creativity'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.82, 'Coordinating writers, designers, and stakeholders requires strong communication and influence'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.78, 'Managing editorial calendars across multiple channels and contributors requires organisation'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.70, 'Understanding audience psychology and content distribution algorithms is a complex challenge'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'autonomy', 0.72, 'Senior content strategists often have significant ownership over their domain'
from public.career_paths where slug = 'content-strategist';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.75, 'Working across multiple brands, topics, and formats keeps the work varied'
from public.career_paths where slug = 'content-strategist';

-- ─── PR MANAGER ──────────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.92, 'Media relations, spokesperson coaching, and stakeholder messaging are core responsibilities'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'writing', 0.85, 'Press releases, talking points, and crisis statements are primary written deliverables'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.80, 'Reputation management and proactive narrative campaigns require long-term strategic thinking'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'social', 0.88, 'Building and maintaining relationships with journalists, influencers, and executives is central'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.85, 'Crisis situations demand rapid, high-quality communication under extreme time pressure'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.72, 'Managing crises and negative press coverage requires emotional resilience'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.65, 'Media monitoring, share-of-voice metrics, and sentiment analysis inform PR strategy'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'recognition', 0.70, 'Successful PR campaigns are highly visible and build reputational capital for the practitioner'
from public.career_paths where slug = 'pr-manager';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.78, 'PR work spans product launches, events, crises, and campaigns — highly varied'
from public.career_paths where slug = 'pr-manager';

-- ─── STARTUP FOUNDER ─────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'entrepreneurial', 0.98, 'Founding a startup is the purest expression of the entrepreneurial drive'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.95, 'Startup failure rates are high; founders require extraordinary resilience to persist'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.90, 'Attracting co-founders, early employees, and investors depends on compelling leadership'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.90, 'Founders define the vision, business model, and competitive strategy'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'adaptability', 0.92, 'Pivoting based on market feedback is a fundamental startup skill'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'autonomy', 0.95, 'Founders have unparalleled control over their work and direction'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'innovation', 0.90, 'Startups exist to introduce novel solutions to market problems'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.85, 'Pitching investors, recruiting talent, and selling to customers all demand persuasive communication'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.75, 'Upside through equity can be extraordinary for successful founders, though most startups fail'
from public.career_paths where slug = 'startup-founder';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'growth', 0.85, 'Founders develop an unparalleled breadth of business skills across the full company lifecycle'
from public.career_paths where slug = 'startup-founder';

-- ─── VENTURE CAPITAL ANALYST ─────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.88, 'Evaluating startup business models, market sizes, and financial projections requires deep analysis'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'research', 0.85, 'Market research and competitive landscape analysis are core diligence activities'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'strategic', 0.82, 'Investment theses and portfolio construction require long-term strategic thinking'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'entrepreneurial', 0.80, 'VC analysts are immersed in the startup ecosystem and often have entrepreneurial ambitions'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'social', 0.82, 'Deal sourcing, founder relationships, and LP networking are relationship-intensive activities'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'communication', 0.78, 'Investment memos, partner meetings, and founder interactions require clear articulate communication'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.85, 'Predicting future technology trends and evaluating non-consensus investment theses is deeply challenging'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.82, 'Carried interest in successful funds can generate significant long-term wealth'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'variety', 0.82, 'Evaluating startups across many sectors and stages provides exceptional breadth'
from public.career_paths where slug = 'venture-capital-analyst';

-- ─── FRANCHISE OPERATOR ──────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'leadership', 0.85, 'Managing staff, training employees, and driving team performance are daily responsibilities'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'organizational', 0.88, 'Coordinating inventory, scheduling, compliance, and local marketing requires strong organisation'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'entrepreneurial', 0.75, 'Franchise operators take entrepreneurial risk within an established system'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.82, 'Building a committed team that delivers consistent customer experience is critical'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.68, 'Reviewing unit economics, sales trends, and cost controls requires basic analytical skills'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'resilience', 0.78, 'Small business ownership involves dealing with setbacks, difficult staff situations, and market pressures'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'financial_reward', 0.65, 'Profitability varies by brand and location; strong operators can build valuable multi-unit portfolios'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.72, 'Franchise businesses are rooted in local communities and often serve as community employers'
from public.career_paths where slug = 'franchise-operator';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.65, 'Established franchise brands offer more predictable operating models than independent businesses'
from public.career_paths where slug = 'franchise-operator';

-- ─── CIVIL ENGINEER ──────────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.88, 'Structural and hydraulic calculations require rigorous analytical reasoning'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.85, 'CAD software, simulation tools, and engineering standards are core technical competencies'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.85, 'Every infrastructure project presents unique site conditions and engineering challenges'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'hands_on', 0.78, 'Site inspections, construction oversight, and field work connect engineering to physical reality'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.88, 'Engineering errors in infrastructure can have catastrophic safety consequences'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'teamwork', 0.78, 'Infrastructure projects require coordination across architects, contractors, and government agencies'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'legacy', 0.80, 'Civil engineers create infrastructure that serves communities for decades or centuries'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.78, 'Government and infrastructure investment provides sustained demand for civil engineers'
from public.career_paths where slug = 'civil-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.75, 'Infrastructure projects directly shape the built environment that communities inhabit'
from public.career_paths where slug = 'civil-engineer';

-- ─── MECHANICAL ENGINEER ─────────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.90, 'Mechanical engineering requires mastery of thermodynamics, mechanics, and materials science'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.88, 'Stress analysis, thermal modelling, and system simulation require rigorous analytical skills'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'creative', 0.72, 'Mechanical design involves creative problem-solving within physical constraints'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'hands_on', 0.80, 'Prototyping, testing, and working with physical components is a core part of the role'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.85, 'Mechanical failures and design challenges require innovative engineering solutions'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.85, 'Tolerances, material specifications, and safety factors must be precise'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical_skill', 0.90, 'CAD tools, FEA software, and manufacturing process knowledge are essential'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.78, 'Applying fundamental physics to solve complex real-world engineering challenges is deeply engaging'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'stability', 0.75, 'Mechanical engineers work across many industries, providing strong career resilience'
from public.career_paths where slug = 'mechanical-engineer';

-- ─── ENVIRONMENTAL ENGINEER ──────────────────────────────────────────────────
insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'scientific', 0.85, 'Environmental engineering is grounded in chemistry, ecology, and earth science'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'analytical', 0.85, 'Environmental impact assessments and remediation modelling require rigorous analysis'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'problem_solving', 0.82, 'Designing pollution control systems and sustainable infrastructure requires creative solutions'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'advocacy', 0.80, 'Environmental engineers often advocate for sustainable practices within organisations and policy'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'helping_others', 0.78, 'Protecting public health and environmental quality is a core professional motivation'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'attention_to_detail', 0.82, 'Environmental regulations require precise compliance measurement and documentation'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'technical', 0.80, 'Environmental monitoring equipment, GIS tools, and remediation technologies require technical skill'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'community', 0.78, 'Environmental engineering work directly protects the health of communities and ecosystems'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'legacy', 0.82, 'Environmental engineers contribute to long-term sustainability that benefits future generations'
from public.career_paths where slug = 'environmental-engineer';

insert into public.career_trait_mappings (career_path_id, trait_key, weight, rationale)
select id, 'intellectual_challenge', 0.75, 'Addressing complex environmental systems and regulatory frameworks is intellectually demanding'
from public.career_paths where slug = 'environmental-engineer';
