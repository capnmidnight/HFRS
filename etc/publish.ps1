.\build.ps1

git add -A
git commit -m "Deployment"
git push --recurse-submodules=on-demand --progress

.\deploy.ps1