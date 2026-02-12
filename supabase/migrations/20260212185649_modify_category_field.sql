-- Set default value for future inserts
ALTER TABLE public.bookmarks
ALTER COLUMN category SET DEFAULT 'Favourites';

-- Update existing rows that are NULL
UPDATE public.bookmarks
SET category = 'Favourites'
WHERE category IS NULL;

-- make it NOT NULL
ALTER TABLE public.bookmarks
ALTER COLUMN category SET NOT NULL;
