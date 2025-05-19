### Install tools

Tools used to develop this project.

- [Node](https://nodejs.dev)
- [Flyctl](https://fly.io/docs/flyctl/installing/)


### Run locally

- Clone this repository
- copy `.env.blank` to `.env` and set vars
- Run `npm install`
- Run `npm start`

### Deploy to existing pipeline

Commit your code to either `staging` or `production` Github branches. Deployment will happen automatically via GitHub actions.

### Deploy a new app server

##### 1. Create new Fly App
fly launch --no-deploy --org flatpeak --name [app name]`

##### 2. Create new fly*.toml
replace <app name> and <provider>, and <region> fields in both staging & production toml files
eg: app = "octopus-energy-de-provider-prod-fp"
    CLOUDWATCH_GROUP_NAME = "/production/app/provider/octopus-energy-de"
    primary_region = "fra"

regions: https://fly.io/docs/reference/regions/
eg fra (frankfurt) cdg (paris) ams (amsterdam) lhr (london) mad (madrid)...

##### 3. set fly secrets (prod & dev use the same secrets)
```bash
flyctl secrets set -c fly-staging.toml AWS_KEY_ID=<KEY> \
                AWS_SECRET_KEY= <SECRET> \
                AWS_REGION=eu-west-1`
```

##### 4. Create new github action .yml
copy from .github.example
```bash
`mv .github.example .github`
```

##### 5. Add SSL certificates
<https://fly.io/docs/app-guides/custom-domains-with-fly/>

