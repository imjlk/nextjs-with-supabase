import NewTweetForm from "@/components/NewTweetForm";
import TweetLikes from "@/components/TweetLikes";
import Tweets from "@/components/Tweets";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)")
    .range(0, 10);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: tweet.likes.length,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    })) ?? [];

  return (
    <div className="">
      <NewTweetForm />
      <Tweets tweets={tweets} />
      <hr />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </div>
  );
}
