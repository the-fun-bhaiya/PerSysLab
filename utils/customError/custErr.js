/**
 * let you make errors, most beautiful things on earth
 */
export default class custErr extends Error{
    /**
     * 
     * @param {number | string} code status code for error
     * @param {string} msg mistake that caused the error
     * @param {string} btnLink where they can go now {address}
     * @param {string} btnName name of the place
     */
    constructor(code, msg, btnLink = "/", btnName = "Home") {
        super(msg);
        this.statusCode = code;
        this.msg = msg;
        this.errType = String(code).startsWith("4") ? "clientErr" : "devErr";
        this.isOperational = true;
        this.btnLink = btnLink;
        this.btnName = btnName;
        Error.captureStackTrace(this, this.constructor)
    }
}