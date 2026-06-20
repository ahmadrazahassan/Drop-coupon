import { Breadcrumb, type Crumb } from "./breadcrumb";

export interface PageHeaderProps {
  title: string;
  lead?: string;
  /** Override the default `Drop Coupon / {title}` trail. */
  crumbs?: Crumb[];
}

export function PageHeader({ title, lead, crumbs }: PageHeaderProps) {
  return (
    <header>
      <Breadcrumb
        items={crumbs ?? [{ label: "Drop Coupon", href: "/" }, { label: title }]}
      />
      <h1 className="mt-5 text-[34px] font-extrabold text-ink md:text-[44px]">
        {title}
      </h1>
      {lead ? (
        <p className="mt-3 max-w-2xl text-[16px] text-muted">{lead}</p>
      ) : null}
    </header>
  );
}
