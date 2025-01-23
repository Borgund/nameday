# Elysia with Bun runtime

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Release

1. Bump the version in package.json
2. Tag the commit with `git tag v<x.y.z> -m "Some message to describe the tag"` where x = major, y = minor and z = patch number.
3. Push the tag to the repo with `git push --follow-tags`
4. Manually run the release action on the github repo with the created tag.
