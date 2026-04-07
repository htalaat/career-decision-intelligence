-- seed_country_context.sql
-- Country-level study context for 10 key markets
-- Run AFTER schema migrations (004_expand_profile_and_study_directions.sql)

insert into public.country_study_context
  (country_code, country_name, education_system_notes, typical_bachelor_years, typical_master_years, cost_level, language_of_instruction, visa_complexity)
values

(
  'EG',
  'Egypt',
  'Egypt has a large public university system (25+ public universities) alongside private universities. Cairo University, Ain Shams, and Alexandria are the most prestigious public institutions. Private universities (AUC, GUC, BUE, MSA, MTI) offer internationally-aligned curricula, often in English. Bachelor programs are typically 4–5 years; Medicine is 6 years + house officer year. The Supreme Council of Universities accredits all degrees. Egyptian degrees are recognized across Arab League states. Many top students pursue postgraduate studies abroad. STEM and Engineering faculties are highly regarded regionally.',
  5, 2, 'low', 'Arabic (English at private universities)', 'none'
),

(
  'SA',
  'Saudi Arabia',
  'Saudi Arabia has undergone significant higher education expansion under Vision 2030. KAUST (King Abdullah University of Science and Technology) is a graduate-only research university with full scholarships — internationally competitive. KFUPM (King Fahd University of Petroleum and Minerals) is highly respected for engineering and science. Female participation has expanded dramatically since 2017. Many Saudi students receive government scholarships (KASP) to study abroad in the US, UK, Canada, and Australia. Public university tuition is free for Saudi nationals. International students require student visa; enrollment at private institutions increasingly open.',
  4, 2, 'low', 'Arabic (English at KAUST and many graduate programs)', 'moderate'
),

(
  'AE',
  'United Arab Emirates',
  'The UAE hosts 70+ universities across Dubai, Abu Dhabi, and other emirates — a mix of local institutions and branch campuses of global universities (NYU Abu Dhabi, Sorbonne Abu Dhabi, Heriot-Watt, Middlesex, Birmingham City). Higher Colleges of Technology (HCT) is the largest applied education network. UAE University (Al Ain) and Zayed University are the main federal institutions. Programs are largely in English. The KHDA and CAA regulate quality. International students are common; student visa process is well-established. Costs vary widely — public universities subsidized for UAE nationals, private institutions charge international rates.',
  4, 2, 'high', 'English (Arabic at federal institutions)', 'easy'
),

(
  'US',
  'United States',
  'The US higher education system is the most internationally prestigious, with 4,000+ accredited institutions. Regional accreditation by bodies such as HLC, SACSCOC, and WASC assures quality. The 4-year bachelor''s model is standard. Graduate programs (master''s 1–2 years, PhD 4–6 years) are globally sought. Top research universities (MIT, Stanford, Harvard, Caltech) compete for global talent. Community colleges (2 years) offer affordable pathways and transfer options. Costs are very high — average $30,000–$60,000/year at private universities. Financial aid and merit scholarships are available but competitive. F-1 student visa required for international students; OPT allows 1–3 years work post-graduation.',
  4, 2, 'very_high', 'English', 'moderate'
),

(
  'GB',
  'United Kingdom',
  'The UK system features 3-year honours bachelor''s degrees in England, Wales, and Northern Ireland (4 years in Scotland). Universities are ranked globally; Oxbridge, Imperial, LSE, UCL, and Edinburgh are top institutions. The QAA oversees quality. Master''s degrees are typically 1 year (taught) or 1–2 years (research). PhD programs are 3–4 years. Tuition for international students has risen significantly — typically £15,000–£35,000/year. The Graduate Route visa allows 2 years of post-study work (3 for PhD graduates), making the UK attractive for career transitions. IELTS or equivalent required for admission. UK qualifications are highly respected across the MENA region.',
  3, 1, 'high', 'English', 'moderate'
),

(
  'CA',
  'Canada',
  'Canada offers high-quality education at relatively lower cost than the US or UK. Bachelor programs are 4 years; master''s 1–2 years; PhDs 4–5 years. University of Toronto, McGill, UBC, and Waterloo are globally ranked. French-language institutions (Université de Montréal, Laval) serve Quebec. Community colleges offer diplomas and certificates (2–3 years) with strong employer linkages. Post-Graduation Work Permit (PGWP) allows up to 3 years of work, with pathways to permanent residency — making Canada highly attractive for international graduates. Tuition for international students: CAD $20,000–$40,000/year. Student visa (study permit) process is well-established.',
  4, 2, 'high', 'English (French in Quebec)', 'easy'
),

(
  'DE',
  'Germany',
  'Germany offers tuition-free or very low-cost education at public universities (even for international students at most states — Baden-Württemberg charges ~€1,500/semester). The system follows the Bologna framework: 3-year bachelor, 2-year master. Technical Universities of Excellence (TU Munich, RWTH Aachen, KIT) are globally ranked for engineering and technology. Many master''s programs taught fully in English. DAAD scholarships support international students. Recognition of foreign qualifications handled by anabin database. Language requirements: German for undergraduate programs; English for many master''s. Blocked account (~€11,208) required for student visa. Strong student work permit (20 hours/week) and post-study 18-month job-seeker visa.',
  3, 2, 'low', 'German (English for many Master''s programs)', 'moderate'
),

(
  'AU',
  'Australia',
  'Australia has a strong globally-ranked university system — Group of Eight (Go8) universities include U of Melbourne, ANU, U of Sydney, UNSW, Monash, UQ, UWA, and Adelaide. Bachelor programs are 3 years (some 4). Master''s 1.5–2 years. TEQSA regulates quality. International student fees: AUD $25,000–$45,000/year. Australia''s Temporary Graduate visa (subclass 485) offers 2–4 years post-study work rights, with recent extensions for regional study and high-demand occupations. IELTS or PTE required. Australia is a top destination for students from Egypt, Gulf states, and South/Southeast Asia. Scholarship programs: Australia Awards (funded by DFAT for developing countries).',
  3, 2, 'high', 'English', 'easy'
),

(
  'MY',
  'Malaysia',
  'Malaysia offers very affordable, internationally recognized education. Public universities (Universiti Malaya, UTM, UKM) charge low fees (~MYR 5,000–15,000/year for international students). Private universities (Monash Malaysia, Taylor''s, HELP) offer Australian and UK twinning programs at reduced cost — allowing students to complete 1–2 years locally before transferring abroad. Programs largely in English. Education quality regulated by MQA. Malaysia is a popular study destination for students from Egypt, Saudi Arabia, and other Muslim-majority countries due to cultural affinity, halal food availability, and affordability. Student pass process is straightforward for most nationalities.',
  3, 2, 'low', 'English (Malay at public universities)', 'easy'
),

(
  'TR',
  'Turkey',
  'Turkey has significantly expanded its higher education system — 200+ universities including prestigious state universities (Bogazici, METU, Istanbul Technical University) and well-resourced private universities (Bilkent, Koc, Sabanci). Tuition at state universities is heavily subsidized for Turkish students; international students pay moderate fees (~$500–$3,000/year at state universities, $5,000–$15,000 at private). YTB (Türkiye Scholarships) fund approximately 5,000 international students annually including full tuition, accommodation, and stipend — very popular with Arab students. Many programs available in English. Turkey is increasingly popular with Egyptian, Syrian, and Gulf students due to affordability, cultural proximity, and geographic convenience. Residence permit required for study; generally straightforward.',
  4, 2, 'low', 'Turkish (English at private universities)', 'easy'
);
