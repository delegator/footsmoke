# footsmoke

This container gets the `sitemap.xml` file at the URL you provide, parses it to
get all possible URLs, and then checks for the text you provide in the
`<footer>`.

## Usage

```sh
docker run --rm \
  --env FOOTSMOKE_URL=https://google.com \
  --env FOOTSMOKE_TEXT="Google, Inc." \
  theutz/footsmoke:latest
```

## Environment Variables

- Required
  - `FOOTSMOKE_URL`: the root URL from which to search for the `sitemap.xml`
    file.
  - `FOOTSMOKE_TEXT`: the text to search for.
- Optional
  - `FOOTSMOKE_SELECTOR`: the CSS selector used to identify where to search for
    the text. _(Defaults to `footer`)_
  - `FOOTSMOKE_WORKERS`: the number of processes to run simultaneously.
    _(Defaults to auto-detect)_
  - `FOOTSMOKE_RETRIES`: the number of retries per failed test to attempt.
    _(Defaults to `2`)_
  - `FOOTSMOKE_TIMEOUT`: the amount of time in ms to wait per test before
    failing. _(Defaults to `30000`, or 30 seconds)_
