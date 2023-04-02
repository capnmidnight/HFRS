if($args.Length -ne 1 -or $args[0] -notmatch "^(Debug|Release)$") {
    echo "Expected usage: build [Debug|Release]"
}
else {
    $config = $args[0]

    # Bundle the TypeScript code
    # dotnet run --project ".\HFRS.Build\"

    # Create the .NET package

    if(-not (Test-Path ..\deploy\ -PathType Container)) {
        mkdir ..\deploy\
    }

    dotnet publish "..\HFRS\" --configuration $config --no-self-contained --runtime linux-x64 --output ..\deploy\linux\
}