import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment } from "react";

const BreadCrumbs = ({
  links,
}: {
  links: { href?: string; label: string }[];
}) => {
  return (
    <Breadcrumb className="mt-14">
      <BreadcrumbList>
        {links.map((link, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {link.href ? (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
              ) : (
                <span className="">{link.label}</span>
              )}
            </BreadcrumbItem>
            {index < links.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
