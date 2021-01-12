import RenderAuthorize, { RenderComponentAuthorize } from "../Authorized";
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === "undefined" && localStorage
      ? localStorage.getItem("cargo_clique_user_access_rights")
      : str;

  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === "string") {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const userAuthority = typeof authority === "string" ? [authority] : authority;
  localStorage.setItem(
    "cargo_clique_user_access_rights",
    JSON.stringify(userAuthority)
  );
  // auto reload
  reloadAuthorized();
}

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuthority());
let ComponentAuthorized = RenderComponentAuthorize(getAuthority());

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuthority());
  ComponentAuthorized = RenderComponentAuthorize(getAuthority());
};

/**
 * hard code
 * block need it。
 */
(window as any).reloadAuthorized = reloadAuthorized;

export { Authorized, reloadAuthorized, ComponentAuthorized };
