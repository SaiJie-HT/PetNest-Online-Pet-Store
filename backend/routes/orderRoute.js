import { Router } from 'express';
import supabase from '../database/petDatabase.js';

const router = Router();

router.post("/place", async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    const petIds = [...new Set(items.map((it) => it?.id).filter((id) => id !== undefined && id !== null))];

    if (petIds.length === 0) {
      return res.status(400).json({ message: "No pet ids provided." });
    }

    const { data, error } = await supabase
      .from("Pet")
      .update({ IsSold: true })
      .in("PetID", petIds)
      .select("PetID, IsSold");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      message: "Order placed.",
      updated: data ?? [],
    });
  } catch (err) {
    return res.status(500).json({ message: err?.message ?? "Unexpected error" });
  }
});

export default router;
