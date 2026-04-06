export default { 
    /**
     * sanitizer for storing values and comparing
     * @param {string} password - password strings (will be converted) will only be trimmed
     * @param  {...any} rawArr - other values that has to be sanitized
     * @returns array of sanitized and stringised values in the same order you provided
     */
  sanit: (password, ...rawArr) => {
    const arr =[];
    arr.push(String(password).trim());
    rawArr.forEach((val) => {
      val = String(val).trim().toLowerCase();
      arr.push(val);
    });
    return arr;
  }
}