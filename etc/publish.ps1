.\build.ps1 Release

git add -A
git commit -m "Deployment"
git push --recurse-submodules=on-demand --progress

.\package.ps1

.\deploy.ps1