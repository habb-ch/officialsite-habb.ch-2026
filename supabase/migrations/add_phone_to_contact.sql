-- Migration: Add phone column to ContactSubmission table
-- Run this SQL command in your Supabase SQL editor if you have an existing database

ALTER TABLE public."ContactSubmission" 
ADD COLUMN IF NOT EXISTS phone text;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'ContactSubmission' 
AND table_schema = 'public'
ORDER BY ordinal_position;