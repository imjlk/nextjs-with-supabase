"use client";

import TweetLikes from "./TweetLikes";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });
  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className="flex flex-col items-center mb-4 lg:mb-4">
      <p className="flex gap-8 justify-center items-center">{tweet?.title}</p>
      <p>{tweet.author?.username}</p>
      <TweetLikes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
    </div>
  ));
}
