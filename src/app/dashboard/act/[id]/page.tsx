"use client";

import { useParams } from "next/navigation";
import { ActDetailClient } from "@/components/act-detail-client";

export default function ActPage() {
  const params = useParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <ActDetailClient id={id ?? ""} />;
}
