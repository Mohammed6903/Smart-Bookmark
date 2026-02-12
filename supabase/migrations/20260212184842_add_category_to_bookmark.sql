-- Add category column to bookmarks table
ALTER TABLE public.bookmarks 
ADD COLUMN category TEXT;
