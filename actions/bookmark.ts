/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
export async function deleteBookmark(id: string, category_id: string) {
  try {
    const api_ = process.env.API_URL;
    const origin = process.env.ORIGIN_URL;
    const res = await fetch(`${api_}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify({
        id,
        category_id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      return { status: 200, success: true };
    }

    return { status: 400, success: false };
  } catch (error) {
    console.log("error in deleting bookmark");
    return { status: 500, success: false };
  }
}

export async function createBookmark(
  name: string,
  category_id: string,
  url_: string
) {
  try {
    const api_ = process.env.API_URL;
    const origin = process.env.ORIGIN_URL;
    const res = await fetch(`${api_}/${category_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify({
        name,
        category_id,
        url_,
      }),
    });
    // console.log(res);
    if (res.status === 405) {
      return { status: 405, message: "Cannot find it" };
    }
    if (res.status === 409) {
      return { status: 409, message: "Category exists" };
    }
    return { status: 200, message: "Successfully created" };
  } catch (error) {
    console.error("Error creating category:", error);
    return { status: 500 };
  }
}

export async function updateBookmar(url_: string, id: string) {
  try {
    const api_ = process.env.API_URL;
    const origin = process.env.ORIGIN_URL;

    const res = await fetch(`${api_}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify({
        id,
        url_,
      }),
    });
    if (res.status === 200) {
      return { status: 200, success: true };
    }
    return { status: 400, success: false };
  } catch (error) {
    console.log("error in  updating bookmark");
    return { status: 500, success: false };
  }
}

export async function getBookmarks(id: string) {
  try {
    const api_ = process.env.API_URL;
    const origin = process.env.ORIGIN_URL;

    const res = await fetch(`${api_}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return;
  } catch (error) {
    console.log("Error in finding bookmarks");
    return;
  }
}
