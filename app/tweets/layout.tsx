import LoginLogoutButton from "@/components/LoginLogoutButton";

export const metadata = {
  title: "Todo App",
  description: "Generated by create next app",
};

export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <LoginLogoutButton />
        </div>
      </nav>

      <section className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        {children}
      </section>
    </>
  );
}
