# Pre-Production Checklist

## 1. Changelog Generation
Before pushing to production, check if you can read informations from diff.md otherwise run this command to get your recent changes:
```bash
git log -n 8 --pretty=format:"[%h] %s%n%b" --patch > diff.md
```

## 2. Changelog Analysis Questions
Answer these questions while reviewing your changes:

### For Each Major Change:
- What problem does this change solve for the end user?
- How does this change improve the user experience?
- Are there any visual or interface changes users should know about?
- What new capabilities does this add for users?
- Are there any changes in how users interact with the system?

### For Technical Changes:
- How would you explain this change to a non-technical stakeholder?
- What business value does this technical change provide?
- Are there any performance improvements users will notice?

## 3. Writing User-Friendly Descriptions
Convert your technical changes into user-friendly language by:
- Avoiding technical jargon and code terms
- Focusing on the benefits and improvements
- Using clear, simple language
- Including any relevant new features or capabilities
- Mentioning any changes in workflow or user interaction
- Highlighting performance improvements if applicable

## 4. Final Checklist
- [ ] Generated git diff of recent changes
- [ ] Analyzed each major change from a user perspective
- [ ] Created user-friendly descriptions for all changes
- [ ] Validated that descriptions are clear for non-technical users
- [ ] Added descriptions to changelog/release notes
- [ ] Reviewed final changelog for clarity and completeness

## Example Format:

Instead of:
```
feat: Implemented JWT token refresh mechanism in authentication service
```

Write:
```
Improvement: Enhanced system login reliability - Users will now stay logged in longer and experience fewer timeouts
```

Remember: The goal is to communicate the value and impact of changes to users, not the technical implementation details.