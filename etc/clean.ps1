# Ocassionally clean the deploy directory to make sure old scripts get deleted

# Clean the .NET code output
if(Test-Path ..\deploy\linux\ -PathType Container) {
    rm -Force -Recurse ..\deploy\linux\
}

# Clean the TypeScript output
#if(Test-Path ..\src\HFRS\wwwroot\js -PathType Container) {
#    rm -Force -Recurse ..\src\HFRS\wwwroot\js
#}