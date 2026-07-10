# Contributing

We welcome contributions! To ensure code quality and maintain the strict architecture:

1. **Create an Issue**: Before submitting a PR for a major feature, create an issue to discuss it.
2. **Follow Architecture Rules**: Read `ARCHITECTURE.md` and `DEVELOPER_GUIDE.md`. Your PR will be rejected if you put business logic into React components or bypass `ApplicationService`.
3. **Write Tests**: Verify your changes locally.
4. **Pass CI**: Ensure `npm run typecheck`, `npm run lint`, and `npm run build` all pass with zero warnings or errors.
5. **Commit Messages**: Use clear, descriptive commit messages.

Thank you for helping improve LSCS v2!
