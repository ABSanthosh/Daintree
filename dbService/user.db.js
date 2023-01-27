import db from "../lib/prisma";

export async function loginUser(data) {
  /**
   * @param {Object} data
   * @param {string} data.email
   * @param {int} data.sub
   * @param {string} data.name
   * @param {string} data.picture
   * @param {string} data.locale
   */
  return db.user.create({
    data,
  });
}
