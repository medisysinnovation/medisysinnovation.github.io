export var __esModule: boolean;
export default getFile;
/**
 * Try to match the exact extname of the file in a specific directory.
 * @returns
 * - matched: `{ path: string; filename: string }`
 * - otherwise: `null`
 */
declare function getFile(opts: any): {
    path: any;
    filename: string;
} | null;
