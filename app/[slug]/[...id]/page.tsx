"use server";
import { getBookmarks } from "@/actions/bookmark";
import { Bookmarkadd } from "@/components/bookmark";
import Bookmarkbox from "@/components/bookmark-box";
export default async function Categoryid({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const id = (await params).id;
  const slug = (await params).slug;

  // const res = await fetch(`http://localhost:3001/api/category/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  const bookmark_data = await getBookmarks(id);
  console.log(bookmark_data);

  return (
    <div className="max-w-screen-md m-auto min-h-[92vh] mt-[8vh] flex flex-col p-4">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-mono">{slug}</p>
        <Bookmarkadd category_id={id} />
      </div>

      <div className="grid sm:grid-cols-2  mt-6 items-center  w-full">
        {bookmark_data?.map((book) => (
          <Bookmarkbox
            key={book.id}
            id={book.id}
            title={book.title}
            url={book.url}
            category_id={book.category_id.id}
          />
        ))}
      </div>
    </div>
  );
}
