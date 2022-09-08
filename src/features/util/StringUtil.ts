export function stringReplace(baseString: string, args: string[]) {
    const modArgs = args.filter(arg => arg !== '')
    let helperString;
    modArgs.map((string => {
        helperString = baseString.replace("%s", string)
        baseString = helperString;
    }))
    return baseString;
}

