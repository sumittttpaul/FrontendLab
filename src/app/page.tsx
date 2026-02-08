import { slugify } from "@/libs/helpers";
// import { redirect } from "next/navigation";

export default function Home() {
  // redirect("https://www.linkedin.com/in/sumitttpaul");
  return <p>{slugify("How to build agents with filesystems and bash")}</p>;
}
