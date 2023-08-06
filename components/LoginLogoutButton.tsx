import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import LogoutButton from "./LogoutButton"
import Link from "next/link"

export default async function LoginLogoutButton() {
	const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

	return <div>
	{user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<LogoutButton />
		</div>
	) : (
		<Link
			href="/login"
			className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
		>
			Login
		</Link>
	)}
</div>
}