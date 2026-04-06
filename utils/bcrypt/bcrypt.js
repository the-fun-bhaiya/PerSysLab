import bcrypt from "bcrypt";


/**
 * password hasher and comparer
 * @param {string} funcType - type of the function hash or compare.
 * @param {string} password - enter the password to compare or hash.
 * @param {string} hashedPassword - enter the hashed password to compare if comparing.
 * @returns {promise} - promise with boolean for compare, and hashed string for hash
 */
const passwordFunc = async (funcType, password, hashedPassword) => {
  if (funcType == "hash") return await bcrypt.hash(password, 10);
  if (funcType == "compare") return await bcrypt.compare(password, hashedPassword);
}

export default passwordFunc;