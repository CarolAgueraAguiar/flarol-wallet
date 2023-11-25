import {
  GetCategoriesProps,
  StoreCategoriesProps,
  UpdateCategoriesProps,
} from "../../types/categories/categories";
import { axiosFlarol } from "../axios";
import { ReturnError } from "../users/users";

export const storeCategory = async ({
  description,
  icon_id,
}: StoreCategoriesProps): Promise<[number | null, ReturnError | null]> => {
  try {
    const { status } = await axiosFlarol.post<StoreCategoriesProps>(
      "categories",
      {
        description,
        icon_id: icon_id,
      }
    );

    return [status, null];
  } catch (e: any) {
    return [null, e.response.data];
  }
};

export const updateCategory = async ({
  description,
  icon_id,
  id,
}: UpdateCategoriesProps): Promise<[number | null, ReturnError | null]> => {
  try {
    const { status } = await axiosFlarol.put<StoreCategoriesProps>(
      `categories/${id}`,
      {
        description,
        icon_id: Number(icon_id),
      }
    );

    return [status, null];
  } catch (e: any) {
    return [null, e.response.data];
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

export const showCategories = async (
  id: number
): Promise<GetCategoriesProps> => {
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

export const listIcons = async () => {
  try {
    const { data } = await axiosFlarol.get("categories/icons");

    return data;
  } catch (e: any) {
    return e;
  }
};
