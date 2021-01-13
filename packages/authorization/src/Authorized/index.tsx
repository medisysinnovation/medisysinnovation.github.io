import Authorized, { ComponentAuthorized } from "./Authorized";

import Secured from "./Secured";
import check, { checkAuthority } from "./CheckPermissions";
import renderAuthorize from "./renderAuthorize";

Authorized.Secured = Secured;
Authorized.check = check;

const RenderAuthorize = renderAuthorize(Authorized);

const RenderComponentAuthorize = renderAuthorize(ComponentAuthorized);
export {
  RenderComponentAuthorize,
  check as CheckPermissions,
  Secured,
  checkAuthority,
};
export default RenderAuthorize;
