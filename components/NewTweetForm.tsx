import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweetForm() {
  return (
    <div className="mb-6">
      <form
        className="flex flex-col gap-4 bottom-12"
        action={async (formData: FormData) => {
          "use server";

          const title = String(formData.get("title"));
          const supabase = createServerActionClient<Database>({ cookies });
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            await supabase.from("tweets").insert({ title, user_id: user.id });
          }
        }}
      >
        <input type="text" name="title" className="bg-inherit" />
        <button type="submit" className="p-4 ">
          New Tweet
        </button>
      </form>
    </div>
  );
}
