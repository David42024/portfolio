import { Router } from "express";
import { cache, CACHE_TAGS } from "../config/redis";
import { env } from "../config/env";

const router = Router();

router.post("/", async (req, res) => {
  const { tag, secret } = req.body;

  // Validar secret
  if (secret !== env.REVALIDATE_SECRET) {
    return res.status(401).json({
      success: false,
      error: "Invalid secret",
    });
  }

  // Validar tag
  const validTags = Object.values(CACHE_TAGS);
  if (!tag || !validTags.includes(tag)) {
    return res.status(400).json({
      success: false,
      error: `Invalid tag. Valid tags: ${validTags.join(", ")}`,
    });
  }

  try {
    await cache.invalidateTag(tag);

    res.json({
      success: true,
      message: `Cache invalidated for tag: ${tag}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    res.status(500).json({
      success: false,
      error: "Failed to invalidate cache",
    });
  }
});

router.post("/all", async (req, res) => {
const secret = req.headers["x-revalidate-secret"];

  if (secret !== env.REVALIDATE_SECRET) {
    return res.status(401).json({
      success: false,
      error: "Invalid secret",
    });
  }

  try {
    for (const tag of Object.values(CACHE_TAGS)) {
      await cache.invalidateTag(tag);
    }

    res.json({
      success: true,
      message: "All cache invalidated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache reset error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to invalidate cache",
    });
  }
});

export default router;