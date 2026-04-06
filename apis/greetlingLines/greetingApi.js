import { feelingLines } from "../../db/data/localdb.js";

export const askFeeling = () => {
    const lineNo = Number(Math.floor(Math.random()*(feelingLines.length)));
    return feelingLines[lineNo];
}
