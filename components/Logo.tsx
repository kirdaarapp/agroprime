import { Link } from "@/i18n/navigation";

export default function Logo({ companyName }: { companyName: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary text-white font-bold text-lg">
        A
      </span>
      <span className="text-lg font-semibold text-brand-primary-dark tracking-tight">
        {companyName}
      </span>
    </Link>
  );
}
