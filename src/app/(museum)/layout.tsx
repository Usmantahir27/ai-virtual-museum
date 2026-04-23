import MuseumLayout from "@/components/layout/MuseumLayout";

export default function MuseumRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MuseumLayout>{children}</MuseumLayout>;
}
