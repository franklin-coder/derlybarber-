
#!/bin/bash

# Script to update useLanguage imports to useSafeLanguage

files=(
    "components/sections/about-section.tsx"
    "components/sections/testimonials-section.tsx"
    "components/sections/cta-section.tsx"
    "components/blog-grid.tsx"
    "components/blog-post.tsx"
    "components/footer.tsx"
    "components/comment-section.tsx"
    "components/contact-form.tsx"
    "components/booking-form.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file"
        # Update import
        sed -i 's/import { useLanguage } from '\''@\/lib\/language-context'\'';/import { useSafeLanguage } from '\''@\/lib\/safe-language-context'\'';/g' "$file"
        # Update usage
        sed -i 's/const { t } = useLanguage();/const { t } = useSafeLanguage();/g' "$file"
        sed -i 's/const { t, currentLanguage } = useLanguage();/const { t, currentLanguage } = useSafeLanguage();/g' "$file"
        sed -i 's/const { currentLanguage, t } = useLanguage();/const { currentLanguage, t } = useSafeLanguage();/g' "$file"
    fi
done

echo "All files updated!"
