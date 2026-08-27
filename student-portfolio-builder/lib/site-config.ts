// Edit this file to put your name on the site's footer and credits.
// This is the ONLY place you need to change it.

export const SITE_AUTHOR = "Berkinbaev Nurgeldi"; // TODO: replace with your full name
export const SITE_NAME = "Student Portfolio Builder";

export function copyrightLine() {
  const year = new Date().getFullYear();
  return `© ${year} ${SITE_AUTHOR}. All rights reserved.`;
}
