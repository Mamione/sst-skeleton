# SST Skeleton

# Setup

- Install dependencies with `pnpm i`.
- Add your AWS Profile credentials locally. On Mac: `~/.aws/credentials`.
  ```
  [yourprofile]
  aws_access_key_id = <keyid>
  aws_secret_access_key = <access_key>
  ```
- Add your `AWS_PROFILE=yourprofile sst start --region=<yourregion>` script to `package.json`.
- Set the environment variables based on `.env.example`.
- Deploy, (Update the frontend/backend with your needs, they might not work with the defaults, they are just used as samples).
