set -e
pnpm docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:krahets/krahets.github.io.git master:gh-pages
cd -
