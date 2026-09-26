import crypto from "crypto";
import fs from "fs";
import path from "path";

export function publicAssetHash(publicPath: string): string {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").slice(0, 12);
  } catch {
    return "missing";
  }
}

export function versionedPublicAsset(publicPath: string): string {
  return `${publicPath}?v=${publicAssetHash(publicPath)}`;
}
