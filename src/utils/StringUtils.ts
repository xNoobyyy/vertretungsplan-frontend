// splits long words into ${part1}- ${part2}
export const shortenString = (string: string) => {
    if (document.documentElement.clientWidth > document.documentElement.clientHeight) {
        return string
    }
    let result = "";
    let split = string.split(" ")
    for (let i = 0; i < split.length; i++) {
        let word = split[i]
        if (word.length > 12) {
            result = result + word.substring(0, 9)
            result = result + "- "
            result = result + word.substring(9, word.length)
            result = result + " "
        } else {
            result = result + word
            result = result + " "
        }
    }
    return result.trimEnd()
}