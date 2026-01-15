# Quick AEO/GEO Maintenance Guide

## When Adding New Content

### New Game Project
1. Add to `/data/games.json`
2. VideoGame schema will auto-generate via script.js
3. Update sitemap.xml with new lastmod date
4. Optional: Create dedicated game page with full schema

### New Recipe
1. Create new HTML file in `/recipes/[recipe-name]/`
2. Copy schema template from existing recipe pages
3. Fill in required fields:
   - name, description
   - recipeIngredient (array)
   - recipeInstructions (HowToStep array)
   - prepTime, cookTime, totalTime (ISO 8601 format: PT15M)
   - recipeYield
4. Add to `/recipes/index.html`
5. Add to sitemap.xml

### New Artwork
1. Add image to `/gallery/img/`
2. Add to gallery HTML
3. Update CollectionPage schema in gallery/index.html
4. Add to sitemap.xml with image reference

### New Blog Post (When Created)
1. Add BlogPosting schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "author": {
    "@type": "Person",
    "name": "Swarnaditya Singh"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "description": "Post summary",
  "articleBody": "Full content..."
}
```

## Required Schema Fields Reference

### Recipe Schema Minimum
- name, author, datePublished
- recipeIngredient, recipeInstructions
- totalTime

### VideoGame Schema Minimum
- name, description, author
- gamePlatform or operatingSystem

### Person Schema Minimum
- name, description, url
- jobTitle, sameAs (social links)

### FAQ Schema
- Question: name
- Answer: text

## Time Duration Format (ISO 8601)
- PT5M = 5 minutes
- PT1H = 1 hour
- PT1H30M = 1 hour 30 minutes
- P1D = 1 day

## Regular Maintenance Tasks

### Monthly
- [ ] Update lastmod dates in sitemap.xml for changed pages
- [ ] Review and update FAQ section based on actual questions received
- [ ] Check Google Search Console for index coverage issues

### Quarterly
- [ ] Run Google Rich Results Test on all pages
- [ ] Update aggregate ratings if applicable
- [ ] Review and expand FAQ section
- [ ] Add new keywords based on search trends

### Yearly
- [ ] Comprehensive schema audit
- [ ] Update all dateModified fields
- [ ] Review and optimize meta descriptions
- [ ] Update person schema with new skills/achievements

## Testing Checklist

Before deploying changes:
1. [ ] Validate JSON-LD with https://validator.schema.org/
2. [ ] Test with Google Rich Results Test
3. [ ] Check Open Graph with Facebook Debugger
4. [ ] Verify Twitter Card appearance
5. [ ] Validate sitemap.xml syntax
6. [ ] Check mobile responsiveness of new content

## Common Issues & Fixes

### Schema Validation Errors
- **"Missing required field"**: Add the field even with placeholder
- **"Invalid date format"**: Use ISO 8601 (YYYY-MM-DD)
- **"Invalid duration"**: Use PT format (PT15M, PT1H)

### Open Graph Issues
- **Image not showing**: Check image URL is absolute, not relative
- **Description cut off**: Keep under 155 characters

### Sitemap Issues
- **Pages not indexed**: Ensure URLs are absolute (https://)
- **Priority ignored**: Google uses as hint, not absolute

## Quick Schema Templates

### Add to Page Head
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TypeHere",
  "name": "Name Here",
  ...
}
</script>
```

### Multiple Schemas
You can have multiple `<script type="application/ld+json">` tags per page.

## AI Search Optimization Tips

1. **Use natural language**: Write as if answering questions
2. **Be specific**: "Unity 2D game development" > "game development"
3. **Structure content**: Use headings (H2, H3) for topics
4. **Answer questions**: Start sections with "What is...", "How to..."
5. **Add context**: Don't assume AI knows your background

## Key Performance Indicators

Track these in Google Search Console:
- Impressions in search results
- Click-through rate (CTR)
- Average position
- Rich result appearances
- Mobile usability issues

## Resources

- Schema.org Documentation: https://schema.org/
- Google Search Central: https://developers.google.com/search
- Rich Results Test: https://search.google.com/test/rich-results
- Open Graph Protocol: https://ogp.me/

---

Keep this guide handy for maintaining your AEO/GEO optimization over time!
