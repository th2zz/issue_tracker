npx create-react-app jira --template typescript
cd jira/
echo {}> .prettierrc.json
npm install prettier --save-dev
npm install eslint --save-dev
npx mrm@2 lint-staged
npm install eslint-config-prettier  --save-dev
npm install --save-dev @commitlint/{config-conventional,cli}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
npm install husky --save-dev
npx husky install
echo '
#!/bin/sh
. ".husky/_/husky.sh"

npx --no -- commitlint --edit ${1}
' > .husky/commit-msg
chmod a+x .husky/commit-msg