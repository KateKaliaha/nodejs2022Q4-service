# Home Library Service

## Downloading

```
git clone [repository](https://github.com/KateKaliaha/rsschool-nodejs-task-graphql.git)
```

switch to the develop branch

```
git checkout feature/home-ls-part2
```

## Installing NPM modules

```
npm install
```

## Running application with docker

Run your docker application
Rename file .env.example to .env

```
docker-compose up
```

## Scan docker image

```
npm run docker:scan
```

## Running application

Rename file .env.example to .env

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing https://editor.swagger.io/ copy context of doc/api.yaml and paste in the editor. Change url in the line 8 from / on 'http://localhost:4000'
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Run application in production

```
npm run start:prod
```

Run application in development

```
npm run start:dev
```

## Build application

```
npm run prebuild
```

```
npm run build
```

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
