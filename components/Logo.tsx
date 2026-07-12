import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Logo({
  companyName,
  showName = true,
}: {
  companyName: string;
  showName?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/logo.png"
        alt={companyName}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />
      {showName && (
        <span className="text-lg font-semibold text-brand-primary-dark tracking-tight">
          {companyName}
        </span>
      )}
    </Link>
  );
}
