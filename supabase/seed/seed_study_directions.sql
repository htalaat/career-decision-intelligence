-- seed_study_directions.sql
-- Study direction mappings for all 30 career paths
-- Each career gets 1–3 directions (primary / secondary / alternative)
-- Run AFTER seed_career_paths.sql

-- ─── TECHNOLOGY ──────────────────────────────────────────────────────────────

-- software-engineer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science',
  'Strong programs in US, UK, Germany, and Canada. Egypt: Cairo University, AUC, GUC offer respected CS degrees. Gulf: KAUST (SA), AUS (UAE) for strong placements.',
  'Mathematics, logical thinking, problem-solving aptitude',
  4, 'primary'
from public.career_paths where slug = 'software-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Software Engineering',
  'Dedicated SE programs available in Egypt (Ain Shams, MSA), UAE (Khalifa University), and widely across the US and UK. Focuses more on process and systems than pure CS.',
  'Mathematics, physics, interest in systems design',
  4, 'secondary'
from public.career_paths where slug = 'software-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bootcamp', 'Full-Stack Web Development',
  'Coding bootcamps widely accepted in the US, UK, and increasingly in the UAE. Egypt has local bootcamps (e.g., Re:Coded, ITI intensive programs). 3–12 month intensive programs.',
  'Basic computer literacy, strong motivation, portfolio mindset',
  1, 'alternative'
from public.career_paths where slug = 'software-engineer';

-- data-scientist
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Data Science',
  'Dedicated BS Data Science programs growing fast in the US (UC Berkeley, MIT), UK (Edinburgh, Warwick), and Germany (TU Munich). Egypt: limited standalone programs; Statistics + CS combination common at Cairo University.',
  'Strong mathematics, statistics, programming (Python/R preferred)',
  4, 'primary'
from public.career_paths where slug = 'data-scientist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'natural_sciences', 'bachelor', 'Statistics and Mathematics',
  'Strong quantitative foundation available in Egypt (Cairo University Faculty of Science), Saudi Arabia (KFUPM), UK (Oxford, Cambridge). Often combined with CS electives.',
  'High school mathematics excellence, analytical mindset',
  4, 'secondary'
from public.career_paths where slug = 'data-scientist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'master', 'Machine Learning and Data Science',
  'Top MSc programs: US (Stanford, CMU), UK (Imperial, UCL), Canada (U of T, UBC), Germany (TU Munich — fully funded options). UAE: Mohamed Bin Zayed University of AI (MBZUAI) is fully funded.',
  'Bachelor''s in a quantitative field, programming skills, linear algebra',
  2, 'alternative'
from public.career_paths where slug = 'data-scientist';

-- cybersecurity-analyst
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Cybersecurity',
  'Specialist cybersecurity degrees growing in the US (Purdue, Carnegie Mellon), UK (Royal Holloway), and UAE (Khalifa University). Egypt: Information Security programs at MET and military-affiliated institutions.',
  'Computer fundamentals, networking basics, attention to detail',
  4, 'primary'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science with Networking Specialisation',
  'Mainstream CS degree widely available. Egypt: GUC, AUC; Gulf: AUS, UAEU; US/UK: any accredited CS program. Supplement with CompTIA Security+, CEH, or OSCP certifications.',
  'Mathematics, logical reasoning, curiosity about systems',
  4, 'secondary'
from public.career_paths where slug = 'cybersecurity-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'certificate', 'CompTIA Security+ / CEH / OSCP Certification Path',
  'Globally recognized certifications with no country restriction. Cost-effective entry path especially popular in Egypt and Gulf where employer demand for certified professionals is rising without requiring a formal degree.',
  'Basic IT literacy, networking fundamentals (CompTIA Network+), self-study discipline',
  1, 'alternative'
from public.career_paths where slug = 'cybersecurity-analyst';

-- ─── FINANCE ─────────────────────────────────────────────────────────────────

-- financial-analyst
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Finance',
  'Core finance degree offered across all major destinations. Egypt: AUC, BUE, Faculty of Commerce (Cairo University). Gulf: AUS, UAEU, KAU (Saudi Arabia). US: Wharton, NYU Stern. UK: LSE, Warwick.',
  'Mathematics, economics, interest in capital markets',
  4, 'primary'
from public.career_paths where slug = 'financial-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Economics',
  'Strong economics programs at Cairo University, American University of Beirut, LSE (UK), University of Toronto (Canada). Provides analytical and macro-level foundation complemented by finance electives.',
  'Mathematics, analytical thinking, interest in markets and policy',
  4, 'secondary'
from public.career_paths where slug = 'financial-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'certificate', 'CFA (Chartered Financial Analyst) Program',
  'Global credential, no geographic restriction. CFA Institute recognized in Egypt, UAE, Saudi Arabia, US, UK, and Canada. Typically pursued alongside or after a bachelor''s degree.',
  'Bachelor''s degree in any field, strong quantitative skills',
  3, 'alternative'
from public.career_paths where slug = 'financial-analyst';

-- accountant
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Accounting',
  'Accounting degrees widely available. Egypt: Faculty of Commerce programs at Cairo, Alexandria, and Ain Shams universities. Gulf: ACCA-accredited programs at AUS, Zayed University. UK: ICAEW pathway universities.',
  'Mathematics, attention to detail, organizational skills',
  4, 'primary'
from public.career_paths where slug = 'accountant';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration (Accounting Track)',
  'BBA with accounting concentration available in Egypt (ESLSCA, Future University), UAE (Abu Dhabi University), Saudi Arabia (KFUPM School of Business), and globally.',
  'Mathematics, business awareness, analytical aptitude',
  4, 'secondary'
from public.career_paths where slug = 'accountant';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'certificate', 'ACCA / CPA Professional Qualification',
  'ACCA recognized in 180+ countries and highly valued in Egypt, UAE, Saudi Arabia, and UK. CPA is the US/Canada standard. Both can be pursued part-time alongside work.',
  'Bachelor''s degree in accounting or finance; or exemptions via recognized degree',
  3, 'alternative'
from public.career_paths where slug = 'accountant';

-- fintech-product-manager
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science or Information Systems',
  'Strong technical foundation critical. Egypt: GUC, AUC, MTI. UAE: AUS, Heriot-Watt Dubai. UK: King''s College, Manchester. US: any strong CS program. Product management skills layered on top.',
  'Programming aptitude, systems thinking, interest in financial products',
  4, 'primary'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Finance with Technology Minor',
  'Finance programs with fintech or IS electives available at American University Cairo, UAE University, and global business schools. Growing demand in Gulf states as fintech hubs expand (DIFC, Riyadh FinTech hub).',
  'Finance literacy, curiosity about technology, analytical thinking',
  4, 'secondary'
from public.career_paths where slug = 'fintech-product-manager';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'master', 'MBA with Fintech or Digital Innovation Specialisation',
  'MBA programs with fintech tracks available at LBS (UK), INSEAD (France), UT Austin (US), and KAUST (Saudi Arabia). Dubai and Abu Dhabi also host satellite campuses of global MBA programs.',
  'Bachelor''s degree (any field), 2+ years work experience, GMAT/GRE score',
  2, 'alternative'
from public.career_paths where slug = 'fintech-product-manager';

-- ─── HEALTHCARE ──────────────────────────────────────────────────────────────

-- physician
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'bachelor', 'Medicine (MBBCh / MBBS / MD)',
  'Egypt: 6-year MBBCh programs at Cairo, Ain Shams, Alexandria universities. Gulf: MBBS at KSAU-HS (Saudi Arabia), UAE University College of Medicine. UK: MBBS, 5–6 years. US: 4-year MD after undergraduate; more expensive and competitive.',
  'Biology, chemistry, physics at high school level; high academic achievement; empathy and resilience',
  6, 'primary'
from public.career_paths where slug = 'physician';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'bachelor', 'Biomedical Sciences',
  'Undergraduate path before graduate-entry medicine. Common in UK (King''s College, Edinburgh), Australia, and Canada. Also offered in Egypt (AUC pre-med track) and UAE (Khalifa University).',
  'Biology, chemistry, high academic standing',
  4, 'secondary'
from public.career_paths where slug = 'physician';

-- nurse-practitioner
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'bachelor', 'Nursing (BSN)',
  'BSN programs available in Egypt (Ain Shams, Cairo University Faculty of Nursing). Gulf: KSAU-HS (Saudi Arabia), UAE University. US, UK, Canada, and Australia have strong nursing programs. Saudi Arabia and UAE actively recruit internationally trained nurses.',
  'Biology, chemistry, empathy, physical fitness',
  4, 'primary'
from public.career_paths where slug = 'nurse-practitioner';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'master', 'Master of Science in Nursing (MSN) — NP Track',
  'MSN-NP programs predominantly a US/Canada model. UK has advanced practice nursing. Gulf states recognize US/UK NP qualifications for international roles. Egypt: limited MSN programs, postgraduate study often abroad.',
  'BSN degree, active RN license, 1–2 years clinical experience',
  2, 'secondary'
from public.career_paths where slug = 'nurse-practitioner';

-- health-informatics-specialist
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'bachelor', 'Health Informatics',
  'Specialist degrees in Egypt (Modern Sciences and Arts University), US (Indiana University, UIC), UK (University of Manchester). Saudi Arabia and UAE increasingly investing in digital health — HIMSS Middle East active.',
  'Computer literacy, interest in healthcare systems, basic data skills',
  4, 'primary'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Information Systems',
  'IS degree with healthcare electives widely available. Egypt: Cairo University, BUE; UAE: Abu Dhabi University; US: George Mason, Arizona State. Versatile foundation applicable to many sectors.',
  'Analytical thinking, interest in organizational systems',
  4, 'secondary'
from public.career_paths where slug = 'health-informatics-specialist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'medicine_health', 'master', 'Master of Health Informatics (MHI)',
  'Graduate-entry programs well established in Canada (U of T, UBC), US (Johns Hopkins, Harvard), and UK (UCL). Growing demand in Saudi Vision 2030 and UAE digital health initiatives.',
  'Bachelor''s in a health or IT field, basic data analysis skills',
  2, 'alternative'
from public.career_paths where slug = 'health-informatics-specialist';

-- ─── DESIGN ──────────────────────────────────────────────────────────────────

-- ux-designer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bachelor', 'Human-Computer Interaction (HCI) / Interaction Design',
  'Specialist HCI programs in US (Carnegie Mellon, Michigan), UK (RCA, UCL), and Germany (HCI programs at technical universities). Egypt: limited specialist programs — Design at AASTMT or GUC is closest. UAE: Dubai Institute of Design and Innovation (DIDI).',
  'Creative thinking, empathy for users, basic digital skills, portfolio willingness',
  4, 'primary'
from public.career_paths where slug = 'ux-designer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bachelor', 'Graphic Design or Visual Communication',
  'Widely available in Egypt (Faculty of Fine Arts, MSA, AUC), UAE (University of Sharjah, AUD), Saudi Arabia (Prince Sultan University). Strong portfolio and UX tool skills (Figma) supplement the degree.',
  'Artistic aptitude, visual thinking, creativity',
  4, 'secondary'
from public.career_paths where slug = 'ux-designer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bootcamp', 'UX Design Bootcamp',
  'Portfolio-focused bootcamps accepted by major tech companies globally. Options include General Assembly (US/UK), CareerFoundry (online), and local providers in Cairo and Dubai. Cost-effective path to entry-level roles.',
  'Basic computer skills, empathy, willingness to build a portfolio',
  1, 'alternative'
from public.career_paths where slug = 'ux-designer';

-- product-designer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bachelor', 'Product Design / Industrial Design',
  'US: RISD, Pratt, Georgia Tech. UK: Royal College of Art, Central Saint Martins. Germany: HfG Ulm tradition continues at various design schools. Egypt: Faculty of Applied Arts (Helwan) is the most respected program. UAE: DIDI.',
  'Artistic and spatial thinking, sketching, curiosity about how things work',
  4, 'primary'
from public.career_paths where slug = 'product-designer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bachelor', 'Interaction Design / UX Design',
  'Closely related to product design for digital products. Strong programs in UK (Goldsmiths, RCA), US (CMU, SVA), and UAE (DIDI, AUD). Egypt: GUC Media Engineering and Technology has relevant tracks.',
  'Visual thinking, empathy, basic digital prototyping interest',
  4, 'secondary'
from public.career_paths where slug = 'product-designer';

-- brand-strategist
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'media_communications', 'bachelor', 'Marketing and Brand Management',
  'Core marketing degrees available in Egypt (AUC, BUE, MSA), Saudi Arabia (KAU, IAU), UAE (AUS, HCT), UK (Warwick, Lancaster), and US (Kellogg undergraduate programs). Focus on consumer behavior and brand theory.',
  'Communication skills, creativity, interest in consumer psychology',
  4, 'primary'
from public.career_paths where slug = 'brand-strategist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'arts_design', 'bachelor', 'Visual Communication and Graphic Design',
  'Design programs with strong brand communication focus. Egypt: Faculty of Applied Arts (Helwan), AUC design courses. UAE: University of Sharjah, AUD. UK: Central Saint Martins, Falmouth.',
  'Visual thinking, typographic sensibility, creative portfolio',
  4, 'secondary'
from public.career_paths where slug = 'brand-strategist';

-- ─── BUSINESS ────────────────────────────────────────────────────────────────

-- management-consultant
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration',
  'BBA programs widely available. Egypt: AUC (target school for McKinsey/BCG Egypt), GUC, BUE. Gulf: AUS, KFUPM, KAUST. UK: LBS undergraduate, Warwick. US: Target schools include Wharton, Booth, and Dartmouth Tuck.',
  'Strong academics, analytical aptitude, communication skills, leadership experience',
  4, 'primary'
from public.career_paths where slug = 'management-consultant';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Economics',
  'Economics degree is a well-trodden path into consulting. LSE (UK) feeds MBB directly. Egypt: AUC Economics, Cairo University. Gulf: economics programs at major regional universities feed regional consulting offices.',
  'Quantitative aptitude, analytical thinking, strong GPA',
  4, 'secondary'
from public.career_paths where slug = 'management-consultant';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'master', 'MBA',
  'Post-experience MBA is the primary route into senior consulting. Top targets: LBS (UK), INSEAD, Wharton (US), Harvard (US), IESE (Spain). Regional: KAUST, AUB Suliman Olayan. Costs vary widely — scholarships available.',
  'Bachelor''s degree, 3–5 years work experience, GMAT score 680+',
  2, 'alternative'
from public.career_paths where slug = 'management-consultant';

-- operations-manager
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration / Operations Management',
  'Operations tracks within BBA programs available in Egypt (Future University, MSA), UAE (Zayed University, HCT), Saudi Arabia (KFUPM), UK (Bath, Lancaster), and US (Michigan Ross, Ohio State Fisher).',
  'Organizational thinking, leadership potential, quantitative aptitude',
  4, 'primary'
from public.career_paths where slug = 'operations-manager';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'bachelor', 'Industrial Engineering',
  'Strong operations foundation. Egypt: Faculty of Engineering programs at Cairo, Ain Shams. UAE: Khalifa University, AUS. US: Georgia Tech (top ranked). UK: Warwick Engineering, Nottingham.',
  'Mathematics, physics, systems thinking',
  4, 'secondary'
from public.career_paths where slug = 'operations-manager';

-- entrepreneur
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration with Entrepreneurship Track',
  'Entrepreneurship programs with ecosystem access matter more than rankings. Egypt: AUC has Venture Lab, GUC has entrepreneurship programs. UAE: AUS, Zayed University, NYU Abu Dhabi. US: Babson College (top-ranked), Stanford. UK: UCL, Cambridge Judge.',
  'Drive, resilience, creativity; academic requirements less strict than other business paths',
  4, 'primary'
from public.career_paths where slug = 'entrepreneur';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science',
  'Technical founders often have CS backgrounds. Egypt, UAE, US, UK, and Germany all have strong CS programs. Tech entrepreneurship is globally competitive — technical skills are a significant advantage.',
  'Programming interest, mathematical aptitude, problem-solving mindset',
  4, 'secondary'
from public.career_paths where slug = 'entrepreneur';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'master', 'MBA with Entrepreneurship Specialisation',
  'MBA for second-time or more experienced founders. Babson MBA (US), INSEAD, LBS. Regional: AUB, KAUST. Often provides network and investor access more than knowledge. Many successful founders skip the MBA entirely.',
  'Bachelor''s degree, ideally 2+ years work or startup experience',
  2, 'alternative'
from public.career_paths where slug = 'entrepreneur';

-- ─── LAW / POLICY ────────────────────────────────────────────────────────────

-- corporate-lawyer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'bachelor', 'Law (LLB)',
  'Egypt: 4-year LLB at Cairo University Faculty of Law, Ain Shams, Alexandria. Gulf: LLB at UAE University, Qatar University, Saudi Arabia (KAU, Imam Abdulrahman). UK: LLB at Oxford, Cambridge, LSE, UCL. Note: Egyptian law practice requires Egyptian LLB.',
  'Strong academics, reading comprehension, argumentation skills, Arabic fluency for Egyptian/Gulf practice',
  4, 'primary'
from public.career_paths where slug = 'corporate-lawyer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'master', 'Master of Laws (LLM) — Corporate or Commercial Law',
  'Post-LLB specialization. Top programs: US (NYU, Harvard, Columbia), UK (LSE, UCL, Oxford). Popular path for Egyptian and Gulf lawyers seeking international firm roles. Dubai International Financial Centre (DIFC) creates demand for English law expertise.',
  'LLB or equivalent law degree, strong academic record',
  1, 'secondary'
from public.career_paths where slug = 'corporate-lawyer';

-- policy-analyst
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'bachelor', 'Political Science / Public Policy',
  'Egypt: Cairo University Faculty of Economics and Political Science, AUC Political Science. Gulf: UAE University, Qatar University. UK: Oxford, LSE, King''s College. US: Georgetown, GWU, Princeton Woodrow Wilson School.',
  'Writing, research skills, interest in governance and social issues',
  4, 'primary'
from public.career_paths where slug = 'policy-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'master', 'Master in Public Policy (MPP) or Public Administration (MPA)',
  'Graduate-level policy programs at LSE (UK), Harvard Kennedy School (US), Sciences Po (France), and Lee Kuan Yew School (Singapore). Regional: AUB, OU (Qatar Foundation). Many offer scholarships for MENA applicants.',
  'Bachelor''s degree (any field), strong writing and analytical record, ideally some public sector experience',
  2, 'secondary'
from public.career_paths where slug = 'policy-analyst';

-- compliance-officer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'bachelor', 'Law',
  'LLB as foundation for compliance work. Egypt: Cairo University Faculty of Law strongly respected for Egyptian regulatory context. Gulf: UAE University Law, UAEU. UK: any qualifying law degree. Compliance roles in banking and fintech especially prominent in Dubai (DIFC/ADGM) and Riyadh.',
  'Attention to detail, analytical thinking, reading regulations',
  4, 'primary'
from public.career_paths where slug = 'compliance-officer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration (Finance or Risk Track)',
  'BBA with risk management or financial regulation electives. Egypt: AUC, BUE. Gulf: AUS, KFUPM. UK: Warwick, Bath. US: NYU Stern, University of Maryland.',
  'Organizational skills, quantitative aptitude, interest in regulatory frameworks',
  4, 'secondary'
from public.career_paths where slug = 'compliance-officer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'law_political_science', 'certificate', 'CCEP (Certified Compliance and Ethics Professional)',
  'Globally recognized by SCCE. Widely valued in Egypt (banking sector), UAE (DIFC/ADGM regulated firms), Saudi Arabia, US, and UK. Can be pursued alongside a non-law career. Demonstrates commitment without requiring a law degree.',
  'Some relevant work experience in compliance, risk, or governance preferred',
  1, 'alternative'
from public.career_paths where slug = 'compliance-officer';

-- ─── EDUCATION ───────────────────────────────────────────────────────────────

-- teacher
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'education', 'bachelor', 'Education (BEd)',
  'Egypt: Faculties of Education at Cairo, Ain Shams, and Mansoura. Gulf: UAE University College of Education, Zayed University, Princess Nora University (Saudi Arabia). UK: BEd or PGCE route. US: BSEd programs at all major state universities.',
  'Communication, patience, interest in child development, subject-area knowledge',
  4, 'primary'
from public.career_paths where slug = 'teacher';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'education', 'diploma', 'PGCE (Postgraduate Certificate in Education)',
  'UK standard route for subject graduates. Internationally recognized — valued in UAE and Gulf international schools. Egypt: limited PGCE programs but UK qualification opens international school doors in Cairo (e.g., BISC, CAC, BCA).',
  'Bachelor''s degree in a relevant subject; UK requires subject degree to enter PGCE',
  1, 'secondary'
from public.career_paths where slug = 'teacher';

-- edtech-developer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science or Software Engineering',
  'Core technical degree needed. Egypt: GUC, AUC, MTI. UAE: AUS, Abu Dhabi University. US: Any strong CS program. UK: Edinburgh, Manchester. Supplement with instructional design or learning science coursework.',
  'Programming aptitude, interest in learning and education systems',
  4, 'primary'
from public.career_paths where slug = 'edtech-developer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'education', 'bachelor', 'Instructional Design and Educational Technology',
  'Specialist programs in US (Indiana University, Florida State). UK: limited at undergraduate level. Egypt: Education Faculties with technology streams. UAE: UAE University offers educational technology programs. Growing demand as MENA edtech sector expands.',
  'Interest in both technology and teaching, communication skills',
  4, 'secondary'
from public.career_paths where slug = 'edtech-developer';

-- academic-researcher
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'natural_sciences', 'master', 'Master''s in Research Discipline (MSc/MA)',
  'Master''s as prerequisite for doctoral studies. Egypt: research-track master''s at Cairo University, AUC. Gulf: KAUST (Saudi Arabia) offers fully funded MS/PhD programs globally competitive. UK: one-year standalone MSc at Oxford, Cambridge, UCL.',
  'Strong undergraduate GPA, research aptitude, writing skills',
  2, 'primary'
from public.career_paths where slug = 'academic-researcher';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'natural_sciences', 'doctorate', 'PhD in Research Discipline',
  'Doctoral programs: Egypt (limited funding, most researchers pursue PhDs abroad). KAUST (Saudi Arabia) — fully funded, internationally ranked. UK: Oxford, Cambridge, Imperial, UCL — strong PhD culture with competitive stipends. US: well-funded PhD programs common. Germany: TU Munich, LMU — often free tuition.',
  'Bachelor''s and/or Master''s in relevant discipline, strong publications or research record',
  5, 'secondary'
from public.career_paths where slug = 'academic-researcher';

-- ─── MEDIA / COMMS ───────────────────────────────────────────────────────────

-- journalist
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'media_communications', 'bachelor', 'Journalism and Mass Communication',
  'Egypt: Faculty of Mass Communication at Cairo University (highly respected), AUC Journalism and Mass Communication. Gulf: UAE University Media, CUNY Journalism partnership in Qatar. UK: City, University of London; Sheffield. US: Columbia, Northwestern Medill.',
  'Strong writing, curiosity, research skills, Arabic and English fluency for regional journalism',
  4, 'primary'
from public.career_paths where slug = 'journalist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'humanities_languages', 'bachelor', 'English Language and Literature',
  'Strong writing foundation applicable to journalism. Egypt: Faculty of Arts (Cairo, Alexandria). Gulf: English programs at AUS, University of Sharjah. UK: most universities. Supplement with internships and student journalism.',
  'Writing excellence, reading breadth, analytical thinking',
  4, 'secondary'
from public.career_paths where slug = 'journalist';

-- content-strategist
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'media_communications', 'bachelor', 'Communications and Digital Media',
  'Egypt: AUC Rhetoric and Composition, Cairo University Mass Communication. Gulf: AUS Mass Communication, Zayed University. UK: Bournemouth, Sheffield. US: Michigan, Northwestern. Digital media and SEO skills increasingly required.',
  'Writing, digital literacy, analytical curiosity about audiences',
  4, 'primary'
from public.career_paths where slug = 'content-strategist';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Marketing',
  'Marketing degree with content and digital focus. Egypt: AUC, BUE, MSA Marketing programs. Gulf: AUS, KAU (Saudi Arabia). UK: Warwick, Lancaster, Leeds. Strong content strategy roles overlap with performance marketing.',
  'Communication skills, analytical thinking, creativity',
  4, 'secondary'
from public.career_paths where slug = 'content-strategist';

-- pr-manager
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'media_communications', 'bachelor', 'Public Relations and Communications',
  'Egypt: AUC Communications, Cairo University PR programs. Gulf: AUS Mass Communication, UAE University. UK: Leeds, Bournemouth (top-ranked PR programs). US: Syracuse (Newhouse), Penn State. Middle East PR sector growing with Vision 2030 mega-projects.',
  'Communication skills, networking aptitude, writing, interest in media and public affairs',
  4, 'primary'
from public.career_paths where slug = 'pr-manager';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Marketing and Business Communication',
  'Business-oriented path into PR. Egypt: MSA, Future University. Gulf: HCT, AUS. UK: various BBA programs with marketing. Strong overlap between brand management and PR at the senior level.',
  'Communication skills, leadership potential, strategic thinking',
  4, 'secondary'
from public.career_paths where slug = 'pr-manager';

-- ─── ENTREPRENEURSHIP ────────────────────────────────────────────────────────

-- startup-founder
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science',
  'Most tech startup founders have CS backgrounds. Egypt: GUC, AUC tech programs feed Egypt''s growing startup ecosystem (Vezeeta, Swvl, Instabug founders background). UAE: ecosystem centered in Dubai Internet City. US: Stanford and MIT feed Silicon Valley.',
  'Programming skills, systems thinking, high tolerance for ambiguity',
  4, 'primary'
from public.career_paths where slug = 'startup-founder';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration with Entrepreneurship',
  'Business-track founders benefit from operations and finance literacy. Egypt: AUC Venture Lab, GUC. UAE: AUS, Dubai startup ecosystem. UK: UCL, Cambridge Judge. US: Babson College, Stanford GSB pathways.',
  'Leadership potential, resilience, market awareness',
  4, 'secondary'
from public.career_paths where slug = 'startup-founder';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'diploma', 'Startup Accelerator Program (Y Combinator, Flat6Labs, Algebra Ventures)',
  'Non-degree path: accelerators provide funding, mentorship, and network. Egypt: Flat6Labs (Cairo/Abu Dhabi), A15, Algebra Ventures. UAE: in5, DIFC FinTech Hive. Saudi Arabia: Misk Innovation, SVC. US: Y Combinator, Techstars. Often worth more than a degree for early-stage founders.',
  'Working prototype or validated idea, coachability, team or solo founder track record',
  1, 'alternative'
from public.career_paths where slug = 'startup-founder';

-- venture-capital-analyst
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'finance_economics', 'bachelor', 'Finance or Economics',
  'Strong quantitative foundation critical for VC due diligence. Egypt: AUC, Faculty of Commerce (Cairo University). Gulf: AUS, KFUPM. UK: LSE, Imperial. US: Wharton, Columbia. VC roles in MENA are limited — Algebra Ventures, Sawari Ventures, STV in Saudi Arabia recruit from top regional schools.',
  'Financial modeling, analytical thinking, startup ecosystem awareness',
  4, 'primary'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'computer_science_it', 'bachelor', 'Computer Science or Engineering',
  'Technical background highly valued for evaluating deep tech, SaaS, or hardware startups. Egypt, UAE, US, UK, Germany all have strong programs. Many VC analysts enter from product or engineering roles.',
  'Technical depth in a domain, interest in investment and business models',
  4, 'secondary'
from public.career_paths where slug = 'venture-capital-analyst';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'master', 'MBA',
  'Post-experience MBA is a common route into VC, especially at larger funds. Top programs: Wharton (US), HBS (US), LBS (UK), INSEAD. MENA: AUB, KAUST. Often more impactful than undergraduate path alone.',
  'Bachelor''s degree, 3+ years work experience in finance, consulting, or startups',
  2, 'alternative'
from public.career_paths where slug = 'venture-capital-analyst';

-- franchise-operator
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'bachelor', 'Business Administration',
  'General business degree provides useful foundation. Egypt: BUE, MSA, Future University. Gulf: HCT (UAE), Gulf University (Saudi Arabia). Franchise market growing strongly in Gulf states (F&B, retail, education). Egypt has active IFA-affiliated franchise associations.',
  'Leadership, financial literacy, organizational skills',
  4, 'primary'
from public.career_paths where slug = 'franchise-operator';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'business_management', 'diploma', 'Franchise Management Diploma / Certificate',
  'Short programs offered by IFA (International Franchise Association) and regional chambers of commerce. UAE: Dubai Chamber offers relevant programs. Saudi Arabia: MCIT-linked business programs. Egypt: CIPE-affiliated programs. Practical and cost-effective for those with capital ready to invest.',
  'Business awareness, some capital to invest, operational mindset',
  1, 'secondary'
from public.career_paths where slug = 'franchise-operator';

-- ─── ENGINEERING ─────────────────────────────────────────────────────────────

-- civil-engineer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'bachelor', 'Civil Engineering',
  'Egypt: Faculty of Engineering programs at Cairo, Ain Shams, Alexandria — large graduate output supplying Gulf construction boom. Gulf: Khalifa University (UAE), KFUPM (Saudi Arabia). UK: Imperial, Southampton, Manchester. US: MIT, Georgia Tech, UC Berkeley.',
  'Mathematics, physics, spatial reasoning, interest in infrastructure',
  4, 'primary'
from public.career_paths where slug = 'civil-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'master', 'MSc Structural or Geotechnical Engineering',
  'Specialisation after BEng. KAUST (Saudi Arabia) offers fully funded graduate programs. UK: Imperial, Cambridge, Sheffield. US: MIT, Stanford, Cornell. Demand high in UAE for specialized structural engineers on mega-projects.',
  'BEng Civil Engineering, strong mathematics',
  2, 'secondary'
from public.career_paths where slug = 'civil-engineer';

-- mechanical-engineer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'bachelor', 'Mechanical Engineering',
  'Egypt: Cairo, Ain Shams, Alexandria engineering faculties produce large volumes of mechanical engineers, many employed in Gulf energy sector. Gulf: KFUPM (Saudi Arabia), Khalifa University (UAE) — strong oil and gas focus. UK: Imperial, Manchester, Bath. US: MIT, Stanford, Georgia Tech.',
  'Mathematics, physics, interest in machines and systems',
  4, 'primary'
from public.career_paths where slug = 'mechanical-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'master', 'MSc Mechatronics or Aerospace Engineering',
  'Advanced specialization adding electronics and control systems. Germany: TU Munich, RWTH Aachen (strong mechatronics traditions). UK: Bath, Cranfield (aerospace). US: MIT, University of Michigan. UAE: Khalifa University aerospace programs growing.',
  'BEng Mechanical Engineering, electronics knowledge',
  2, 'secondary'
from public.career_paths where slug = 'mechanical-engineer';

-- environmental-engineer
insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'bachelor', 'Environmental Engineering',
  'Egypt: Environmental Engineering at Cairo University, Ain Shams. Gulf: Khalifa University (UAE) has environmental engineering track; KFUPM (Saudi Arabia). UK: Imperial, Leeds, Newcastle. US: Stanford, UC Berkeley, Johns Hopkins. Growing demand in Gulf due to desalination and sustainability mandates.',
  'Chemistry, biology, mathematics, interest in environmental systems',
  4, 'primary'
from public.career_paths where slug = 'environmental-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'natural_sciences', 'bachelor', 'Environmental Science',
  'Science-based alternative to engineering path. Egypt: Faculty of Science programs (Cairo, Alexandria). UAE: UAE University Environmental Science. UK: Lancaster, East Anglia. US: UC Santa Barbara, Yale. Less technical but broader ecological perspective. PE licensure requires additional engineering courses.',
  'Biology, chemistry, geography, environmental awareness',
  4, 'secondary'
from public.career_paths where slug = 'environmental-engineer';

insert into public.study_directions (career_path_id, faculty_cluster, degree_type, field_of_study, country_notes, prerequisites, typical_duration_years, relevance_level)
select id, 'engineering_technology', 'master', 'MSc Environmental Engineering or Sustainability',
  'Graduate specialization increasingly valuable. KAUST (Saudi Arabia) — fully funded and regionally relevant for water and energy research. UK: Imperial, Surrey. Germany: TU Berlin. US: MIT, Johns Hopkins. UAE: Masdar Institute (now Khalifa University) focuses on clean energy.',
  'BEng in Engineering or BSc in Environmental/Natural Sciences',
  2, 'alternative'
from public.career_paths where slug = 'environmental-engineer';
