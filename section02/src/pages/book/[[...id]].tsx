import { useRouter } from "next/router";

// [queryKey].tsx - catch all segment
// [[queryKey]].tsx - Optional catch all segment
export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Book {id}</h1>;
}
