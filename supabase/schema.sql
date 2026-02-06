-- Supabase schema for Habb.ch
-- Run this in Supabase SQL editor to create required tables

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users
CREATE TABLE IF NOT EXISTS public."User" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'admin',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- Posts
CREATE TABLE IF NOT EXISTS public."Post" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  published boolean NOT NULL DEFAULT false,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "authorId" uuid REFERENCES public."User"(id) ON DELETE SET NULL,
  "titleEn" text NOT NULL,
  "titleDe" text,
  "excerptEn" text,
  "excerptDe" text,
  "contentEn" text NOT NULL,
  "contentDe" text,
  "metaTitleEn" text,
  "metaTitleDe" text,
  "metaDescEn" text,
  "metaDescDe" text,
  "imageUrl" text,
  "imageAlt" text
);

-- FAQs
CREATE TABLE IF NOT EXISTS public."Faq" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order" integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "questionEn" text NOT NULL,
  "questionDe" text,
  "answerEn" text NOT NULL,
  "answerDe" text
);

-- Page content
CREATE TABLE IF NOT EXISTS public."PageContent" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "pageKey" text NOT NULL,
  "sectionKey" text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "contentEn" jsonb NOT NULL,
  "contentDe" jsonb
);
CREATE UNIQUE INDEX IF NOT EXISTS pagecontent_page_section_unique ON public."PageContent" ("pageKey", "sectionKey");

-- Site settings
CREATE TABLE IF NOT EXISTS public."SiteSettings" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  "valueEn" text NOT NULL,
  "valueDe" text,
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS public."ContactSubmission" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  processed boolean NOT NULL DEFAULT false,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS public."TeamMember" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  "imageUrl" text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);
