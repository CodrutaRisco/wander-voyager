// eslint-disable-next-line check-file/folder-naming-convention
import { CountryPageFeature } from "@/components/country-page";

interface PageProps {
  params: Promise<{ country: string }>;
}

export default async function CountryPage({ params }: PageProps) {
  const { country } = await params;
  return <CountryPageFeature country={country} />;
}
