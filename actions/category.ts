"use server";

export async function createCategory(name: string, user_id: string) {
  try {
    const api_ = process.env.API_URL;
    const res = await fetch(`${api_}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user_id,
        req_type: "create",
      }),
    });
    // console.log(res);
    if (res.status === 409) {
      return { status: 409, message: "Category exists" };
    }
    return { status: 200, message: "Successfully created" };
  } catch (error) {
    console.error("Error creating category:", error);
    return { status: 500 };
  }
}

export async function deleteCategory(user_id: string, id: string) {
  try {
    const api_ = process.env.API_URL;
    const res = await fetch(`${api_}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        id,
        req_type: "delete",
      }),
    });
    if (res.status === 200) {
      return { status: 200, success: true };
    }
    return { status: 400, success: false };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { status: 500 };
  }
}
