import { fetchNavbarData } from "./NavbarFetcher";
import NavbarClient from "./NavbarClient";

export async function Navbar({ locale }: { locale: string }) {
  const data = await fetchNavbarData(locale);
  if (!data) return null;
  
  return <NavbarClient data={data} locale={locale} />;
}