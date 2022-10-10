import React, { useMemo } from "react";
import Link from "next/link";
import layout from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import { isNumeric } from "../../utils/isNumeric";

interface Breadcrumb {
  href: string;
  title: string;
}

interface BreadcrumbsProps {
  pageTitle?: string;
}

const Breadcrumbs = ({ pageTitle = "" }: BreadcrumbsProps) => {
  const router = useRouter();
  const [asPathWithoutQuery] = router.asPath.split("?");

  const crumblist: Breadcrumb[] = useMemo(() => {
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((part) => part.length);
    const result = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const title = isNumeric(subpath) ? pageTitle : subpath;
      return { href, title };
    });

    return result;
  }, [asPathWithoutQuery, pageTitle]);

  return (
    <ul className={layout.breadcrumbs}>
      <li>
        <Link href="/">Strona główna</Link>
      </li>
      {crumblist.map(({ href, title }) => {
        return (
          <li key={href}>
            <Link href={href}>
              <a>{title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
