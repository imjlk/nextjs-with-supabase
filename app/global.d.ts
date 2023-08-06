import { Database as DB } from '@/lib/database.types'

type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];


declare global {
	type Database = DB
	type TweetWithAuthor = Tweet & {
		user_has_liked_tweet: boolean;
		likes: number;
		author: Profile;
	};
}