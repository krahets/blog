pnpm docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:krahets/blog.git master:gh-pages
cd -
