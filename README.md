# CareCompass Healthcare Module

A Next.js-based healthcare triage system that helps users understand care urgency and find appropriate healthcare options.

## 🚀 Features

- **Intelligent Triage Form**: Collects symptoms, severity, duration, and risk factors
- **Risk Assessment**: Deterministic algorithm evaluates urgency (Low/Medium/High)
- **Actionable Guidance**: Provides clear, safe medical advice
- **Database-Backed**: Stores cases in Supabase Postgres
- **Shareable Results**: Each triage generates a unique result page
- **Module Navigation**: Consistent navigation across healthcare features
- **Responsive Design**: Mobile-first, accessible UI

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Run the database schema:
   - Open SQL Editor in Supabase Dashboard
   - Copy contents from `database/schema.sql`
   - Execute the SQL

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Important**: Never commit `.env.local` to version control. A template is provided in `.env.local.example`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
carecompass/
├── app/
│   ├── api/
│   │   └── triage/
│   │       └── route.ts          # Triage submission API
│   ├── check/
│   │   └── page.tsx              # Triage form page
│   ├── result/
│   │   └── [caseId]/
│   │       └── page.tsx          # Result display page
│   ├── find-care/
│   │   └── page.tsx              # Placeholder: Find hospitals
│   ├── telehelp/
│   │   └── page.tsx              # Placeholder: Teleconsult
│   ├── learn/
│   │   └── page.tsx              # Placeholder: FAQs
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── health/
│   │   ├── ModuleNavbar.tsx      # Healthcare module navigation
│   │   └── TriageForm.tsx        # Main triage form component
│   ├── Header.tsx                # Site header
│   ├── Hero.tsx                  # Homepage hero section
│   ├── Logo.tsx                  # Logo SVG component
│   ├── ArrowIcon.tsx             # Arrow icon component
│   └── VideoBackground.tsx       # Video background component
├── lib/
│   ├── supabase/
│   │   └── admin.ts              # Supabase admin client
│   └── triage/
│       └── rules.ts              # Triage logic & validation
├── database/
│   └── schema.sql                # Supabase schema
├── .env.local.example            # Environment template
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## 🔐 Security Notes

- **Service Role Key**: Only used in API routes and server components (never exposed to browser)
- **Row Level Security (RLS)**: Enabled on the `cases` table
- **Validation**: Both client-side (Zod) and server-side validation
- **No PII**: System doesn't collect names, phone numbers, or exact addresses

## 📊 Database Schema

The `cases` table includes:

- **Location**: City/pincode (at least one required)
- **User Input**: Age group, symptoms, severity, duration, risk factors
- **Computed Results**: Risk level, red flags, advice
- **Reserved Fields**: Lat/lng for future geocoding, facility_results for future features

## 🎨 Design System

The healthcare module maintains consistency with your existing site:

- Same fonts (Inter)
- Same color palette (#0a0a0a, #c8f560, #f5f5f5)
- Same button styles (rounded, with hover effects)
- Same spacing and layout patterns
- Same navigation pill style

## 🧠 Triage Logic

### Risk Levels

**HIGH RISK** (Seek urgent care immediately):
- Severity marked as "severe"
- Any red flag symptoms detected
- Prolonged symptoms (>7 days) + existing conditions

**MEDIUM RISK** (Visit clinic within 24-48h):
- Moderate severity
- Symptoms lasting 4+ days
- Risk factors + common symptoms (fever, cough, weakness)

**LOW RISK** (Self-care at home):
- All other cases

### Red Flag Symptoms

- Breathlessness
- Chest pain
- Severe injury/pain
- Persistent vomiting
- Severe dizziness/fainting
- Rash with fever

## 🚦 Navigation Flow

1. User clicks "START TRIAGE" on homepage → `/check`
2. Fills out triage form and submits
3. API processes, stores in DB, returns case ID
4. Redirect to `/result/[caseId]`
5. User can navigate to other module pages or start new triage

## 🔗 Routes

- `/` - Homepage
- `/check` - Triage form (active in module nav)
- `/result/[caseId]` - Individual case results
- `/find-care` - Placeholder for hospital finder
- `/telehelp` - Placeholder for teleconsult
- `/learn` - Placeholder for FAQs/resources

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (Postgres)
- **Validation**: Zod + React Hook Form
- **Animation**: Framer Motion
- **Styling**: CSS (existing design system)

## ⚠️ Disclaimer

This application is an **educational tool** and **not a substitute for professional medical advice**. All results include prominent disclaimers. Users with urgent symptoms are always directed to seek professional care.

## 📝 Future Enhancements

- Geocoding for lat/lng
- Facility finder with maps
- Teleconsult booking
- Multi-language support
- SMS/email notifications
- Downloadable referral notes
- Analytics dashboard

## 📄 License

Private project for CareCompass.

---

**Questions?** Check the implementation summary in `IMPLEMENTATION_SUMMARY.md`
