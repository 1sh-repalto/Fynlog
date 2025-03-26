import Category from "../models/category";

// create default category for each user
export async function ensureDefaultCategory(userId: number) {
  const [defaultCategory] = await Category.findOrCreate({
    where: { userId, isDefault: true },
    defaults: { name: "Default", isDefault: true, userId },
  });

  return defaultCategory;
}
