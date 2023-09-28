import { StoreCategoriesProps } from "../../types/categories/categories";
import { axiosFlarol } from "../axios";

export const storeCategory = async ({
  description,
  icon_id,
}: StoreCategoriesProps) => {
  try {
    const { data } = await axiosFlarol.post<StoreCategoriesProps>(
      "categories",
      {
        description,
        icon_id,
      }
    );

    return data;
  } catch (e: any) {
    return e;
  }
};

export const listCategory = async () => {
  try {
    const { data } = await axiosFlarol.get("categories");

    return data;
  } catch (e: any) {
    return e;
  }
};

export const showCategories = async (id: number) => {
  try {
    const { data } = await axiosFlarol.get(`categories/${id}`);

    return data;
  } catch (e: any) {
    return e;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const { data } = await axiosFlarol.delete(`categories/${id}`);

    return data;
  } catch (e: any) {
    return e;
  }
};
